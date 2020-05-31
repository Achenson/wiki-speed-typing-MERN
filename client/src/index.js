import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";

import "./index.css";
import AppContainer from "./App";
import * as serviceWorker from "./serviceWorker";

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';



const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  // 02:03
  credentials: "include",
  request: operation => {
    let accessToken = store.getState().authState.accessToken;


    // const accessToken = getAccessToken();
    if (accessToken) {

      console.log("acccesssss");
      
      operation.setContext({
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      })
    }
  }
});


ReactDOM.render(
<ApolloProvider client={client}>
  <Provider store={store}>
    <AppContainer />
  </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
