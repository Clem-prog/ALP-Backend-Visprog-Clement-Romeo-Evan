"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidation = void 0;
const zod_1 = require("zod");
class EventValidation {
}
exports.EventValidation = EventValidation;
EventValidation.CREATE = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1),
    location: zod_1.z.string().min(1).max(255),
    date: zod_1.z.coerce.date(),
    poster: zod_1.z.string().min(1).max(255),
    category_id: zod_1.z.number().int().positive()
});
