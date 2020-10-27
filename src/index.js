import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import NewsFeed from "./components/NewsFeed";
import SearchPage from "./components/search-page/SearchPage";
import { createStore } from "redux";
import { Provider } from "react-redux";
import socialMediaAppReducer from "./reducers/social-media-app";
import { setLoggedIn } from "./actions/social-media-app";
import SignUp from "./components/sign-up/SignUp";
import SignIn from "./components/sign-in/SignIn";



// create a new redux store
const socialMediaAppStore = createStore(socialMediaAppReducer);

// log the updated store to the console whenever a change occurs
socialMediaAppStore.subscribe(() => {
  console.log(socialMediaAppStore.getState());
});

// set the logged in value to false
socialMediaAppStore.dispatch(setLoggedIn(false));

//Adding Nav links
const Root = (store) => (
  <Provider store={store.store}>
    <Router>
      <Route path="/" component={App} exact />
      <Route path="/NewsFeed" component={NewsFeed} />
      <Route path="/Search" component={SearchPage} />
      <Route path="/sign-up/SignUp" component={SignUp} />
      <Route path="/sign-in/SignIn" component={SignIn} />
      
    </Router>
  </Provider>
);

ReactDOM.render(
  <Root store={socialMediaAppStore} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
