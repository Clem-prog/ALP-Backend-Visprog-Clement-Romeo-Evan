"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const categoryController_1 = require("../controllers/categoryController");
const eventController_1 = require("../controllers/eventController");
exports.publicRouter = express_1.default.Router();
// User
exports.publicRouter.post("/api/register", userController_1.UserController.register);
exports.publicRouter.post("/api/login", userController_1.UserController.login);
// Category
exports.publicRouter.post("/api/category/create", categoryController_1.CategoryController.create);
exports.publicRouter.get("/api/category/all", categoryController_1.CategoryController.getAllCategory);
// Event
exports.publicRouter.post("/api/events", eventController_1.EventController.create);
exports.publicRouter.get("/api/events", eventController_1.EventController.getAllEvents);
exports.publicRouter.get("/api/events/:id", eventController_1.EventController.getEventById);
exports.publicRouter.put("/api/events/:id", eventController_1.EventController.updateEvent);
exports.publicRouter.delete("/api/events/:id", eventController_1.EventController.deleteEvent);
"The tunnel to summer, the exit of goodbye";
