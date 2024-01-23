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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPosts = exports.createPost = void 0;
const blogModel_1 = __importDefault(require("../models/blogModel"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, content } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const blogPost = new blogModel_1.default({ title, content, author: userId });
        yield blogPost.save();
        res.status(201).json(blogPost);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating new blog post", error });
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogPosts = yield blogModel_1.default.find().populate("author", "username");
        res.status(200).json(blogPosts);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching blog posts", error });
    }
});
exports.getPosts = getPosts;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const { postId } = req.params;
        const { title, content } = req.body;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const blogPost = yield blogModel_1.default.findById(postId);
        if (!blogPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        if (((_c = blogPost.author) === null || _c === void 0 ? void 0 : _c.toString()) !== userId) {
            return res
                .status(403)
                .json({ message: "Unauthorized to update this blog post" });
        }
        blogPost.title = title;
        blogPost.content = content;
        yield blogPost.save();
        res.status(200).json(blogPost);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating blog post", error });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const { postId } = req.params;
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
        const blogPost = yield blogModel_1.default.findById(postId);
        if (!blogPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        if (((_e = blogPost.author) === null || _e === void 0 ? void 0 : _e.toString()) !== userId) {
            return res
                .status(403)
                .json({ message: "Unauthorized to delete this blog post" });
        }
        yield blogModel_1.default.findByIdAndDelete(postId);
        res.status(200).json({ message: "Blog post deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting blog post", error });
    }
});
exports.deletePost = deletePost;
