export const testBlog: BlogData = {
  id: 'testblog1',
  title: 'Test Blog 1',
  content: "Here's a short bit of content",
  publishDate: new Date(),
  author: {
    id: 'testauthor1',
    username: 'test author',
  },
};

const testBlog2: BlogData = {
  id: 'testblog2',
  title: 'Test Blog 2',
  content: "Here's a little bit more content. Nothing fancy...",
  publishDate: new Date(),
  author: {
    id: 'testauthor2',
    username: 'test author 2',
  },
};

export const testBlogs = [testBlog, testBlog2];
