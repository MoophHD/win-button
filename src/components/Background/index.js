import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { View } from 'react-native';

const Abstraction = styled.View`
    height: 100%;
    width: 100%;
    background-color: pink;
    position: absolute;
`

class Background extends PureComponent {
    render() {
        return(
            <Abstraction /> 
        )
    }
}

export default Background;