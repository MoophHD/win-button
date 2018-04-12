import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import MyText from 'components/MyText';

const Overlay = styled(View)`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.15);
    
`
const Container = styled(View)`
    border-radius: 15px;
    height: 200px;
    width: 150px;
    background-color: #EEEBEB;
`

const Content = styled(View)`
    flex: 1;
    display: flex;
    justify-contnet: center;
    align-items: center;
`

const BtnContainer = styled(View)`

`

const Btn = styled(View)`

`

const Text = styled(MyText)`
    
`

class Hint extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isHint: true
        }
    }
    render() {
        console.log("hint render");
        const { isRewarded, solution, hint } = this.props;
        
        return(
            <Overlay>
                <Container>
                    <Content>
                        <Text>
                            { this.state.isHint ? hint : solution }
                        </Text>
                    </Content>
                    
                    <BtnContainer>
                        <TouchableOpacity onPress={() => this.setState(() => ({isHint: true}))}>
                            <Btn>
                                <MyText>
                                    hint
                                </MyText>
                            </Btn>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => this.setState(() => ({isHint: false}))}>
                            <Btn>
                                <MyText>
                                    solution
                                </MyText>
                            </Btn>
                        </TouchableOpacity>
                    </BtnContainer>
                </Container>
            </Overlay>
        )
    }
}

Hint.propTypes = {
    isRewarded: PropTypes.bool,
    hint: PropTypes.string,
    solution: PropTypes.string
}

export default Hint;