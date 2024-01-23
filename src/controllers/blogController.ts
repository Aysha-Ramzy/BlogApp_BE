import Blog from "../models/blogModel";
import { Request, Response } from "express";
export const createPost = async (req: Request | any, res: Response) => {
  try {
    const { title, content } = req.body;
    const userId = req.user?.id;
    const blogPost = new Blog({ title, content, author: userId });
    await blogPost.save();
    res.status(201).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating new blog post", error });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const blogPosts = await Blog.find().populate("author", "username");
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog posts", error });
  }
};

export const updatePost = async (req: Request | any, res: Response) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const userId = req.user?.id;
    const blogPost = await Blog.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (blogPost.author?.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this blog post" });
    }

    blogPost.title = title;
    blogPost.content = content;
    await blogPost.save();
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog post", error });
  }
};

export const deletePost = async (req: Request | any, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.user?.id;
    const blogPost = await Blog.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (blogPost.author?.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this blog post" });
    }

    await Blog.findByIdAndDelete(postId);
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog post", error });
  }
};
