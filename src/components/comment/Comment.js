import React from "react";
import PostInfo from "../postInfo/PostInfo";
import './comment.scss';

function Comment({ comment }) {
  return (
    <div className="hn-comments__comment">
      <PostInfo
        id={comment.id}
        by={comment.by}
        descendants={comment.descendants}
        kids={comment.kids}
        score={comment.score}
        time={comment.time}
        comment={true}
      />
      <p className="hn-comments__text" dangerouslySetInnerHTML={{ __html : comment.text}}/>
    </div>
  );
}

export default Comment;
