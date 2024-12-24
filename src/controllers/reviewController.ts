import { NextFunction, Response } from "express";
import { CreateReviewRequest, ReviewResponse } from "../models/review-model";
import { ReviewService } from "../services/review-service";
import { UserRequest } from "../types/user-request";

export class ReviewController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateReviewRequest = req.body as CreateReviewRequest;
            const response: ReviewResponse = await ReviewService.create(request, req.user!);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getReviewsByEventId(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const eventId = parseInt(req.params.eventId);
            const response: ReviewResponse[] = await ReviewService.getReviewsByEventId(eventId);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateReview(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const reviewId = parseInt(req.params.id);
            const request: CreateReviewRequest = req.body as CreateReviewRequest;
            const response: ReviewResponse = await ReviewService.updateReview(reviewId, request, req.user!);

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteReview(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const reviewId = parseInt(req.params.id);
            await ReviewService.deleteReview(reviewId, req.user!);

            res.status(200).json({
                data: "Review deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
