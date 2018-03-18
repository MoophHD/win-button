import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/state/configureStore';
import App from './src/App';
import { KeepAwake, registerRootComponent } from 'expo';

if (__DEV__) {
  KeepAwake.activate();
}


const store = configureStore();

export default class AppEntry extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
      
    );
  }
}


registerRootComponent(AppEntry);