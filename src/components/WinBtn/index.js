import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PanWrapper from '../PanWrapper';
import { Image, View } from 'react-native';
import styled from 'styled-components';


const legend = {
    happy: {
        unpressed: require("assets/winBtnHappy.png"),
        pressed: require("assets/winBtnHappyPressed.png"),
    },
    sad: {
        unpressed: require("assets/winBtnSad.png"),
        pressed: require("assets/winBtnSadPressed.png"),
    }
}
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

const MyImage = styled.Image`
    flex:1;
    height: undefined;
    width: undefined;
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
        return(
            <Wrapper >
                <PanWrapper onTap={this.handlePress} onRelease={() => this.setPressed(false)}>
                    <MyImage 
                        resizeMode="cover"
                        source={legend[face][press]}/>
                </PanWrapper>
            </Wrapper>
        )
    }
}

WinBtn.propTypes = {
    onPress: PropTypes.func,
    isActive: PropTypes.bool
}

export default WinBtn;
