import React, { Component } from 'react';
import Main from './scenes/Main';
import { Root } from 'native-base';

class App extends Component {
  render() {
    return (
      <Root>
        <Main />
      </Root>
    )

  }
}


export default App;