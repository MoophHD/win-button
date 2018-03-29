import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PanWrapper from '../PanWrapper';
import { Image, View } from 'react-native';
import styled from 'styled-components';
import ImageSequence from '../ImageSequence';

const legend = {
    happy: {
        unpressed: 0,
        pressed: 1
    },
    sad: {
        unpressed: 2,
        pressed: 3
    }
}

const imgs = [require("assets/winBtn/happyUnpressed.png"), require("assets/winBtn/happyPressed.png"), require("assets/winBtn/sadUnpressed.png"), require("assets/winBtn/sadPressed.png")];
let imgBounds = {
    w: 407,
    h: 414
}

let heightWidthRatio = imgBounds.h / imgBounds.w; 
let width = 100;
let height = heightWidthRatio * width;

const Wrapper = styled(View)`
    height: ${height}px;
    width: ${width}px;
    background-color: transparent;
`

class WinBtn extends Component {
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
        const { isActive } = this.props;
        let face = isActive ? 'happy' : 'sad';
        let press = this.state.isPressed ? 'pressed' : 'unpressed';
        
        let key = legend[face][press];
        return(
            <Wrapper>
                <PanWrapper onTap={this.handlePress} onRelease={() => this.setPressed(false)}>
                    <ImageSequence index={key} images={imgs}/>
                </PanWrapper>
            </Wrapper>
        )
    }
}

//   <MyImage 
                        
//                         source={legend[face][press]}/>

WinBtn.propTypes = {
    onPress: PropTypes.func,
    isActive: PropTypes.bool
}

export default WinBtn;
