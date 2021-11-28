import React from 'react';
import { useParams } from 'react-router';
import Blog from '../components/Blog';
import Loading from '../components/Loading';
import useDataStore from '../hooks/useDataStore';
import { getBlogAPIEndpoint } from '../utils/routeGetters';
import NotFound from './NotFound';

export default function BlogPage() {
  const { blogid } = useParams();
  const { data, isLoading, error } = useDataStore(
    getBlogAPIEndpoint(blogid ?? 'undefined'),
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
