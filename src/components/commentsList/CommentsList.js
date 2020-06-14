import React from 'react'
import Comment from "../comment/Comment";
import './commentsList.scss';
import ThemeContext from "../../contexts/theme";

function CommentsList({comments}) {
    const theme = React.useContext(ThemeContext);
    return (
        <div className="hn-comments">
            <h2 className={`hn-comments__title hn-comments__title--${theme}`}>Comments :</h2>
            {comments.map((comment,index) => (
                <Comment comment={comment} key={index}/>
            ))}
        </div>
    )
}

export default CommentsList;
