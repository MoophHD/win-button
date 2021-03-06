import React, { Component } from 'react';
import PropTypes from 'react-native';
import styled from 'styled-components';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { CTRL_IMG_SCALE } from 'config/metrics';
import ImageSequence from '../ImageSequence';
import SoundManager from 'assets/audio/SoundManager';

const imgs = [
    require("assets/clock/clock0.png"),
    require("assets/clock/clock1.png"),
    require("assets/clock/clock2.png"),
    require("assets/clock/clock3.png")
]

const { width, height } = Image.resolveAssetSource(imgs[0]);

const Wrapper = styled(View)`
    height: ${height * CTRL_IMG_SCALE}px;
    width: ${width * CTRL_IMG_SCALE}px;
    position: relative;
`

class Clock extends Component {
    shouldComponentUpdate(nextProps) {
        const differentAngle = this.props.angle != nextProps.angle;
        
        return differentAngle;
    }
    
    handlePress() {
        this.props.onPress();
        SoundManager.play("btn");
    }
    
    render() {
        const { angle, style } = this.props;
        return (
            <Wrapper style={style}>
                <TouchableWithoutFeedback onPress={() => this.handlePress()}>
                    <View style={{flex: 1}}>
                        <ImageSequence index={angle || 0} images={imgs}/>
                    </View>
                </TouchableWithoutFeedback>  
            </Wrapper>
        )
    }
}

Clock.propTypes = {
    // onPress: PropTypes.func //alerts on nothing for some reason
}

export default Clock;