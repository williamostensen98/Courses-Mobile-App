import React, { Component } from 'react';
import AppContainer from "./components/Navigator"


// ## Example for how to render different content on iOS and Android
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
// });

export default class App extends Component {
  render() {
    return (
      <AppContainer  />
    );
  }
}



