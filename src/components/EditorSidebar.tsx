import React from 'react';
import Loading from './Loading';

interface EditorSidebarProps {
  blogs: BlogData[];
  isLoading: boolean;
  setActiveBlogId: (id: string) => void;
}

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
          <button onClick={() => setActiveBlogId(blog._id)}>
            {blog.title}
          </button>
        ))}
    </div>
  );
}
