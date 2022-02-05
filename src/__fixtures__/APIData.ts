import type { BlogData } from 'src/interfaces/APIDataInterfaces';

export const testBlog: BlogData = {
  _id: 'testblog1',
  title: 'Test Blog 1',
  content: "Here's a short bit of content",
  publishDate: 'todo: give real date string',
  author: {
    _id: 'testauthor1',
    username: 'test author',
  },
};

const testBlog2: BlogData = {
  _id: 'testblog2',
  title: 'Test Blog 2',
  content: "Here's a little bit more content. Nothing fancy...",
  publishDate: 'todo: give real date string',
  author: {
    _id: 'testauthor2',
    username: 'test author 2',
  },
};

export const testBlogs = [testBlog, testBlog2];

export const testUser = {
  _id: 'testuserid',
  username: 'James Test',
};
