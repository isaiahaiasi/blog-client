import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogData } from 'src/interfaces/APIDataInterfaces';
import Loading from './Loading';

interface EditorSidebarProps {
  blogs: BlogData[];
  isLoading: boolean;
}

export default function EditorSidebar({
  blogs,
  isLoading,
}: EditorSidebarProps) {
  return (
    <div className="sidebar">
      <Link to="new">New Blog post</Link>
      {isLoading && <Loading />}
      {blogs &&
        blogs.map((blog) => (
          <Link key={blog._id} to={blog._id}>
            {blog.title}
          </Link>
        ))}
    </div>
  );
}
