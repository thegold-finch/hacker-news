import React, { Component, Fragment } from "react";
import { fetchMainPosts, fetchUser } from "../utils/apis";
import { Link } from "react-router-dom";
import Loader from './Loader';
import { ThemeConsumer } from "../contexts/theme";

function StoriesGrid({ stories, getBy, loading }) {
  return (
    <ThemeConsumer>
      {({theme}) => (
        <ul className="stories">
        {loading === false ? (
            stories.map((storie, index) => {
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
              } = storie;
      
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
            })
        )
            :(
              <Loader/>
            )
      }
      </ul>
      )}
    </ThemeConsumer>
  );
}

export default class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStorie: this.props.storie,
      stories: {},
      user: {},
      error: null,
      loading:true,
    };
  }

  componentDidMount() {
    this.updateStorie(this.state.selectedStorie);
  }

  updateStorie = selectedStorie => {
    this.setState({
      selectedStorie,
      error: null,
      loading:false,
    });

    fetchMainPosts(selectedStorie)
      .then(data => {
        this.setState(() => ({
          stories: {
            [selectedStorie]: data
          },
          loading:false,
        }));
      })
      .catch(error => {
        console.warn("Error fetching storis", error);
        this.setState({
          error: "There was an error fetching storis."
        });
      });
  };

  getBy = e => {
    let user = e.target.textContent.split(" ")[1];
    fetchUser(user)
      .then(id => {
        this.setState(() => ({
          user: id,
          loading:false,
        }));
      })
      .catch(error => {
        console.warn("Error fetching user", error);
        this.setState({
          error: "There was an error fetching user."
        });
      });
  };

  render() {
    const { selectedStorie, stories, user, error, loading } = this.state;

    return (
      <div>
            <div>
                {stories[selectedStorie] && (
                    <StoriesGrid stories={stories[selectedStorie]} getBy={this.getBy} loading={loading}/>
                )}
                {error && <p>{error}</p>}
            </div>
      </div>
    );
  }
}
