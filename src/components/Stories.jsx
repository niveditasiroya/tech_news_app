import React, { useEffect } from "react";
import { useGlobalContext } from "./Context";

const Stories = () => {
  const { hits, isLoading, tabToRemove } = useGlobalContext();
  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <div className="stories-div">
        {hits.map((currentPost) => {
          const { title, author, objectID, url, num_comments } = currentPost;
          return (
            <div className="card" key={objectID}>
              <h2>{title}</h2>
              <p>
                By <span>{author}</span> | <span>{num_comments} comments</span>
              </p>
              <div className="card-button">
                <a href={url} target="_blank">
                  Read More
                </a>
                <a href="#" onClick={() => tabToRemove(objectID)}>
                  Remove
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Stories;
