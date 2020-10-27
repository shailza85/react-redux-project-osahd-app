import React from "react";
import "./App.css";
import SignIn from "./sign-in/SignIn";

class App extends React.Component {
  render() {
    return (
      <div>
        <SignIn onNavigate={this.props.history} />
      </div>
    );
  }
}

export default App;
