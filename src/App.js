import React, { Component } from 'react';
import CardList from './CardList';
// import { robots } from './robots';
import SearchBox from './SearchBox';

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
    console.log('cunstructor')
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        return response.json();
      })
      .then(users => {
        this.setState({ robots: users });
      })
    // this.setState({robots: robots});
    console.log('componentDidMount')
  }

  // onSearchChange(event) { OBS !!!
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    // const filteredRobots = this.state.robots.filter(robot => {
    //   return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    // })
    // console.log(filteredRobots);
  }


  render() {
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })
    if (this.state.robots.length === 0) {
      return <h2>Loading ...</h2>
    } else {
      console.log('render')
      return (
        <div className='tc'>
          <h1 className='f2'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <CardList robots={filteredRobots} />
          {/* <CardList robots={this.state.robots} />  */}
        </div>
      );
    }
  }
}


export default App;