import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from 'native-base';
import { View } from 'react-native';
import scaleFont from 'assets/gist/scaleFont';

const Container = styled(View)`
    padding: 25px 0;
    width: 100%;
`

const ideal_size = 36;
const size = scaleFont(ideal_size);

const Title = styled(Text)`
    font-size: ${size}px;
    margin: auto;
    font-family: MyriadProBold;
`

class LvlTitle extends PureComponent {
    render() {
        const { name } = this.props;
        return(
            <Container>
                <Title>
                    {name}
                </Title>
            </Container>
        )
    }
}

LvlTitle.propTypes = {
    name: PropTypes.string.isRequired
}

export default LvlTitle;