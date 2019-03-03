import React, { Component } from 'react';
import './App.css';
import RestaurantList from './containers/RestaurantList/RestaurantList';
import AppBar from './components/AppBar/AppBar';
import Wrapper from './hoc/Wrapper';
class App extends Component {
  render() {
    return (
    <Wrapper>
      <AppBar />
      <RestaurantList />
    </Wrapper>
    )
  }
}

export default App;
