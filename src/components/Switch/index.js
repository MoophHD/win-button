import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components';
import ImageSequence from '../ImageSequence';
import SoundManager from 'assets/audio/SoundManager';
import { IMG_SCALE } from 'config/metrics';

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
    height: ${height * IMG_SCALE}px;
    width: ${width * IMG_SCALE}px;
    position: relative;
`

class Switch extends PureComponent {
    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }
    
    handlePress() {
        SoundManager.play("switch");
        if (this.props.onPress) this.props.onPress();
    }

    render() {
        let key = this.props.isPressed ? legend.pressed : legend.unpressed;
        return(
            <Wrapper style={this.props.style}>
                <TouchableWithoutFeedback onPress={this.handlePress}>
                    <View style={{flex: 1}}>
                        <ImageSequence index={key} images={imgs}/>
                    </View>
                </TouchableWithoutFeedback>
            </Wrapper>
        )
    }
}

Switch.propTypes = {
    onPress: PropTypes.func,
    isPressed: PropTypes.bool
}

export default Switch;
