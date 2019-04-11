import React, { Component } from 'react';


class AddData extends Component {
    constructor(props) {
        console.log('props before super equals',props);
      super(props);
      console.log('props after super equals',props);
      this.state = {
        first_name: '',
        last_name:'',
        cohort_number:'',
        isLoaded: true,
        // item: {}
      };
  
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangelast_name = this.handleChangelast_name.bind(this);
      this.handleChangecohort_number = this.handleChangecohort_number.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeName(event) {
      this.setState({first_name: event.target.value});
    }
    handleChangelast_name(event) {
        this.setState({last_name: event.target.value});
      }
      handleChangecohort_number(event) {
        this.setState({cohort_number: event.target.value});
      }
  
    handleSubmit(event) {
        // console.log('this is what the state looks like',this.state)
        // console.log('this is the Json.stringify ',JSON.stringify({name:this.state.first_name, date:this.state.last_name}))
        fetch('/data',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({first_name:this.state.first_name, last_name:this.state.last_name,cohort_name:this.state.last_name})
            })
        .then(res => res.json())
        .then(
          (result) => {
              console.log('result after it went through json',result)
            this.setState({
              isLoaded: true,
              item: result
            });
          })
          event.preventDefault();
    }
  
    render() {
        const {last_name, first_name, cohort_number} = this.state;
        
      return (
        <form onSubmit={this.handleSubmit}>
        <h2>add to apprentice</h2>
          <label>
              fist name:
          <input type="text" value={first_name} onChange={this.handleChangeName}/>
          </label>
          <label>
              last name:
          <input type="text" value={last_name}  onChange={this.handleChangelast_name}/>
          </label>
          <label>
              cohort number:
          <input type="text" value={cohort_number}  onChange={this.handleChangecohort_number}/>
          </label>
          <input type="submit" value="values" />
        
        </form>
      );
    }
  }
  export default AddData