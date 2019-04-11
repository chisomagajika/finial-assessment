import React, { Component } from 'react';
import Getbyid from './components/Getbyid.js';
import Read from './components/Read.js';
import AddData from './components/AddData.js';
import './App.css'
// import Edit from './components/Edit';
const headerstyle ={
  backgroundColor : 'black',
  color: 'white',
  textAlign : 'center'
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1 style={headerstyle}>final assessment</h1>
      <Read />
      <Getbyid />
      <AddData />
      {/* <Edit /> */}
     
      </div>
    );
  }
}

export default App;
