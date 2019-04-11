import React, { Component } from 'react';
import Getbyid from './components/Getbyid.js';
import Read from './components/Read.js';
import AddData from './components/AddData.js';

class App extends Component {
  render() {
    return (
      <div className="App">
      <p>final assessment</p>
      <Read />
      <Getbyid />
      <AddData />
      {/* <Deletebyid /> */}
      </div>
    );
  }
}

export default App;
