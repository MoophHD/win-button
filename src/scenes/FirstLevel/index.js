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
        
        this.state = {
            isWin: props.isSolved
        }
        
        this.handleSwitcherPress = this.handleSwitcherPress.bind(this);
    }
    
    handleSwitcherPress() {
        this.setState(() => ({ isWin: true }));
        this.props.onSolve();
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
                            onPress={() => { if(this.state.isWin) this.props.nextLvl() } }
                            isActive={this.state.isWin}/>
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
    onSolve: PropTypes.func.isRequired,
    nextLvl: PropTypes.func.isRequired
}

export default FirstLevel;