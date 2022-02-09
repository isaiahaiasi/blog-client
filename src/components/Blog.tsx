import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogData } from 'src/interfaces/APIDataInterfaces';
import AuthorTag from './AuthorTag';

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
      <AuthorTag author={author} />
    </section>
  );
}
