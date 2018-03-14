import React, { Component } from 'react';
import styled from 'styled-components/native';
import { TouchableHighlight, View} from 'react-native';
import PropTypes from 'prop-types';

const Triggerable = styled.TouchableHighlight`
    flex: 1;
`

const TouchableView = ({ onPress, children, ...otherProps}) => {
    
    return (
        <Triggerable 
            onPress={() => onPress()}
            {...otherProps} >
            <View>
                { children }
            </View>
        </Triggerable>
        )
}

TouchableView.propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.node
}

export default TouchableView;