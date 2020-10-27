import React, { Component } from "react";
import Post from "./Post";
import { connect } from "react-redux";
import { updatePosts } from ".././actions/social-media-app";
import axios from "axios";
import "./Content.css";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: [],
    };
  }
  // https://www.robinwieruch.de/react-fetching-data#how-to-fetch-data-with-axios-in-react
  componentDidMount() {
    // componentDidMount() : This is like saying that the component is now born. It only runs once. In this method, we should fetch the data we need to correctly display from API.
    fetch(
      "https://jsonstorage.net/api/items/f2c563c1-bff6-469b-a954-0dab52edc4c3"
    )
      //storing posts in json
      .then((posts) => {
        return posts.json();
      })
      .then((data) => {
        //setting the state of the posts and dispatching it to store.
        let title = data.posts;
        this.setState({ title: title });
        this.props.dispatch(updatePosts(title));
      });
  }

  render() {
    return (
      <div className="content">
        <button
          //here refresh button will refresh the post lists with  latest updated list.
          onClick={() => {
            axios
              .get(
                `https://jsonstorage.net/api/items/f2c563c1-bff6-469b-a954-0dab52edc4c3`
              )
              .then((response) => {
                let title = response.data.posts;
                this.setState({ title: title });
                this.props.dispatch(updatePosts(title));
              });
          }}
          className="refreshButton"
        >
          <em className="fas fa-sync-alt"></em> Refresh
        </button>

        <div className="container1">
          {this.props.someRandomName.posts.map((pic) => {
            return <Post key={pic.id} postData={pic} />;
          })}
        </div>
      </div>
    );
  }
}
// function takes the current value inside the redux and it will put them into the props of whatever component is calling the function
function mapStateToProps(state) {
  return {
    someRandomName: state,
  };
}
//React Redux provides a connect function for you to connect your component to the store.
export default connect(mapStateToProps)(Content);
