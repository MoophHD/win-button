import React, { Component } from 'react';
import PropTypes from 'react-native';
import styled from 'styled-components';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import PanWrapper from '../PanWrapper';

const clockImg = require("assets/clock/body.png");
const { width, height } = Image.resolveAssetSource(clockImg);

const realH = 120;
const realW = realH * width / height;

const Wrapper = styled.View`
    padding: 15px;
    height: ${realH}px;
    width: ${realW}px;
`

const ClockImg = styled(Image)`
    transform: rotate(${pr => pr.rotation}deg);
`

// 182 183
// 290 380


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
                  <ClockImg 
                   rotation={angle ? angle * 90 : 0}
                   style= {{flex:1 , width: undefined, height: undefined}}    
                   source={clockImg}
                    />
                </PanWrapper>  
            </Wrapper>
        )
    }
}

                // <ClockWrapper>
                //         <ClockImg source={clockImg} rotation={angle ? angle * 90 : 0}/>
                //     </ClockWrapper>

Clock.propTypes = {
    // onPress: PropTypes.func //alerts on nothing for some reason
}

export default Clock;