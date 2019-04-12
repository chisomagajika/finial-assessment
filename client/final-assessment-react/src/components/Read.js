import React, { Component } from 'react';
import Deletebyid from './Deletebyid';
import Edit from './Edit';
import  './Read.css';



class Read extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(id,name,date){
    const body = {
      name: name,
      date:date

    }
    fetch(`/data/${id}`,{
      method:'PUT',
      body: JSON.stringify(body),
      headers:{'Content-Type':'application/json'}
    }).then(res =>res.json()).then(newData=>{
      console.log(newData);
      const allItems = this.state.items.filter(function(item){
        return item.id !== parseInt(id)
      })
      console.log(allItems)
      this.setState({
        items:[...allItems,newData]
      })

    }).catch(error =>console.error(error));
  }
  
  Deletedata(deleteItem){
    
    console.log("delete items =",deleteItem, typeof(deleteItem))
    
    var newlist = this.state.items.filter(item=>{
      // item.id is need becuse that the element in items and we are check comparing their id
      return parseInt(item.id )!== parseInt(deleteItem)});
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
        < Edit editData={this.handleEdit} />
        {/* // <div>
        //   <p>{items}</p>
        // </div> */}

        <ul>
          {items.map(item => (
            <li key={item.id}>
              {/* {item.name} */}
              {item.first_name} {item.last_name}
            </li>
          ))}
        </ul>
        </div>
      );
    }
  }
  
}

export default Read;