import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, TouchableWithoutFeedback, View } from 'react-native';
import PanWrapper from '../PanWrapper';
import styled from 'styled-components';

const Wrapper = styled(View)`
    height: 50px;
    width: 50px;
    background-color: crimson;
`

class Switcher extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isPressed: false
        }
        
        this.handlePress = this.handlePress.bind(this);
    }
    
    handlePress() {
        // console.log('press')
        if (this.props.onPress) this.props.onPress();
        this.setState(() => ({isPressed: !this.state.isPressed}));
    }
    
    render() {
        return(
            <Wrapper>
                <TouchableWithoutFeedback onPress={this.handlePress}>
                    <View><Text>{this.state.isPressed ? 'pressed' : 'unpressed'}</Text></View>
                </TouchableWithoutFeedback>
            </Wrapper>
        )
    }
}

Switcher.propTypes = {
    onPress: PropTypes.func
}

export default Switcher;
