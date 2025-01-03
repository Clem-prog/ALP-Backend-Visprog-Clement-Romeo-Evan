import { prismaClient } from "../application/database";
import { User } from "@prisma/client"
import { ResponseError } from "../errors/response-error";
import { LoginUserRequest, RegisterUserRequest, toUserResponse, UserResponse } from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"

export class UserService {
    static async register(req: RegisterUserRequest): Promise<UserResponse> {
        const registerReq = Validation.validate(
            UserValidation.REGISTER,
            req
        )

        const email = await prismaClient.user.findFirst({
            where: {
                email: registerReq.email
            }
        })

        if (email) {
            throw new ResponseError(400, 'Email already exists')
        }

        registerReq.password = await bcrypt.hash(registerReq.password, 10)

        const user = await prismaClient.user.create({
            data: {
                username: registerReq.username,
                email: registerReq.email,
                password: registerReq.password,
                isAdmin: registerReq.isAdmin,
                token: uuid()
            }
        })

        return toUserResponse(user)
    }

    static async getAllUser(): Promise<User[]> {
            const allUser = await prismaClient.user.findMany({
                orderBy: {
                    id: 'asc'
                },
            })
    
            return allUser
        }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request)

        let user = await prismaClient.user.findFirst ({
            where: {
                email: loginRequest.email
            }
        })

        if (!user) {
            throw new ResponseError(400, "invalid email or password!")
        }

        const passwordIsValid = await bcrypt.compare(
            loginRequest.password,
            user.password
        )

        if (!passwordIsValid) {
            throw new ResponseError(400, "invalid email or password!")
        }

        user = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: uuid()
            }
        })

        const response = toUserResponse(user)

        return response
    }

    static async logout(user: User): Promise<string> {
        await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: null
            },
        })

        return "logout successful!"
    }
}