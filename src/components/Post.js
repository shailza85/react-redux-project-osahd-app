import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePosts } from ".././actions/social-media-app";
import axios from "axios";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //initial states for the post before translate button is pressed.
      title: this.props.postData.title,
      body: this.props.postData.body,
      source: "en", //source language is english
      target: "fr", //target language is french
    };
  }

  // TRANSLATE METHOD STARTS
  translate() {
    /* translate method():
     * will take input text for body and translate the text by calling google api and then setting the state
     */
    axios
      //link: https://cors-anywhere.herokuapp.com/
      // user cors-anywhere to allow cors request from the front end app on restricted apis
      .get(
        `https://cors-anywhere.herokuapp.com/https://translate.googleapis.com/translate_a/single?client=gtx&sl=${this.state.source}&tl=${this.state.target}&dt=t&q=${this.state.body}`
      )
      .then((response) => {
        //returning the response in the first array.
        return response.data[0];
      })
      .then((translatedArray) => {
        let text = "";
        for (let translation of translatedArray) {
          text = text + translation[0];
        }

        this.setState({ body: text }); //setting the state of body after the translation.
      });
    // will take input text for title and translate the text by calling google api and then setting the state
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://translate.googleapis.com/translate_a/single?client=gtx&sl=${this.state.source}&tl=${this.state.target}&dt=t&q=${this.state.title}`
      )
      .then((response) => {
        //returning the response in the first array.
        return response.data[0];
      })
      .then((translatedArray) => {
        let text = "";
        for (let translation of translatedArray) {
          text = text + translation[0];
        }

        this.setState({ title: text }); //setting the state of title after the translation.
      });
    //button function as toggle between the translation from enflish to french and vice versa.
    this.setState({
      //The conditional (ternary) operator is the only JavaScript operator that takes three operands: a condition followed by a question mark (?), then an expression to execute if the condition is truthy followed by a colon (:), and finally the expression to execute if the condition is falsy.
      source: this.state.source === "en" ? "fr" : "en",
      target: this.state.target === "en" ? "fr" : "en",
    });
  } //TRANSLATE METHOD ENDS



  renderAuthor() {
    for (let user of this.props.someRandomName.users) {
      if (this.props.postData.userId === user.id) {
        return (
          <>
            <img
              className="photoPost"
              src={user.photoURL}
              alt="post's author"
            />
            <p>{user.name}</p>
          </>
        );
      }
    }
  }

  renderDelete() {
    if (
      this.props.someRandomName.currentUser.id === this.props.postData.userId
    ) {
      return (
        <button
          //delete button will delete the post after clicking on it..at the same time the ap
          onClick={() => {
            //delete the some random post from the list of posts
            let updatedPostList = this.props.someRandomName.posts.filter(
              (post) => {
                return post.id !== this.props.postData.id;
              }
            );
            // sending the dispatch of updatedPostList to the store.
            this.props.dispatch(updatePosts(updatedPostList));

            // use a put request to send updated list to our json stroage api after deleting the post.
            axios.put(
              "https://jsonstorage.net/api/items/f2c563c1-bff6-469b-a954-0dab52edc4c3",
              { posts: updatedPostList }
            );
          }}
          className="deleteButton"
        >
          <em className="far fa-trash-alt"></em>
        </button>
      );
    }
  }

  render() {
    // representing the post title and post body here in post which is fetched in content.js
    return (
      <article className="post">
        <div>
          <div>{this.renderAuthor()}</div>
          {this.renderDelete()}
        </div>
        <div>
          <h3>{this.state.title}</h3>
          <p>{this.state.body}</p>
        </div>
        <div className="postButtons">
          <button
            className="translateButton"
            onClick={() => {
              this.translate();
            }}
          >
            <em className="fas fa-language"></em> Translate
          </button>
        </div>
      </article>
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
export default connect(mapStateToProps)(Post);
