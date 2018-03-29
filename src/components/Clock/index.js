import React, { Component } from 'react';
import PropTypes from 'react-native';
import styled from 'styled-components';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import PanWrapper from '../PanWrapper';

const ClockImg = styled.Image`
    transform: rotate(${pr => pr.rotation}deg);
    flex:1;
    height: undefined;
    width: undefined;
`

//182 183

const Wrapper = styled.View`

    flex: 1;
`

let clockImg = require("assets/clock/body.png");

class Clock extends Component {
    shouldComponentUpdate(nextProps) {
        const differentAngle = this.props.angle != nextProps.angle;
        
        return differentAngle;
    }
    
    render() {
        const { angle, onPress } = this.props;
        
        return (
            <Wrapper>
                <PanWrapper onPress={onPress}>
                    <ClockImg resizeMode="contain" source={clockImg} rotation={angle ? angle * 90 : 0}/>
                </PanWrapper>  
            </Wrapper>
        )
    }
}

Clock.propTypes = {
    onPress: PropTypes.func
}

export default Clock;