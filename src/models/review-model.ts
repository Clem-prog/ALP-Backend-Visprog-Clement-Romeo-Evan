import { Review } from "@prisma/client";

export interface CreateReviewRequest {
    event_id: number;
    rating: number;
    comment: string;
}

export interface ReviewResponse {
    id: number;
    rating: number;
    comment: string;
    user_id: number;
    event_id: number;
}

export function toReviewResponse(review: Review): ReviewResponse {
    return {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        user_id: review.user_id,
        event_id: review.event_id
    };
}