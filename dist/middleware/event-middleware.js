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
exports.eventMiddleware = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../errors/response-error");
const eventMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = parseInt(req.params.id);
    const user = req.user;
    if (!user) {
        throw new response_error_1.ResponseError(401, "Unauthorized access");
    }
    if (user.isAdmin) {
        next();
        return;
    }
    // really not sure about event atttendance logic
    const eventAttendance = yield database_1.prismaClient.event_attended.findFirst({
        where: {
            AND: [
                { event_id: eventId },
                { user_id: user.id }
            ]
        }
    });
    if (!eventAttendance) {
        throw new response_error_1.ResponseError(403, "You don't have permission to modify this event");
    }
    next();
});
exports.eventMiddleware = eventMiddleware;
