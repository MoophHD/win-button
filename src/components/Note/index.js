import React, { Component } from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components';
import { IMG_SCALE } from 'config/metrics';

const img = require("assets/note/Note.png")

const { width, height } = Image.resolveAssetSource(img);

const Wrapper = styled(View)`
    height: ${height * IMG_SCALE}px;
    width: ${width * IMG_SCALE}px;
    position: relative;
`

const Container = styled(View)`
    flex: 1;
    padding: 5px;
    padding-bottom: 15px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const Img = styled(Image)`
    position: absolute;
    flex: 1;
    height: 100%;
    width: 100%;
`

class Note extends Component {
    render() {
        const { children } = this.props;
        
        return(
            <Wrapper {...this.props}>
                <Img source={img} />
                <Container>
                    {children}
                </Container>
            </Wrapper>
        )
    }
}

export default Note;