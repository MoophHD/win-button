import React, { Component, cloneElement } from 'react';
import { View, BackHandler, StatusBar, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as actions from 'state/actions/game.actions';
import Expo, { AdMobInterstitial, AdMobRewarded } from 'expo';
import PauseMenu from '../PauseMenu';
import PauseBtn from './components/PauseBtn';
import LvlTitle from './components/LvlTitle';
import Background from '../../components/Background';
import SoundManager from 'assets/audio/SoundManager';
import MusicManager from 'assets/audio/MusicManager';
import HelpBtn from './components/HelpBtn';
import Hint from './components/Hint';

import FirstLevel from '../FirstLevel';
import AboutTime from '../AboutTime';
import PiNumber from '../PiNumber';
import PrimaryColors from '../PrimaryColors';
import SecondaryColors from '../SecondaryColors';
import OnsAndOffs from '../OnsAndOffs';
import BlackAndWhite from '../BlackAndWhite';
import Arrows from '../Arrows';
import Blinking from '../Blinking';
import OddRule from '../OddRule';
import Order from '../Order';
import News from '../News';
import LooseConnection from '../LooseConnection';
import FallAndRise from '../FallAndRise';
import TimingIsCrucial from '../TimingIsCrucial';
import OneStepAhead from '../OneStepAhead';

const Container = styled.View`
  flex-grow: 1;
  position: relative;
`

const TopBar = styled.View`
  height: 55px;
  position: relative;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isPaused: false,
      isHintVisible: false,
      restarting: false
    }
    
    this._solvedFlag = false;
    this._showedHint = false;
    
    this.handleSolve = this.handleSolve.bind(this);
    this.handleNextLvl = this.handleNextLvl.bind(this);
    this.setPause = this.setPause.bind(this);
    this.restart = this.restart.bind(this);
  }
  
  async componentWillMount() {
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    // AdMobInterstitial.addEventListener("interstitialDidLoad", () => console.log('ad loaded'));
    await AdMobInterstitial.requestAd();
  
    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
    AdMobRewarded.setTestDeviceID('EMULATOR');
    await AdMobRewarded.requestAd();
    
    MusicManager.play("main", true);
    
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.isPaused) {
        this.setPause(false)
        return true;
      } else if (this.state.isHintVisible) {
        this.setState(() => ({isHintVisible: false}))
        return true;
      } else {
        return false;
      }
    });
    
  }
    
  setPause(isPause) {
   this.setState(() => ({isPaused: isPause}));
  }
    
  handleSolve() {
    const { current, byid } = this.props;
    if (byid[current].solved ) return;
    this._solvedFlag = true;
    
    SoundManager.play("bell").then(() => {
        this.props.actions.onSolve(current);
      }
    )
  }
  
  async handleNextLvl() {
    const { current, ids, byid } = this.props;
    if (!this._solvedFlag && !byid[current].solved) return;
    
    this._solvedFlag = false;
    this._showedHint = false;
    await sleep(250);
    
    if (current == ids[ids.length - 1]) {
      Alert.alert('ya won');
      return;
    }
    
    if (!this.props.isAdFree && AdMobInterstitial.isReady) {
        await AdMobInterstitial.showAd();
        await AdMobInterstitial.requestAd();
    }
    
    this.props.actions.nextLvl();

  }
  
  restart() {
    this.setState(() => ({ restarting: true }));
    this.props.actions.onRestart();
    
    setTimeout(() => { this.setPause(false)}, 0);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.restarting) {
      this.setState(() => ({ restarting: false }));
    }
  }
  
  
  shouldComponentUpdate(nextProps, nextState){
    const differentRestart = this.state.restarting != nextState.restarting;
    const differentCurrent = this.props.current != nextProps.current;
    const differentByid = this.props.byid != nextProps.byid;
    const differentPauseState = this.state.isPaused != nextState.isPaused;
    const toggledHint = this.state.isHintVisible != nextState.isHintVisible;
    
    return differentCurrent || differentByid || differentPauseState || toggledHint || differentRestart;
  }

  render() {
    const { current, byid, ids } = this.props;
    const { isPaused, isHintVisible, restarting } = this.state;
    let { component, name, hint, solution } = lvlLegend[current];
    //odd
    if (restarting) component = <View />;
    
    let lvlToRender = cloneElement(
        component, 
        { ...this.lvlProps, 
          onSolve: this.handleSolve,
          isSolved: byid[current].solved,
          nextLvl: this.handleNextLvl
        }
      );
    return (
      <Container>
        <StatusBar hidden={true} />
        <Background />
        
        <TopBar>
          <HelpBtn  onPress={() => this.setState(() => ({isHintVisible: true}))}/>
          <LvlTitle name={name}/>
          <PauseBtn onPress={() => this.setPause(true)}/>
        </TopBar>
       
        {lvlToRender}
        
          { isPaused && <PauseMenu
            onRestart={() => {this.restart()}}
            onBack={() => this.setPause(false)}
            isClearAvailable={byid[ids[0]].solved || current != 0} />
          }
          
          { isHintVisible && 
            <Hint
              wasShown={this._showedHint}
              onShow={() => {this._showedHint = true}}
              onClose={() => this.setState(() => ({isHintVisible: false}))}
              hint={hint}
              solution={solution}/> }
      </Container>
    )
  }
}


function mapStateToProps (state) {
  return {
    ids: state.ids,
    byid: state.byid,
    current: state.current,
    isAdFree: state.isAdFree
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
  target: PropTypes.number,
  isAdFree: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const lvlLegend = {
  0: { component: <FirstLevel />, name: "1st real quick", hint: "tap the button when it's green", solution: "you can use both your fingers" },
  1: { component: <AboutTime />, name: "It's About Time", hint: "circles represent clocks", solution: "< > v v"},
  2: { component: <PiNumber />, name: "The number", hint: "pi number", solution: "3 1 4"},
  3: { component: <Arrows />, name: "Top down", hint: "left arrow - left button, right arrow - right button", solution: "l r r l r r l r"},
  4: { component: <SecondaryColors />, name: "Secondary", hint: "You need to pick secondary colors", solution:"purple, green, orange" },
  5: { component: <OnsAndOffs />, name: "Of Ons and Offs", hint: " 'I' stands for on, 'O' stands for off", solution: "1 3 5" },
  6: { component: <BlackAndWhite />, name: "Black", hint: "switch's hand should point in the corresponding circle's black side", solution: "< ^ v >"},
  7: { component: <PrimaryColors />, name: "Primary", hint: "You need to pick primary colors", solution: "yellow, blue, red" },
  8: { component: <Blinking />, name: "", hint: "Follow the sequence", solution: "2nd, 3rd, 1st, 2nd, 3rd" },
  9: { component: <OddRule />, name: "", hint: "Odd numbers rule", solution: "1 3 5" },
  10: { component: <Order />, name: "", hint: "Only one sequence will work", solution: "2 3 1" },
  11: { component: <News />, name: "", hint: "North is given. Find the others", solution: "2 3 1" },
  12: { component: <LooseConnection />, name: "", hint: "Is there a loose connection?", solution: "1 3 5 6 4 2" },
  13: { component: <FallAndRise />, name: "", hint: "Fall and Rise", solution: "5 3 1 2 4 6" },
  14: { component: <TimingIsCrucial />, name: "", hint: "Timing is crucial", solution: "2 4 3 1 5" },
  15: { component: <OneStepAhead />, name: "one step ahead", hint: "Stay 1 step ahead of the light switch", solution: "if right - left /n if left - bottom, if bottom - right" }
} 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}