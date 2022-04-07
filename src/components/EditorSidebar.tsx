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
    <div className="dashboard__sidebar card">
      <ul>
        <li>
          <Link to="new">
            <button type="button">New Blog post</button>
          </Link>
        </li>
        {blogs &&
          blogs.map((blog) => (
            <li key={blog._id}>
              <Link to={blog._id}>{blog.title}</Link>
            </li>
          ))}
      </ul>
      {isLoading && <Loading />}
    </div>
  );
}
