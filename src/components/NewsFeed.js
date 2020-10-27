import React from "react";
import "./App.css";
import Nav from "./Nav";
import { connect } from "react-redux";
import Content from "./Content";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { updatePosts } from "../actions/social-media-app";
import Bio from "./bio/Bio";
import "./NewsFeed.css";
import Logo from "../images/Logo.png";

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Keep track of our new post's value.
      newsFeed: "", //Title of the post.
      newsFeedDesc: "", //Description of the post.
    };
  }

  
  // move unauthoried users to sign in page
  navigateToSignIn() {
      this.props.history.push("/sign-in/SignIn");
  }

  renderNewsFeedPage() {
    if (this.props.store.isLoggedIn === false) {
      this.navigateToSignIn();
    } else {
      return (
        <div className="newsFeedBackground">
          <div className="newsfeedSideBar">
          <div className="logoNewsFeed">
            <img src={Logo} alt="logo" />
            </div>
            <Bio />
            </div>
            <div className="newsfeedMainContent">
              <Nav />
             
              <h1>NEWS FEED</h1>
              <form className="createPost" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="newsFeed"
                  id="newsFeed"
                  required
                  value={this.state.newsFeed}
                  onChange={(event) =>
                    this.updateItem("newsFeed", event.target.value)
                  }
                  placeholder="Title..."
                />
                <div id="errorTitle"></div>
                <br />

                <textarea
                  id="newsFeedDesc"
                  required
                  placeholder="What's on your mind..."
                  rows="5"
                  cols="25"
                  value={this.state.newsFeedDesc}
                  onChange={(event) =>
                    this.updateItem("newsFeedDesc", event.target.value)
                  }
                />
                <div id="errorDesc"></div>
                <br />
                <input type="submit" value="Post Feed" onClick={this.addPost} />
              </form>
              <Content />
            </div>
          </div>
     
      );
    }
  }

  updateItem(key, value) {
    // We never re-assign the contents of this.state.
    // this.state is ONLY USED FOR READING VALUES, NOT writing.
    // When we need to update anything in state, we need to use this.setState()
    // this.setState() triggers the render() method, so we can see updated state info in our presentation.
    this.setState({ [key]: value });
  }

  //Function for submit form.
  handleSubmit = (event) => {
    event.preventDefault(); //Prevent default load of page.
  };

  //Function on click of submit button("Post Feed").
  addPost = (event) => {
    event.preventDefault(); // Stop the page from reloading.
    //Conditions will check if Title and Description fields are empty, it will show an error.
    if (this.state.newsFeed.trim() === "") {
      document.querySelector("#errorTitle").innerHTML = "Title required."; //Error message for Title.
        }
    else 
    {
      document.querySelector("#errorTitle").innerHTML = ""; //No Error message.
    }  
    if (this.state.newsFeedDesc.trim() === "") {
      document.querySelector("#errorDesc").innerHTML = "Description required."; //Error message for Description.
    }
    else {
      document.querySelector("#errorDesc").innerHTML = ""; // No Error message.
    }
    if (this.state.newsFeed.trim() !== "" && this.state.newsFeedDesc.trim() !== "")  //Checking if the fields are not empty.
    {
      //Fetching data from API.
      let title = this.state.newsFeed;
      let body = this.state.newsFeedDesc;
      fetch(
        "https://jsonstorage.net/api/items/f2c563c1-bff6-469b-a954-0dab52edc4c3"
      )
        .then((posts) => {
          return posts.json();
        })
        .then((data) => {
          return data.posts;
        })
        //Assign values to data of posts.
        .then(data => {
          const newPost={
            "id": uuid(), // Ensure a unique ID.
            "userId": this.props.store.currentUser.id,
            "img" : this.props.store.currentUser.photoURL,
            "userName": this.props.store.currentUser.name,
            "title": title,
            "body": body
          };
          const pushData=[newPost, ...data];
          //Using put method to add the new post data to API.
          axios.put(
            "https://jsonstorage.net/api/items/f2c563c1-bff6-469b-a954-0dab52edc4c3",
            { posts: pushData }
          );
          this.props.dispatch(updatePosts(pushData)); //dispatch the updated posts data
        });
        this.setState({
          newsFeed: "",
          newsFeedDesc: "",
        });
    }
  };

  render() {
    return <>{this.renderNewsFeedPage()}</>;
  }
}
//mapStateToProps function receives the store state

function mapStateToProps(state) {
  return {
    store: state,
  };
}

//mapStateToProps with connect is used for selecting the part of data from the the store that the connected component needs.
export default connect(mapStateToProps)(NewsFeed);
