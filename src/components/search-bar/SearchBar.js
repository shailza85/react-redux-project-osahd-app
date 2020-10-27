import React from "react";
import { connect } from "react-redux";
import { setSearchResults } from "../../actions/social-media-app";
import "./SearchBar.css";

class SearchBar extends React.Component {
  handleSearchTermChange(event) {
    let term = event.target.value.toLowerCase().trim();

    // if no search entered, dispatchh search result with all users
    if (term === "") {
      this.props.dispatch(setSearchResults(this.props.store.users));
    }
    // else lets find all users that match
    else {
      let usersFound = [];
      usersFound = this.props.store.users.filter((user) => {
        // if any username matches our search term, return true to add user to usersFound
        if (user.name.toLowerCase().includes(term)) {
          return true;
        }
        for (let activity of user.activities) {
          // if any activity in this users list of activities contains our search term, return true to add user to usersFound
          if (activity.toLowerCase().includes(term)) {
            return true;
          }
        }
        // if no matches were found, return false to exclude the user from usersFound
        return false;
      });
      // dispatch all found users to our redux store
      this.props.dispatch(setSearchResults(usersFound));
    }
  }

  render() {
    return (
      <div className="searchBar">
        <label htmlFor="search">Search a user name or activity</label>
        <input
          name="search"
          type="text"
          placeholder="Search a user's name or activity"
          onChange={(event) => {
            this.handleSearchTermChange(event);
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state,
  };
}

export default connect(mapStateToProps)(SearchBar);
