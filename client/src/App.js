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

import Test from "./components/Test.js";

import { fetchWikiApi } from "./redux/actions/fetchPostAction.js";
import { updateScore_postAction } from "./redux/actions/updateScore_postAction.js";

// import { BrowserRouter, Route, Link, Switch, Redirect, useHistory, HashRouter } from "react-router-dom";
import {
  Route,
  Switch,
  Redirect,
  HashRouter,
  BrowserRouter,
  Link,
} from "react-router-dom";

import { getStatsQuery } from "./graphql/queries.js";
import { updateStats } from "./graphql/queries.js";
import { loginMutation } from "./graphql/queries.js";

//!!!!! imported actions creators must be passed here as props
function App({
  //  from mapStateToProps

  isAuthenticated,

  // imported actionCreator
  fetchingWiki,
  newRandomArticle,
  setNewRandomArticle_false,
  setWikiButtonClickable_true,
  setWikiButtonClickable_false,
  logIn,
  isMainRendered,
  mainRenderedTrue,
}) {
  // ===========================================

  // disabling random wiki article button in <Fetch/>
  const disablingButton = useRef(null);

  // const [isLoading, setIsLoading] = useState(true);
  // const [loginMut, { newData }] = useMutation(loginMutation);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then((res) =>
      res.json().then((data) => {
        console.log(data);

        if (data.accessToken) {
          logIn({
            authenticatedUserId: data.userId,
            token: data.accessToken,
          });

          mainRenderedTrue();
        } else {
          mainRenderedTrue();
        }

        // setIsLoading(false);

        // loginMut()

        // logIn(dataObj)
      })
    );
  }, [logIn]);

  // fetching WikiApi

  useEffect(() => {
    // checking if fetchingWiki returns true of false! and calling fetchingWiki right in this line
    if (newRandomArticle) {
      fetchingWiki();
    }
  }, [
    newRandomArticle,
    fetchingWiki,
    setWikiButtonClickable_false,
    setWikiButtonClickable_true,
  ]);

  useEffect(() => {
    if (newRandomArticle) {
      setWikiButtonClickable_false();
    } else {
      // setTimeout(() => {
      if (disablingButton.current) {
        disablingButton.current.removeAttribute("disabled");
      }
      setWikiButtonClickable_true();
      // }, 5000);
    }
  }, [newRandomArticle]);

  if (!isMainRendered) {
    return (
      <div>
        <h3 className="title"> loading...</h3>
      </div>
    );
  }

  return (
    <div className="app-outer-container">
      <h3 className="title">Wiki Speed Typing</h3>

      {/* <HashRouter> */}
      <BrowserRouter>
        {/* testing headers */}
        <Link to="/test">Test</Link>
        <Switch>
          {/* <Route path="/" exact component={Display}/> */}
          <Route
            path="/"
            exact
            // normally it would be component+ but render is needed is passing props
            // to a component
            render={(props) => <Main disablingButton={disablingButton} />}
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
          {/* testing isAuth, has to be clicked on Link to work */}
          <Route path="/test" component={Test} />

          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>
      </BrowserRouter>
      {/* </HashRouter> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // auth
    isAuthenticated: state.authState.isAuthenticated,
    newRandomArticle: state.displayState.textDisplay.newRandomArticle,
    isMainRendered: state.visibilityState.isMainRendered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetch & wikiController
    setNewRandomArticle_false: () => dispatch({ type: "RANDOM_ARTICLE_FALSE" }),
    // !!! dispatching function instead of object thanks to redux-thunk
    fetchingWiki: () => dispatch(fetchWikiApi()),
    setWikiButtonClickable_true: () =>
      dispatch({ type: "WIKI_BTN_CLICKABLE_TRUE" }),
    setWikiButtonClickable_false: () =>
      dispatch({ type: "WIKI_BTN_CLICKABLE_FALSE" }),
    logIn: (dataObj) => dispatch({ type: "LOG_IN", payload: dataObj }),
    mainRenderedTrue: () => dispatch({ type: "MAIN_RENDERED_TRUE" }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():
)(App);
