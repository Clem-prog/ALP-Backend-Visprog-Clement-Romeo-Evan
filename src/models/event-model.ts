import { Event } from "@prisma/client";

export interface CreateEventRequest {
    title: string;
    description: string;
    location: string;
    date: Date;
    poster: string;
    category_id: number;
}

export interface EventResponse {
    id: number;
    title: string;
    description: string;
    location: string;
    date: Date;
    poster: string;
    category_id: number;
}

export function toEventResponse(event: Event): EventResponse {
    return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        date: event.date,
        poster: event.poster,
        category_id: event.category_id
    };
}