import React from "react";
import Title from "../title/Title";
import PostInfo from "../postInfo/PostInfo";
import '../stories/stories.scss';
import './postList.scss';
import { getUrlSite } from "../../utils/helpers";

function PostList({ stories }) {

  if (stories.length === 0) {
    return <p className="hn-posts__title">Sorry no posts to show...</p>
  }

  return (
    <React.Fragment>
      {stories.map(
        ({ by, descendants, id, kids, score, text, time, title, url }) => {
          return ( id &&
            <div className="hn-posts__post" key={id}>
                <Title
                  title={title}
                  url={url}
                  urlSite={getUrlSite(url)}
                  id={id}
                  text={text}
                />
                <PostInfo
                  id={id}
                  by={by}
                  descendants={descendants}
                  kids={kids}
                  score={score}
                  time={time}
                />
            </div>
          );
        }
      )}
    </React.Fragment>
  );
}

export default PostList;
