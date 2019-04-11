import React, { Component } from 'react';
import Deletebyid from './Deletebyid'




class Read extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  Deletedata(deleteItem){
    
    console.log(deleteItem)
    var newlist = this.state.items.filter(item=>{
      // item.id is need becuse that the element in items and we are check comparing their id
      return item.id !== deleteItem})
      console.log(newlist);
    this.setState({items:newlist})
  }

  componentDidMount() {
    fetch("/data")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result
          });
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    console.log(items);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <Deletebyid Deletedata = {(x)=>this.Deletedata(x)}/>
        {/* // <div>
        //   <p>{items}</p>
        // </div> */}

        <ol>
          {items.map(item => (
            <li key={item.id}>
              {/* {item.name} */}
              {item.name} {item.data}
            </li>
          ))}
        </ol>
        </div>
      );
    }
  }
  
}

export default Read;