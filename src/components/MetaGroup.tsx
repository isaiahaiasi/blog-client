import React from 'react';
import type { UserData } from 'src/interfaces/APIDataInterfaces';
import AuthorTag from './AuthorTag';
import Timestamp from './Timestamp';

interface MetaGroupProps {
  data: {
    author: UserData;
    createdAt?: string;
    publishDate?: string;
  };
}

export default function MetaGroup({ data }: MetaGroupProps) {
  return (
    <div className="meta-group">
      <AuthorTag author={data.author} />
      {data.createdAt ? (
        <Timestamp date={data.createdAt} />
      ) : (
        data.publishDate && <Timestamp date={data.publishDate} />
      )}
    </div>
  );
}
