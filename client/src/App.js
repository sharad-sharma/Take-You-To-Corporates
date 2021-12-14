import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { MultiStepForm } from "./component/Post/Create/MultiStepForm";
import SearchBar from "./component/Search/SearchBar";
import SearchResult from "./component/Search/SearchResult";
import InsightsResult from "./component/Search/InsightsResult";
import HomePage from "./component/Home/HomePage";
import { PostDisplay } from "./component/Post/Single/PostDisplay";
import Navbar from "./component/NavBar/Navbar";
import Navbar2 from "./component/NavBar/Navbar2";
import AboutUs from "./component/NavBar/AboutUs";
import Profile from "./component/Profile/Profile";
import MyPost from "./component/Profile/MyPost";
import User from "./component/Profile/User";
import Login from "./component/Login/Login";

const Routes = () => {
  useEffect(() => {
    const detail = JSON.parse(localStorage.getItem("state"));
    if (detail) {
      setState(detail);
    }
  }, []);

  const [state, setState] = useState(null);

  let stateSeter = (detail) => {
    setState(detail);
  };

  if (!state) {
    return (
      <Router>
        <Navbar2 />
        <Switch>
        <Route exact path="/about" component={AboutUs} />
          <Route path="/">
            <Login stateSeter={stateSeter} />
          </Route>
        </Switch>
      </Router>
    );
  } else {
    if (state?.isProfileComplete) {
      return (
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/mypost">
              <MyPost state={state} stateSeter={stateSeter} />
            </Route>
            <Route exact path="/profile">
              <Profile state={state} stateSeter={stateSeter} />
            </Route>
            <Route exact path="/">
              <HomePage state={state} stateSeter={stateSeter} />
            </Route>
            <Route exact path="/create">
              <MultiStepForm state={state} stateSeter={stateSeter} />
            </Route>
            <Route exact path="/user/:id">
              <User state={state} stateSeter={stateSeter} />
            </Route>
            <Route exact path="/company/:id">
              <SearchResult state={state} stateSeter={stateSeter} />
            </Route>
            <Route exact path="/company/:id/insights">
              <InsightsResult state={state} stateSeter={stateSeter} />
            </Route>
            <Route path="/company">
              <SearchBar state={state} stateSeter={stateSeter} />
            </Route>
            <Route exact path="/post/:id">
              <PostDisplay state={state} stateSeter={stateSeter} />
            </Route>
            <Route exact path="/about" component={AboutUs} />
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <Navbar2 />
          <Switch>
            <Route path="/">
              <Profile state={state} stateSeter={stateSeter} />
            </Route>
          </Switch>
        </Router>
      );
    }
  }
};

export default Routes;