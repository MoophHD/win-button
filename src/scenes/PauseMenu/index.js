import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from 'state/actions/game.actions';
import { View, Alert, TouchableWithoutFeedback } from 'react-native';
import { Button, Text } from 'native-base';
import styled from 'styled-components';
import { Ionicons, Entypo } from '@expo/vector-icons';

const activeCl = "#D95459";
const inactiveCl = "#a5a5a5";

const Wrapper = styled(View)`
    position: absolute;
    z-index: 100;
    height: 100%;
    width: 100%;
    background-color: #B7C9F1;
    display: flex;
    
    justify-content: center;
    align-items: center;
    
    padding: 175px 50px;
`

const Btn = styled(Button)`
    height: 75px;
    background-color: ${props => props.active ? activeCl : inactiveCl};
    margin-top: 8px;
`

const IconContainer = styled(View)`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const IconWrapper = styled(View)`
    height: 115px;
    width: 115px;
    background-color: ${props => props.active ? activeCl : inactiveCl};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
`

class PauseMenu extends Component {
    shouldComponentUpdate(nextProps) {
        const differentClearAvailability = this.props.isClearAvailable != nextProps.isClearAvailable;
        const differentMusicActive = this.props.isMusicActive != nextProps.isMusicActive;
        const differentSoundActive = this.props.isSoundActive != nextProps.isSoundActive;
        
        return differentClearAvailability || differentMusicActive || differentSoundActive;
    }
    
    clear() {
        Alert.alert(
          'Alert',
          'You are going to delete all your progress',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', onPress: () => this.props.actions.clear()},
          ],
          { cancelable: true }
        )
    }
    
    render() {
        const { isClearAvailable, actions, isSoundActive, isMusicActive, onRestart } = this.props;
        const { setSound, setMusic } = actions;
        
        return(
            <Wrapper>
                <IconContainer>
                    <TouchableWithoutFeedback onPress={ () => setMusic(!isMusicActive) } >
                       <IconWrapper
                            active={isMusicActive}>
                            <Ionicons
                                size={85}
                                name={"md-musical-notes"} 
                                color={'#fff'} />
                        </IconWrapper>
                    </TouchableWithoutFeedback>
                 
                    <TouchableWithoutFeedback onPress={ () => setSound(!isSoundActive) } >
                        <IconWrapper
                            active={isSoundActive} >
                             <Entypo 
                                size={85}
                                name={"sound"} 
                                color={'#fff'} />
                        </IconWrapper>
                    </TouchableWithoutFeedback>
                </IconContainer>
                 <Btn 
                    onPress={() => onRestart()}
                    block 
                    active={true}>
                    <Text>
                        Restart
                    </Text>
                </Btn>
                <Btn 
                    onPress={() => this.clear()}
                    block 
                    active={isClearAvailable} 
                    disabled={!isClearAvailable}>
                    <Text>
                        Delete progress
                    </Text>
                </Btn>
            </Wrapper>
        )
    }
}

PauseMenu.propTypes = {
    isClearAvailable: PropTypes.bool,
    onRestart: PropTypes.func,
    onBack: PropTypes.func
}

function mapStateToProps(state) {
    return {
        isMusicActive: state.isMusicActive,
        isSoundActive: state.isSoundActive
    }
}

export default connect(
    mapStateToProps, 
    (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
)(PauseMenu);