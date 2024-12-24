import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";

export const reviewMiddleware = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
) => {
    const reviewId = parseInt(req.params.id);
    const user = req.user;

    if (!user) {
        throw new ResponseError(401, "Unauthorized access");
    }

    // Admin can access any review
    if (user.isAdmin) {
        next();
        return;
    }

    // For non-admins, check if they own the review
    const review = await prismaClient.review.findUnique({
        where: {
            id: reviewId
        }
    });

    if (!review) {
        throw new ResponseError(404, "Review not found");
    }

    if (review.user_id !== user.id) {
        throw new ResponseError(403, "You don't have permission to modify this review");
    }

    next();
};

