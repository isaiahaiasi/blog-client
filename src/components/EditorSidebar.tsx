import React from 'react';
import Loading from './Loading';

interface EditorSidebarProps {
  blogs: BlogData[];
  isLoading: boolean;
  setActiveBlogId: (id: string) => void;
}

// TODO: change buttons to proper links
export default function EditorSidebar({
  blogs,
  isLoading,
  setActiveBlogId,
}: EditorSidebarProps) {
  return (
    <div className="sidebar">
      {isLoading && <Loading />}
      {blogs &&
        blogs.map((blog) => (
          <button key={blog._id} onClick={() => setActiveBlogId(blog._id)}>
            {blog.title}
          </button>
        ))}
    </div>
  );
}
