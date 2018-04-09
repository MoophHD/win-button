import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import WinBtn from '../../components/WinBtn';
import Button from '../../components/Button';
import Clock from '../../components/Clock';
import Switch from '../../components/Switch';
import ToolTable from '../../components/ToolTable';
import Note from '../../components/Note';
import { CONTENT_WIDTH } from 'config/metrics';

const Container = styled.View`
    flex: 1;
    width: ${CONTENT_WIDTH}px;
    margin: auto;
`

class FirstLevel extends Component {
    constructor(props) {
        super(props); 
        
        this.state = {
            isWinBtnActive: false
        }
        
        this.handleSwitcherPress = this.handleSwitcherPress.bind(this);
    }
    
    handleSwitcherPress() {
        this.setActive(true, () => setTimeout(() => this.setActive(false), 75));
    }
    
    setActive(isActive, cb) {
        this.setState(() => ({ isWinBtnActive: isActive }), () => { if (cb) cb() });
    }
    
    handleWinBtnPress() {
        if (this.state.isWinBtnActive) {
            this.props.onSolve();
            this.props.nextLvl();
        }
    }

    render() {
        const { isSolved } = this.props;
        const { isWinBtnActive } = this.state;
        
        return(
            <Container>
                <Grid>
                    <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                        <WinBtn 
                            onPress={() => this.handleWinBtnPress()}
                            isActive={ isWinBtnActive || isSolved }/>
                      
                    </Row>
                    <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                        <ToolTable>
                            <Button onPress={this.handleSwitcherPress} />
                        </ToolTable>
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