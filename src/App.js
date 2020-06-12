import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Loader from "./components/loader/Loader";

const Stories = React.lazy(() => import("./components/stories/Stories"));
const Post = React.lazy(() => import("./components/post/Post"));
const User = React.lazy(() => import("./components/user/User"));

function App() {
  return (
    <Router>
      <div className="hn">
        <Nav />
        <div className="hn__container">
          <React.Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/" render={() => <Stories type="best" />} />
              <Route path="/ask" render={() => <Stories type="ask" />} />
              <Route path="/show" render={() => <Stories type="show" />} />
              <Route path="/job" render={() => <Stories type="job" />} />
              <Route path="/post" component={Post} />
              <Route path="/user" component={User} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </React.Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
