import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import Blog from '../components/Blog';
import useGetData from '../hooks/useDataStore';
import NotFound from './NotFound';

export default function BlogPage() {
  const { blogid } = useParams();
  const { data, isLoading, error } = useGetData(`blog/${blogid}`);

  // TODO: "notFound" should only display after Fetch 404s
  // otherwise, should display a Loading component
  return data ? (
    <article>
      {isLoading && <div>loading...</div>}
      {error && <div>{error as string}</div>}
      <Blog data={data} />
      <section>
        <h2>Comments</h2>
        <div>Comment ...</div>
      </section>
    </article>
  ) : (
    <NotFound />
  );
}
