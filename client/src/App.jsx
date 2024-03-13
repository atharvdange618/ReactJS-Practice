import React, { Component } from 'react';
import './App.css';
import Register from './Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:3000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <>
        <div>
          {/* <p>{this.state.apiResponse}</p> */}
          <Register />
        </div>

      </>
    );
  }
}

export default App;
