import React from 'react';
import { Link } from 'react-router-dom';

interface BlogProps {
  data: BlogData;
}

export default function Blog({ data }: BlogProps) {
  const { _id, title, content, author } = data;
  return (
    <section>
      <h2>
        <Link to={`/blog/${_id}`}>{title}</Link>
      </h2>
      <div>
        <p>{content}</p>
      </div>
      <Link to={`/user/${author._id}`}>{author.username}</Link>
    </section>
  );
}
