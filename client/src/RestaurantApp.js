import React, { Component } from 'react';
import './App.css';
import RestaurantList from './containers/RestaurantList/RestaurantList';
import AppBar from './components/AppBar/AppBar';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <RestaurantList />
      </React.Fragment>
    )
  }
}

export default App;
