import React from "react";

import _ from "lodash";

import MarkdownRender from ".././../Other/MarkdownRender";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";

export const PostBody = ({ post, state }) => {
  let renderTags = (tags) => {
    return tags.map((tag) => {
      return (
        <span className="badge badge-success span-with-margin" key={tag}>
          {tag}
        </span>
      );
    });
  };

  return (
    <div key={post._id}>
      <hr />
      <span className="span-with-margin text-warning">
        Compnay - {_.upperFirst(post.company)} •
      </span>
      <span className="span-with-margin text-warning">
        Role - {_.upperFirst(post.profile)}
      </span>{" "}
      <h3>{_.upperFirst(post.title)}</h3>
      {renderTags(post.tags)}
      <span className="span-with-margin text-grey"> • </span>
      <span className="span-with-margin text-grey">
        {_.upperFirst(post.user.name)}
      </span>
      <span className="span-with-margin text-grey"> • </span>
      <span className="span-with-margin text-grey">
        {new Date(post.createdAt).toLocaleString()}
      </span>
      <hr />
      <MarkdownRender source={post.experience} />
      <hr />
      <CommentBox id={post._id} state={state} />
      <hr />
      <CommentList comments={post.comments} id={post._id} state={state} />
    </div>
  );
};
