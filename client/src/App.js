import React from "react";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

//ApolloClient & ApolloProvider are in store.js
import { useQuery, useMutation } from "@apollo/react-hooks";

import "./App.css";

import Main from "./components_links/Main.js";

import Display from "./components/Display.js";

import Login from "./components_links/Login.js";
import Register from "./components_links/Register.js";
import CustomRoute from "./components_links/CustomRoute.js";

import { fetchWikiApi } from "./redux/actions/fetchPostAction.js";
import { updateScore_postAction } from "./redux/actions/updateScore_postAction.js";

// import { BrowserRouter, Route, Link, Switch, Redirect, useHistory, HashRouter } from "react-router-dom";
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";

import { getStatsQuery } from "./graphql/queries.js";
import { updateStats } from "./graphql/queries.js";

//!!!!! imported actions creators must be passed here as props
function App({
  //  from mapStateToProps

  isAuthenticated,
}) {
  // ===========================================

  return (
    <div className="app-outer-container">
      <h3 className="title">Wiki Speed Typing</h3>

      <HashRouter>
        <Switch>
          {/* <Route path="/" exact component={Display}/> */}
          <Route
            path="/"
            exact
            // normally it would be component+ but render is needed is passing props
            // to a component
            render={(props) => <Main />}
          />

          {/* custom routes are used to avoid warning when rendering <Routes> conditionally:
            <Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.
            
             */}
          <CustomRoute
            isAuthenticated={isAuthenticated}
            path="/register"
            component={Register}
          />
          <CustomRoute
            isAuthenticated={isAuthenticated}
            path="/login"
            component={Login}
          />

          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>
      </HashRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // auth
    isAuthenticated: state.authState.isAuthenticated,
  };
};

export default connect(
  mapStateToProps,
  null
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(App);
