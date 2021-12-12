import React from 'react';
import Blog from '../Blog';

interface BlogEditorProps {
  blog: BlogData;
}

export default function BlogEditor({ blog }: BlogEditorProps) {
  // ! PLACEHOLDER
  return (
    <>
      {blog ? (
        <Blog data={blog} />
      ) : (
        <p>Choose a blog to update, or write a new one!</p>
      )}
    </>
  );
}
