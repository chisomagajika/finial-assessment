import React, { Component } from 'react';

class Deletebyid extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        isLoaded: true,
        item: []
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        fetch(`/data/${this.state.value}`,{
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            this.setState({
              isLoaded: true,
              item: result.item
            });
            this.props.Deletedata(`${this.state.value}`);
          }).catch(function(error){
            console.error(error);
          })
          event.preventDefault();
          
    }
  
    render() {
      return (
        <div>
          <h1>Delete</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              <textarea value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            <p>{this.state.item}</p>
          </form>
        </div>
      );
    }
  }
  export default Deletebyid;