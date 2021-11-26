import React from 'react';

interface BlogProps {
  data: BlogData;
}

export default function Blog({ data }: BlogProps) {
  return (
    <section>
      <h2>{data.title}</h2>
      <div>
        <p>{data.content}</p>
      </div>
      <div>{data.author.username}</div>
    </section>
  );
}
