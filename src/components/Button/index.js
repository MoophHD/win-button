import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, TouchableWithoutFeedback, View } from 'react-native';
import PanWrapper from '../PanWrapper';
import styled from 'styled-components';
import ImageSequence from '../ImageSequence';

const legend = {
    pressed: 0,
    unpressed: 1
}

const imgs = [
    require("assets/btn/pressed.png"),
    require("assets/btn/unpressed.png")
]

const { width, height } = Image.resolveAssetSource(imgs[0]);

let realH = 65;
let realW = realH * width / height;

const Wrapper = styled(View)`
    height: ${realH}px;
    width: ${realW}px;
    position: relative;
`

class Button extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            isPressed: false
        }
        
        this.handlePress = this.handlePress.bind(this);
    }
    
    handlePress() {
       if(this.props.onPress) this.props.onPress();
       
       this.setPressed(true);
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
