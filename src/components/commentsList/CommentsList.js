import React from 'react'
import Comment from "../comment/Comment";
import './commentsList.scss';
function CommentsList({comments}) {
    return (
        <div className="hn-comments">
            <h2 className="hn-comments__title">Comments :</h2>
            {comments.map((comment,index) => (
                <Comment comment={comment} key={index}/>
            ))}
        </div>
    )
}

export default CommentsList;
