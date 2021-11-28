import React from 'react';
import { useParams } from 'react-router';
import Blog from '../components/Blog';
import Loading from '../components/Loading';
import useGetData from '../hooks/useDataStore';
import { SNOWPACK_PUBLIC_API_URL } from '../utils/envManager';
import NotFound from './NotFound';

export default function BlogPage() {
  const { blogid } = useParams();
  const { data, isLoading, error } = useGetData(
    `${SNOWPACK_PUBLIC_API_URL}/blogs/${blogid}`,
  );

  if (isLoading) {
    return <Loading />;
  } else if (!data) {
    return <NotFound />;
  } else {
    return (
      <article>
        {error && <div>{error as string}</div>}
        <Blog data={data} />
        <section>
          <h2>Comments</h2>
          <div>Comment ...</div>
        </section>
      </article>
    );
  }
}
