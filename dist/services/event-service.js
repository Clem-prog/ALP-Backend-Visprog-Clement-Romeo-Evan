"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../errors/response-error");
const event_model_1 = require("../models/event-model");
const event_validation_1 = require("../validations/event-validation");
const validation_1 = require("../validations/validation");
class EventService {
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const createReq = validation_1.Validation.validate(event_validation_1.EventValidation.CREATE, req);
            const category = yield database_1.prismaClient.category.findUnique({
                where: {
                    id: createReq.category_id
                }
            });
            if (!category) {
                throw new response_error_1.ResponseError(400, 'Category does not exist');
            }
            const event = yield database_1.prismaClient.event.create({
                data: {
                    title: createReq.title,
                    description: createReq.description,
                    location: createReq.location,
                    date: createReq.date,
                    poster: createReq.poster,
                    category_id: createReq.category_id
                }
            });
            return (0, event_model_1.toEventResponse)(event);
        });
    }
    static getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield database_1.prismaClient.event.findMany({
                orderBy: {
                    date: 'desc'
                },
                include: {
                    category: true,
                    reviews: true,
                    attendees: true
                }
            });
            return events.map(event_model_1.toEventResponse);
        });
    }
    static getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield database_1.prismaClient.event.findUnique({
                where: {
                    id: id
                },
                include: {
                    category: true,
                    reviews: true,
                    attendees: true
                }
            });
            if (!event) {
                throw new response_error_1.ResponseError(404, 'Event not found');
            }
            return (0, event_model_1.toEventResponse)(event);
        });
    }
    static updateEvent(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateReq = validation_1.Validation.validate(event_validation_1.EventValidation.CREATE, req);
            const existingEvent = yield database_1.prismaClient.event.findUnique({
                where: {
                    id: id
                }
            });
            if (!existingEvent) {
                throw new response_error_1.ResponseError(404, 'Event not found');
            }
            const category = yield database_1.prismaClient.category.findUnique({
                where: {
                    id: updateReq.category_id
                }
            });
            if (!category) {
                throw new response_error_1.ResponseError(400, 'Category does not exist');
            }
            const event = yield database_1.prismaClient.event.update({
                where: {
                    id: id
                },
                data: {
                    title: updateReq.title,
                    description: updateReq.description,
                    location: updateReq.location,
                    date: updateReq.date,
                    poster: updateReq.poster,
                    category_id: updateReq.category_id
                }
            });
            return (0, event_model_1.toEventResponse)(event);
        });
    }
    static deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEvent = yield database_1.prismaClient.event.findUnique({
                where: {
                    id: id
                }
            });
            if (!existingEvent) {
                throw new response_error_1.ResponseError(404, 'Event not found');
            }
            yield database_1.prismaClient.event.delete({
                where: {
                    id: id
                }
            });
        });
    }
}
exports.EventService = EventService;
