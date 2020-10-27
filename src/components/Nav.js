import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./Nav.css";

import { logout } from ".././actions/social-media-app";

//Nav displays the menu links on the page.

class Nav extends React.Component {
  logout() {
    this.props.dispatch(logout());
    this.props.history.push("/sign-in/SignIn");
  }

  renderLogout() {
    if (this.props.store.isLoggedIn) {
      return (
        <button className="logOutButton" onClick={() => this.logout()}>
          {" "}
          Log Out
        </button>
      );
    }
  }

  render() {
    return (
      <nav className="navBar">
        <ul>
          <li>
            <Link to="/NewsFeed">News Feed</Link>
          </li>
          <li>
            <Link to="/Search">Search Page</Link>
          </li>
        </ul>

        {this.renderLogout()}
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    store: state,
  };
}
export default withRouter(connect(mapStateToProps)(Nav));
