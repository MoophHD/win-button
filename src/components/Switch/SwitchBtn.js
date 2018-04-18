import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import PanWrapper from '../PanWrapper';
import styled from 'styled-components';
import ImageSequence from '../ImageSequence';
import SoundManager from "assets/audio/SoundManager";
import { CTRL_IMG_SCALE } from 'config/metrics';

const legend = {
    pressed: 0,
    unpressed: 1
}

const imgs = [
    require("assets/switch/pressed.png"),
    require("assets/switch/unpressed.png")
]


const { width, height } = Image.resolveAssetSource(imgs[0]);

const Wrapper = styled(View)`
    height: ${height * CTRL_IMG_SCALE}px;
    width: ${width * CTRL_IMG_SCALE}px;
    position: relative;
`

class Button extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isPressed: false
        }
        
        this.handlePress = this.handlePress.bind(this);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        const DIFFERENT_PRESSED = this.state.isPressed != nextState.isPressed;
        
        return DIFFERENT_PRESSED;
    }
    
    handlePress() {
       
        this.setPressed(true);
        SoundManager.play("btn").then(() => {
            if(this.props.onPress) this.props.onPress();
        })
    }
    
    setPressed(isPressed) {
        this.setState(() => ({ isPressed }));
    }
    
    render() {
        let key = this.state.isPressed ? legend.pressed : legend.unpressed;
        return(
            <Wrapper style={{...this.props.style}}>
               <PanWrapper style={{position: 'absolute'}} onTap={this.handlePress} onRelease={() => this.setPressed(false)}>
                    <ImageSequence index={key} images={imgs}/>
                </PanWrapper>
            </Wrapper>
        )
    }
}

Button.propTypes = {
    onPress: PropTypes.func
}

export default Button;
