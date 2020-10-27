import React from "react";
import { connect } from "react-redux";
import { updateUsers, setCurrentUser } from "../../actions/social-media-app";
import axios from "axios";
import "./Bio.css";

class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activity: "" };
  }

  addActivity() {
    // if input is not empty and a new activity has been entered
    if (
      this.state.activity.trim() !== "" &&
      !this.props.store.currentUser.activities.includes(this.state.activity)
    ) {
      // make a copy of all existing users
      // let updatedUserList = [...this.props.store.users];
      let updatedUser = { ...this.props.store.currentUser };

      // add the new user activity and replace in the existing users
      updatedUser.activities.push(this.state.activity);

      axios
        .get(
          "https://jsonstorage.net/api/items/4d56c6a1-9bd8-4795-b714-8b6e815d2edd"
        )
        .then((response) => {
          return response.data.users;
        })
        .then((allUsers) => {
          // remove the user from user list and replace with updated user
          let updatedUserList = allUsers.filter((user) => {
            return user.id !== updatedUser.id;
          });

          updatedUserList.push(updatedUser);

          // store the updated user list into our json api
          axios
            .put(
              "https://jsonstorage.net/api/items/4d56c6a1-9bd8-4795-b714-8b6e815d2edd",
              { users: updatedUserList }
            )
            .then((response) => {
              // then reset the form and dispatch the updated user list
              this.setState({ activity: "" });
              this.props.dispatch(updateUsers(updatedUserList));
              this.props.dispatch(setCurrentUser(updatedUser));
            });
        });
    }
  }

  render() {
    return (
      <div className="bio">
        <img
          className="myImage"
          src={this.props.store.currentUser.photoURL}
          alt="current user"
        />
        <h2>{this.props.store.currentUser.name}</h2>
        <p>Email: {this.props.store.currentUser.email}</p>
        <p>
          Activities:{" "}
          {this.props.store.currentUser.activities.length > 0
            ? this.props.store.currentUser.activities.join(", ")
            : "No activities yet. Add an activity"}
        </p>
        <input
          type="text"
          placeholder="Enter an activity"
          value={this.state.activity}
          onChange={(event) => {
            this.setState({ activity: event.target.value });
          }}
        />
        <button
          onClick={() => {
            this.addActivity();
          }}
        >
          Add Activity
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state,
  };
}

export default connect(mapStateToProps)(Bio);
