import React from "react";

import _ from "lodash";

import SingleComment from "./SingleComment";

function App({ comments, id, state }) {
  return (
    <>
      <div>
        {comments.length !== 0 && (
          <>
            <h3 className="mt-3 mb-3">Comments</h3>
            <div className="divider py-1 bg-secondary my-2"></div>
            {_.map(comments, (comment) => {
              return (
                <SingleComment
                  comment={comment}
                  id={comment._id}
                  postId={id}
                  state={state}
                />
              );
            })}
          </>
        )}
        {comments.length === 0 && (
          <h3 className="mt-3 mb-3">No Comments Yet</h3>
        )}
      </div>
    </>
  );
}

export default App;
