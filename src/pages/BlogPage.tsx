import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
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

  return blogData ? (
    <article>
      <section>
        <h2>{blogData.title}</h2>
        <div>
          <p>{blogData.content}</p>
        </div>
        <div>{blogData.author.username}</div>
      </section>
      <section>
        <h2>Comments</h2>
        <div>Comment ...</div>
      </section>
    </article>
  ) : (
    <NotFound />
  );
}
