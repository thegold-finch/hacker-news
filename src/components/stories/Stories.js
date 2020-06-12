import React from "react";
import { fetchStories } from "../../utils/apis";
import PostList from "../postList/PostList";
import Loader from "../loader/Loader";
import './stories.scss';

function storiesReducer(state, action) {
  if (action.type === "fetch") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "success") {
    return {
      stories: action.stories,
      loading: false,
      error: null,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.message,
      loading: false,
    };
  } else {
    throw new Error(`Sorry type doesn't exist.`);
  }
}

function Stories({ type }) {
  const [state, dispatch] = React.useReducer(storiesReducer, {
    stories: null,
    loading: true,
    error: null,
  });

  const { stories, loading, error } = state;

  React.useEffect(() => {
    dispatch({ type: "fetch" });
    fetchStories(type)
      .then((stories) => dispatch({ type: "success", stories }))
      .catch(({ message }) => dispatch({ type: "error", error: message }));
  }, [type]);

  if (loading === true) {
    return <Loader text={`Fetching ${type === 'best' ? '' : type} posts`} />;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="hn-posts">
      <PostList stories={stories} type={type} />
    </div>
  );
}

export default Stories;
