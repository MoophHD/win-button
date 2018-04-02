import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import Background from '../../components/Background';
import WinBtn from '../../components/WinBtn';
import Switcher from '../../components/Switcher';

const Container = styled.View`
    flex-grow: 1;
`

class FirstLevel extends Component {
    constructor(props) {
        super(props);
        
        this.handleSwitcherPress = this.handleSwitcherPress.bind(this);
    }
    
    handleSwitcherPress() {
        this.props.onSolve();
    }
    
    handleWinBtnPress() {
        if (this.props.isSolved) this.props.nextLvl();
    }

    render() {
        return(
            <Container>
                <Background />
                <Grid>
                    <Row 
                        size={60}
                        style={{alignItems: 'center', justifyContent: 'center'}}>
                        <WinBtn 
                            onPress={() => this.handleWinBtnPress()}
                            isActive={this.props.isSolved}/>
                    </Row>
                    <Row size={40} style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Switcher onPress={this.handleSwitcherPress} />
                    </Row>
                </Grid>
            </Container>
        )
    }
}

FirstLevel.propTypes = {
    onSolve: PropTypes.func,
    isSolved: PropTypes.bool,
    nextLvl: PropTypes.func
}

export default FirstLevel;