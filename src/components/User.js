import React, { Component } from "react";
import queryString from "query-string";
import { fetchPosts, fetchItem, fetchUser } from "../utils/apis";
import { Link } from "react-router-dom";
import Loader from './Loader';
import { ThemeConsumer } from "../contexts/theme";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      posts: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    const user = queryString.parse(this.props.location.search);
    const id = user.id;

    fetchUser(id)
      .then(id => {
        this.setState(() => ({
          user: id,
          posts: id.submitted,
          loading: false
        }));
        return this.state.posts;
      })
      .then(posts => {
        let newPosts = posts;
        fetchPosts(newPosts)
          .then(newPosts => {
            this.setState(() => ({
              posts: newPosts,
              loading: false
            }));
            console.log("newposts: ", this.state.posts);
          })
          .catch(error => {
            console.warn("Error fetching user", error);
            this.setState({
              error: "There was an error fetching user."
            });
          });
      })
      .catch(error => {
        console.warn("Error fetching user", error);
        this.setState({
          error: "There was an error fetching user."
        });
      });
  }

  render() {
    const { user, posts, loading } = this.state;
    const { about, created, id, karma, submitted } = user;

    return (
      <ThemeConsumer>
        {({theme}) => (
          <div className="user">
            <h2 className={`user__name user__name-${theme}`}>{id}</h2>
            <p className="user__info">
              {"joined "} <span className="text-bold">{created}</span> {" has "}{" "}
              <span className="text-bold">{karma}</span> {" karma"}
            </p>
            <p
              className={`user__about user__about-${theme}`}
              dangerouslySetInnerHTML={{ __html: about }}
            />

            <h2 className={`title-${theme}`}>Posts</h2>
            <ul className="stories">
              {posts.map((post, index) => {
                const {
                  by,
                  descendants,
                  id,
                  kids,
                  score,
                  time,
                  title,
                  type,
                  url
                } = post;
                let currentDate = new Date();
                let currentTimestamp = currentDate.getTime();
                let newDate = currentTimestamp - time;

                return (
                  <li key={id} className="stories__item">
                    <a className={`stories__link stories__link-${theme}`} href={url}>
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
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </ThemeConsumer>
    );
  }
}
