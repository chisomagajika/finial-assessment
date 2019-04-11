import React, {Component} from 'react';

class GetCohort extends Component{
constructor(props){
    super(props);
    this.state={
        items:[]
    }
};
componentDidMount(){
    fetch("/cohort")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result
          });
          
        },
        
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
        <h1>cohort</h1>
        <ul>
          {items.map(item => (
            <li key={item.cohort_number}>
              {/* {item.name} */}
             {item.cohort_number} {item.city} {item.year}
            </li>
          ))}
        </ul>
        </div>
      );
    }
  }

}
export default GetCohort;