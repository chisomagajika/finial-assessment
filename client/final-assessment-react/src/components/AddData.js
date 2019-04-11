import React, { Component } from 'react';


class AddData extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        date:'',
        isLoaded: true,
        item: {}
      };
  
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeDate = this.handleChangeDate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeName(event) {
      this.setState({name: event.target.value});
    }
    handleChangeDate(event) {
        this.setState({date: event.target.value});
      }
  
    handleSubmit(event) {
        console.log(this.state)
        
        fetch('/data',{
            method: 'POST',
            body:JSON.stringify({name:this.state.name, date:this.state.date}),
            headers: {
                'Content-Type': 'application/json'
              }
            })
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
        const {date, name} = this.state;
        
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
              name:
          <input type="text" value={name} onChange={this.handleChangeName}/>
          </label>
          <label>
              date:
          <input type="text" value={date}  onChange={this.handleChangeDate}/>
          </label>
          <input type="submit" values="values" />
        
        </form>
      );
    }
  }
  export default AddData