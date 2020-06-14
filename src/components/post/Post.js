import React from "react";
import queryString from "query-string";
import { fetchItem, fetchComments } from "../../utils/apis";
import Loader from "../loader/Loader";
import Title from "../title/Title";
import PostInfo from "../postInfo/PostInfo";
import CommentsList from "../commentsList/CommentsList";
import { getUrlSite } from "../../utils/helpers";
import ThemeContext from "../../contexts/theme";

function postReducer(state, action) {
  if (action.type === "fetch") {
    return {
      ...state,
      loadingPost: true,
      loadingComments: true,
    };
  } else if (action.type === "post") {
    return {
      ...state,
      post: action.post,
      loadingPost: false,
    };
  } else if (action.type === "comments") {
    return {
      ...state,
      comments: action.comments,
      loadingPost: false,
      loadingComments: false,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.message,
      loadingComments: false,
      loadingPost: false,
    };
  } else {
    throw new Error(`Sorry there an error while fetching data...`);
  }
}
function Post({ location }) {
  const theme = React.useContext(ThemeContext);
  const { id } = queryString.parse(location.search);
  const [state, dispatch] = React.useReducer(postReducer, {
    post: null,
    loadingPost: true,
    comments: null,
    loadingComments: true,
    error: null,
  });

  const { post, loadingPost, comments, loadingComments, error } = state;

  React.useEffect(() => {
    dispatch({ type: "fetch" });
    fetchItem(id)
      .then((post) => {
        dispatch({ type: "post", post });
        return fetchComments(post.kids.slice(0, 30) || []);
      })
      .then((comments) => dispatch({ type: "comments", comments }))
      .catch(({ message }) => dispatch({ type: "error", error: message }));
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <React.Fragment>
      {loadingPost === true ? (
        <Loader text="Fetching Post" />
      ) : (
        <React.Fragment>
          <div className={`hn-posts__big-title hn-posts__big-title--${theme}`}>
            <Title
              title={post.title}
              url={post.url}
              urlSite={getUrlSite(post.url)}
              id={post.id}
              text={post.text}
              type={post.type}
            />
          </div>
          <PostInfo
            id={post.id}
            by={post.by}
            descendants={post.descendants}
            kids={post.kids}
            score={post.score}
            time={post.time}
          />
        </React.Fragment>
      )}

      {loadingComments === true ? (
        loadingPost === false && <Loader text="Fetching Comments" />
      ) : (
        <CommentsList comments={comments}/>
      )}
    </React.Fragment>
  );
}

export default Post;
