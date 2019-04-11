import React, { Component } from 'react';


class Getbyid extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        isLoaded: true,
        item: {}
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        console.log(this.state.value);
        fetch(`/data/${this.state.value}`)
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result)
            this.setState({
              isLoaded: true,
              item: result
            });
            
          })
          event.preventDefault();
    }
  
    render() {
        const {item, value} = this.state;
        
      return (
        <form onSubmit={this.handleSubmit}>
        <h2>Get apprentice by id</h2>
          <label>
            <textarea value={value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
          <h1>{item.first_name}<br />{item.last_name}</h1>
        </form>
      );
    }
  }
  export default Getbyid