import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

let PostList = ({ posts }) => {
  let renderTags = (tags) => {
    return tags.map((tag) => {
      return (
        <span className="badge badge-success span-with-margin" key={tag}>
          {tag}
        </span>
      );
    });
  };

  let renderPostSummary = (post) => {
    return (
      <div key={post._id}>
        <span className="span-with-margin text-warning">
          Compnay - {_.upperFirst(post.company)} •
        </span>
        <span className="span-with-margin text-warning">
          Role - {_.upperFirst(post.profile)}
        </span>
        <h3>
          <Link className="link-without-underline" to={`/post/${post._id}`}>
            {_.upperFirst(post.title)}
          </Link>
        </h3>
        {renderTags(post.tags)}
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey">
          <Link className="text-grey" to={`/user/${post.user._id}`}>
            {_.upperFirst(post.user.name)}
          </Link>
        </span>
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey">
          {new Date(post.createdAt).toLocaleString()}
        </span>
        <hr />
      </div>
    );
  };

  return (
    <>
      {_.map(posts, (post) => {
        return renderPostSummary(post);
      })}
    </>
  );
};

export default PostList;