import React from "react";
import "./UserProfile.css";

class UserProfile extends React.Component {
  render() {
    return (
      <div className="userProfile">
        <img
          src={this.props.userData.photoURL}
          alt={`showing ${this.props.userData.name}`}
        />
        <h3>{this.props.userData.name}</h3>
        <ul>
          {this.props.userData.activities.map((activity) => {
            return <li key={activity}>{activity}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default UserProfile;
