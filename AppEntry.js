import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/state/configureStore';
import App from './src/App';
import { KeepAwake, registerRootComponent } from 'expo';
import { Font } from 'expo';
import { View, AsyncStorage } from 'react-native';

if (__DEV__) {
  KeepAwake.activate();
}

const initialState = {ids: [0,1,2]};

let store = configureStore();

export default class AppEntry extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      dataLoaded: false
    };
  }
  
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Raleway: require("assets/fonts/Raleway.ttf")
    });
    
    let solved, current;
    try {
        const storeSolved = await AsyncStorage.getItem('solved');
        const storeCurrent = await AsyncStorage.getItem('current');
        solved = storeSolved ? JSON.parse(storeSolved) : [];
        current = storeCurrent ? +storeCurrent : 0;
    } catch (error) {
        console.log('get data error:', error);
        solved = [];
        current = 0;
    }
        
    store = this.buildStore(current, solved);
    this.setState({ dataLoaded: true });
  }
  
  buildStore(current, solved) {
      //
        const IS_AD_FREE = true;
        
    //
        let byid = {};
        initialState.ids.forEach((id) => {
          // if id is in solved array
          byid[id] = {
            solved: solved.indexOf(id) != -1
          }
        })
        
        let state = {
          ...initialState,
          current,
          byid,
          isAdFree: IS_AD_FREE
        }
        
        return configureStore(state);
      }
  
  render() {
    return (     
        this.state.dataLoaded &&
        <Provider store={store}>
            <View style={{flexGrow: 1}}>
                <App />
            </View>
          </Provider>
        
      )
  }

      
    
}


registerRootComponent(AppEntry);