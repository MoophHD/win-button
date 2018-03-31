import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons'

const COLOR = '#fff';
const SensitiveWrapper = styled(TouchableOpacity)`
    position: absolute;
    padding: 5px;
    top: 0;
    right: 0;
    background-color: undefined;
`

class PauseBtn extends PureComponent {
    render() {
        return(
            <SensitiveWrapper onPress={this.props.onPress}>
                <Octicons name={"gear"} color={COLOR} size={50}/>
            </SensitiveWrapper>
        )
    }
}

PauseBtn.propTypes = {
    onPress: PropTypes.func.isRequired
}

export default PauseBtn;