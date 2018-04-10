import React, { Component, cloneElement } from 'react';
import { View, BackHandler, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as actions from 'state/actions/game.actions';
import Expo, { AdMobInterstitial } from 'expo';
import PauseMenu from '../PauseMenu';
import PauseBtn from './components/PauseBtn';
import LvlTitle from './components/LvlTitle';
import Background from '../../components/Background';
import SoundManager from 'assets/audio/SoundManager';
import MusicManager from 'assets/audio/MusicManager';


import FirstLevel from '../FirstLevel';
import AboutTime from '../AboutTime';
import PiNumber from '../PiNumber';
import PrimaryColors from '../PrimaryColors';
import SecondaryColors from '../SecondaryColors';
import OnsAndOffs from '../OnsAndOffs';
import BlackAndWhite from '../BlackAndWhite';

let Container = styled.View`
  flex-grow: 1;
  position: relative;
`

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isPaused: false
    }
    
    this._solvedFlag = false;
    
    this.handleSolve = this.handleSolve.bind(this);
    this.handleNextLvl = this.handleNextLvl.bind(this);
    this.setPause = this.setPause.bind(this);
  }
  
  async componentWillMount() {
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
    // AdMobInterstitial.addEventListener("interstitialDidLoad", () => console.log('ad loaded'));
    await AdMobInterstitial.requestAd();
    
    MusicManager.play("main", true);
    
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.isPaused) {
        this.setPause(false)
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
    
    if (!this._solvedFlag) return;
    this._solvedFlag = false;
    
    //if last lvl
    const { current, ids } = this.props;
    console.log('ids', ids);
    if (current == ids[ids.length - 1]) {
      console.log("ya won");
      return;
    }
    
    if (!this.props.isAdFree && AdMobInterstitial.isReady) {
      await AdMobInterstitial.showAd();
    }
    
    this.props.actions.nextLvl();
  }
  
  shouldComponentUpdate(nextProps, nextState){
    const differentCurrent = this.props.current != nextProps.current;
    const differentByid = this.props.byid != nextProps.byid;
    const differentPauseState = this.state.isPaused != nextState.isPaused;
    return differentCurrent || differentByid || differentPauseState;
  }

  render() {
    const { current, byid, ids } = this.props;
    const { isPaused } = this.state;
    const { component, name } = lvlLegend[current];
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
        
        <LvlTitle name={name}/>
        {lvlToRender}
        <PauseBtn onPress={() => this.setPause(true)}/>
          { isPaused && <PauseMenu
            onBack={() => this.setPause(false)}
            isClearAvailable={byid[ids[0]].solved || current != 0} />
          }
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
  0: { component: <FirstLevel />, name: "1st one real quick" },
  1: { component: <AboutTime />, name: "It's About Time" },
  2: { component: <PiNumber />, name: "The numer" },
  3: { component: <PrimaryColors />, name: "Primary" },
  4: { component: <SecondaryColors />, name: "Secondary" },
  5: { component: <OnsAndOffs />, name: "Of Ons and Offs" },
  6: { component: <BlackAndWhite />, name: "Black" }
} 