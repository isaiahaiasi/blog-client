import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import Blog from '../components/Blog';
import { FetchedDataContext } from '../contexts/fetchedData';
import NotFound from './NotFound';

// GET blog id from url param
// BLOG ALREADY LOADED?:
//  pull from global saved posts
// ELSE
//  TRY FETCH, &
//  IF success
//    Set blog in global state (should trigger re-render)
//  ELSE SET ERROR
// (see above w/ comments as well)

export default function BlogPage() {
  const { blogid } = useParams();
  const { blogs } = useContext(FetchedDataContext);
  const blogData = blogs.find((blog) => blog._id === blogid);

  useEffect(() => {
    if (!blogData) {
      // TODO: fetch data if not already loaded...
    }
  }, []);

  // TODO: "notFound" should only display after Fetch 404s
  // otherwise, should display a Loading component
  return blogData ? (
    <article>
      <Blog data={blogData} />
      <section>
        <h2>Comments</h2>
        <div>Comment ...</div>
      </section>
    </article>
  ) : (
    <NotFound />
  );
}
