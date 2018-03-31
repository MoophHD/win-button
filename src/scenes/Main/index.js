import React, { Component, cloneElement } from 'react';
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as actions from 'state/actions/game.actions';
import Expo, { AdMobInterstitial } from 'expo';
import PauseMenu from '../PauseMenu';
import PauseBtn from './components/PauseBtn';
import FirstLevel from '../FirstLevel';
import AboutTime from '../AboutTime';

let Container = styled.View`
  flex-grow: 1;
  position: relative;
`

const soundSrc = require("assets/main/main.mp3");
class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sound: new Expo.Audio.Sound(),
      isPaused: false
    }
    
    this.handleSolve = this.handleSolve.bind(this);
    this.handleNextLvl = this.handleNextLvl.bind(this);
    this.onPlaybackStatusUpdate = this.onPlaybackStatusUpdate.bind(this);
    this.setPause = this.setPause.bind(this);
  }
  
  shouldComponentUpdate(nextProps, nextState){
    const differentCurrent = this.props.current != nextProps.current;
    const differentByid = this.props.byid != nextProps.byid;
    const differentPauseState = this.state.isPaused != nextState.isPaused;
    return differentCurrent || differentByid || differentPauseState;
  }
  
  handleSolve() {
    const { current, byid } = this.props;
    if (byid[current].isSolved ) return;
    
    this.props.actions.onSolve(current);
  }
  
  async handleNextLvl() {
    if (AdMobInterstitial.isReady) {
      await AdMobInterstitial.showAd();
      
      this.props.actions.nextLvl();
    }
  }
  
  async componentWillMount() {
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    
    // AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () => console.log('ad load failed'));
    // AdMobInterstitial.addEventListener("interstitialDidLoad", () => console.log('ad loaded'));
    
    await AdMobInterstitial.requestAd();
    
    
    await this.state.sound.loadAsync(require('assets/main/main.mp3'));
    this._playSound();
    this.state.sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
    
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.isPaused) {
        this.setPause(false)
      }
    });
  }
  
  setPause(isPause) {
  console.log("set Pause", isPause);
console.log(this.state);
   this.setState(() => ({isPaused: isPause}));
  }
  
  onPlaybackStatusUpdate(status) {
    if (status.didJustFinish) this._playSound();
  }
  
    async _playSound() {
        const sound = this.state.sound;
        try {
          await sound.setPositionAsync(0);
          await sound.playAsync(); //This works, but just only once!
        }
        catch (error) {
         console.log('switch sound error: ', error);
        }
    }
  
  render() {
    console.log('isPaused', this.state.isPaused);
    const { current, byid, ids } = this.props;
    const { isPaused } = this.state;
    let lvlToRender = cloneElement(
      lvlLegend[current], 
        { ...this.lvlProps, 
          onSolve: this.handleSolve,
          isSolved: byid[current].solved,
          nextLvl: this.handleNextLvl
        }
      );   
    return (
      <Container>
        {lvlToRender}
        <PauseBtn onPress={() => this.setPause(true)}/>
        { isPaused && <PauseMenu
          onBack={() => this.setPause(false)}
          isClearAvailable={byid[ids[0]].solved} />
        }
      </Container>
    )
  }
}


function mapStateToProps (state) {
  return {
    ids: state.ids,
    byid: state.byid,
    current: state.current
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

Main.propTypes = {
  ids: PropTypes.array,
  byid: PropTypes.object,
  target: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const lvlLegend = {
  0: <FirstLevel />,
  1: <AboutTime />
} 