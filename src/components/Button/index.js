import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import PanWrapper from '../PanWrapper';
import styled from 'styled-components';
import ImageSequence from '../ImageSequence';
import SoundManager from "assets/audio/SoundManager";
import { IMG_SCALE } from 'config/metrics';

const legend = {
    pressed: 0,
    unpressed: 1
}

const imgs = [
    require("assets/btn/pressed.png"),
    require("assets/btn/unpressed.png")
]

const { width, height } = Image.resolveAssetSource(imgs[0]);
const Wrapper = styled(View)`
    height: ${height * IMG_SCALE}px;
    width: ${width * IMG_SCALE}px;
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
    
    handlePress() {
        SoundManager.play("btn").then(() => {
            if(this.props.onPress) this.props.onPress();
            
            this.setPressed(true);
        })
    }
    
    setPressed(isPressed) {
        this.setState(() => ({ isPressed }));
    }
    
    render() {
        let key = this.state.isPressed ? legend.pressed : legend.unpressed;
        return(
            <Wrapper>
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
