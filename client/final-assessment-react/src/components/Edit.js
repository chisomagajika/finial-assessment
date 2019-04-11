import React, { Component } from 'react';


class Edit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        first_name: '',
        last_name:'',
        id:''        
      };
  
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangelast_name = this.handleChangelast_name.bind(this);
      this.handleChangeId = this.handleChangeId.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeId(event) {
        this.setState({
            id: event.target.value});
      }
  
    handleChangeName(event) {
      this.setState({
        first_name: event.target.value});
    }
    handleChangelast_name(event) {
        this.setState({
            last_name: event.target.value});
      }
  
    handleSubmit(event) {
        event.preventDefault();
        // console.log('this is what the state looks like',this.state)
        // console.log('this is the Json.stringify ',JSON.stringify({name:this.state.name, date:this.state.date}))
        this.props.editData(
            this.state.id,
            this.state.first_name,
            this.state.last_name
        );
    }
  
    render() {
        const {last_name,id,first_name} = this.state;
        
      return (
        <form onSubmit={this.handleSubmit}>
            <h2> Edit data</h2>
          <label>
              Update FirstName:
          <input type="text" value={first_name} onChange={this.handleChangeName}/>
          </label>
          <label>
              Update LastName:
          <input type="text" value={last_name}  onChange={this.handleChangelast_name}/>
          </label>
          <label>
              ID:
          <input type="text" value={id}  onChange={this.handleChangeId}/>
          </label>
          <input type="submit" values="values" />
        
        </form>
      );
    }
  }
  export default Edit;