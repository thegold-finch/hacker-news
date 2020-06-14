import React from "react";
import queryString from "query-string";
import { fetchUser, fetchPosts } from "../../utils/apis";
import Loader from "../loader/Loader";
import PostList from "../postList/PostList";
import UserInfo from "../userInfo/UserInfo";
import './user.scss';
import ThemeContext from "../../contexts/theme";

function userReducer(state, action) {
  if (action.type === "fetch") {
    return {
      ...state,
      loadingPosts: true,
      loadingUser: true,
    };
  } else if (action.type === "user") {
    return {
      ...state,
      user: action.user,
      loadingUser: false,
    };
  } else if (action.type === "posts") {
    return {
      ...state,
      posts: action.posts,
      loadingUser: false,
      loadingPosts: false,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.message,
      loadingPosts: false,
      loadingUser: false,
    };
  } else {
    throw new Error(`Sorry there an error while fetching data...`);
  }
}
function User({ location }) {
  const theme = React.useContext(ThemeContext);
  const { id } = queryString.parse(location.search);
  const [state, dispatch] = React.useReducer(userReducer, {
    user: null,
    loadingUser: true,
    posts: null,
    loadingPosts: true,
    error: null,
  });
  const { user, loadingUser, posts, loadingPosts, error } = state;

  React.useEffect(() => {
    dispatch({ type: "fetch" });
    fetchUser(id)
      .then((user) => {
        dispatch({ type: "user", user });
        return fetchPosts(user.submitted.slice(0, 30) || []);
      })
      .then((posts) => dispatch({ type: "posts", posts }))
      .catch(({ message }) => dispatch({ type: "error", error: message }));
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <React.Fragment>
      {loadingUser === true ? (
        <Loader text="Fetching User" />
      ) : (
        <UserInfo user={user}/>
      )}

      {loadingPosts === true ? (
        loadingUser === false && <Loader text="Fetching User's Posts" />
      ) : (
        <React.Fragment>
          <h2 className={`hn-user__title hn-user__title--${theme}`}>Posts :</h2>
          <div className="hn-posts">
            <PostList stories={posts} />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default User;
