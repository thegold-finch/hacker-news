import React, { Component } from "react";
import queryString from "query-string";
import { fetchComments, fetchItem } from "../utils/apis";
import { Link } from "react-router-dom";
import Loader from './Loader';
import { ThemeConsumer } from "../contexts/theme";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      comments: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    const comment = queryString.parse(this.props.location.search);
    const id = comment.id;

    fetchItem(id)
      .then(post => {
        this.setState(() => ({
          post: post,
          comments: post.kids,
          loading: false
        }));

        return this.state.comments;
      })
      .then(comments => {
        fetchComments(comments).then(comments => {
          this.setState(() => ({
            comments: comments,
            loading: false
          }));
        });
      });
  }

  render() {
    const { comments, post, loading } = this.state;
    const { url, title, by, time, kids, id } = post;

    let currentDate = new Date();
    let currentTimestamp = currentDate.getTime();
    let newDate = currentTimestamp - time;

    return (
      <ThemeConsumer>
        {({theme}) => (
        <div className="post">
            { loading === false ? (    
              <React.Fragment>
                  <a className={`stories__link stories__link-${theme} stories__link--big`} href={url}>
                  {title}
                  </a>
                  <div className="stories__description">
                  {"by "}
                  <Link
                      className={`stories__link stories__link--cb-${theme}`}
                      to={{ pathname: "user", search: `?id=${by}` }}>
                      {by}
                  </Link>
                  {" on "}
                  {new Date(newDate).toLocaleString("en-US")}
                  {" with "}
                  {kids ? (
                      <Link
                      className={`stories__link stories__link--cb-${theme}`}
                      to={{ pathname: "post", search: `?id=${id}` }}>
                      {<span>{kids.length}</span>}
                      </Link>
                  ) : (
                      <span>{`0`}</span>
                  )}
                  {" comments"}
                  </div>
                  <div className="post__comments">
                      {comments.map(comment => (
                          <div className={`post__comment post__comment-${theme}`}>
                          <div className="stories__description">
                              {"by "}
                              <Link
                              className={`stories__link stories__link--cb-${theme}`}
                              to={{ pathname: "user", search: `?id=${comment.by}` }}>
                              {comment.by}
                              </Link>
                              {" on "}
                              {comment.time}
                          </div>
                          <p
                              className={`post__text post__text-${theme}`}
                              dangerouslySetInnerHTML={{ __html: comment.text }}
                          />
                          </div>
                      ))}
                  </div>
              </React.Fragment>    
              ) : (
                  <Loader/>
              )}

        </div>
          
        )}
      </ThemeConsumer>
    );
  }
}
