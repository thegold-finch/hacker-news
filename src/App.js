import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopStories from "./components/TopStories";
import NewStories from "./components/NewStories";
import Nav from "./components/Nav";
import User from "./components/User";
import Post from "./components/Post";
import { ThemeProvider } from "./contexts/theme";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === "light" ? "dark" : "light"
        }));
      }
    };
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={`App ${this.state.theme}`}>
            <div className="container">
              <Nav />
              <Route exact path="/" component={TopStories} />
              <Route exact path="/new" component={NewStories} />
              <Route exact path="/user" component={User} />
              <Route exact path="/post" component={Post} />
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
