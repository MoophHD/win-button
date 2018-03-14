import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'state/configureStore';
import Main from './scenes/Main';
import { Font, AppLoading } from "expo";
import { Root } from 'native-base';

const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }
  
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isLoaded: true });
  }
  
  render() {
    return (
      <Provider store={store}>
        <Root>
          { this.state.isLoaded && <Main /> }
        </Root>
      </Provider>
  )

  }
}


export default App;