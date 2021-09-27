import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../compponents/CardList';
import SearchBox from '../compponents/SearchBox';
import Scroll from '../compponents/Scroll';
import ErrorBoundary from '../compponents/ErrorBoundary';

import { setSearchField } from './actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: []
      // searchfield: ''
    }
  }

  componentDidMount() {
    // console.log(this.props.store.getState())
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ robots: users }))
  }

  // // onSearchChange(event) { OBS !!!
  // onSearchChange = (event) => {
  //   this.setState({ searchfield: event.target.value })
  // }

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return !robots.length ?
      <h2>Loading ...</h2> :
      (
        <div className='tc'>
          <h1 className='f2'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);  // connect = higher order function HOF