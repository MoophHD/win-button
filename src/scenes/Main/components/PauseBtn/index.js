import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity, Alert } from 'react-native';
import { Octicons } from '@expo/vector-icons';

const COLOR = '#000222';
const SensitiveWrapper = styled(TouchableOpacity)`
    background-color: undefined;
`

class PauseBtn extends PureComponent {
    render() {
        return(
            <SensitiveWrapper onPress={this.props.onPress}>
                <Octicons name={"gear"} color={COLOR} size={42}/>
            </SensitiveWrapper>
        )
    }
}

PauseBtn.propTypes = {
    onPress: PropTypes.func.isRequired
}

export default PauseBtn;