"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEventResponse = toEventResponse;
function toEventResponse(event) {
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
