import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity, Image } from 'react-native';

const WIDTH = 35;
const HEIGHT = WIDTH * 128 / 100;
const SensitiveWrapper = styled(TouchableOpacity)`
    background-color: undefined;
    height: ${HEIGHT}px;
    width: ${WIDTH}px;
`

class HelpBtn extends PureComponent {
    render() {
        return(
            <SensitiveWrapper onPress={this.props.onPress}>
                <Image 
                    source={require("assets/bulb.png")} 
                    style={{height: undefined, width: undefined, flex: 1}}/>
            </SensitiveWrapper>
        )
    }
}

HelpBtn.propTypes = {
    onPress: PropTypes.func.isRequired
}

export default HelpBtn;