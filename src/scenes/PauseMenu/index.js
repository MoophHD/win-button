import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from 'state/actions/game.actions';
import { View, Alert } from 'react-native';
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
    
    padding: 200px 50px;
`

const IconContainer = styled(View)`
    flex: 2;
    display: flex;
    flex-direction: row;
`

const Btn = styled(Button)`
    height: 75px;
    background-color: ${props => props.active ? activeCl : inactiveCl};
`

class PauseMenu extends Component {
    shouldComponentUpdate(nextProps) {
        const differentClearAvailability = this.props.isClearAvailable != nextProps.isClearAvailable;
        return differentClearAvailability;
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
        const { isClearAvailable } = this.props;
        return(

            <Wrapper>
            {/*
                <IconContainer>
                    <IconBtn rounded>
                        <Ionicons 
                            size={100}
                            name={"md-musical-notes"} 
                            color={'#333'} />
                    </IconBtn>
                    <IconBtn rounded>
                         <Entypo 
                            size={100}
                            name={"sound"} 
                            color={'#333'} />
                    </IconBtn>
                </IconContainer>
                */}
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
    isClearAvailable: PropTypes.bool
}

export default connect(
    null, 
    (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
)(PauseMenu);