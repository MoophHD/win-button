import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, TouchableWithoutFeedback, View } from 'react-native';
import PanWrapper from '../PanWrapper';
import styled from 'styled-components';
import Expo from 'expo';

const Wrapper = styled(View)`
    height: 50px;
    width: 50px;
`

const TextWrapper = styled(View)`
    flex-grow: 1;
    background-color: blue;
`

class Switcher extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            isPressed: false,
            sound: new Expo.Audio.Sound(),
        }
        
        this.handlePress = this.handlePress.bind(this);
    }
    
    async componentWillMount() {
        await this.state.sound.loadAsync(require('assets/switch/switch.mp3'));
    }
    
    handlePress() {
        this._playSound();
        
        if (this.props.onPress) this.props.onPress();
        this.setState(() => ({isPressed: !this.state.isPressed}));
    }
    
    async _playSound() {
        // console.log("swith load");
        const sound = this.state.sound;
        try {
          await sound.setPositionAsync(0);
          await sound.playAsync(); //This works, but just only once!
        //   console.log("swith adfter sound");
        }
        catch (error) {
         console.log('switch sound error: ', error);
        }
    }
    
    render() {
        return(
            <Wrapper>
                <TouchableWithoutFeedback onPress={this.handlePress}>
                    <TextWrapper>
                    
                    <Text>{this.state.isPressed ? 'pressed' : 'unpressed'}</Text>
                    </TextWrapper>
                </TouchableWithoutFeedback>
            </Wrapper>
        )
    }
}

Switcher.propTypes = {
    onPress: PropTypes.func
}

export default Switcher;
