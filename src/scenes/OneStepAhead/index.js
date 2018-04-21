import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import WinBtn from '../../components/WinBtn';
import Switch from '../../components/Switch';
import { CONTENT_WIDTH } from 'config/metrics';

const Container = styled.View`
    flex: 1;
    width: ${CONTENT_WIDTH}px;
    margin: auto;
`

class OneStepAhead extends Component {
    constructor(props) {
        super(props); 
        
        this.state = {
            btnLocation: 0 //0 1 2
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
        if (this.props.isSolved) this.props.nextLvl();
    }
    
    render() {
        const { isSolved } = this.props;
        const { btnLocation } = this.state;
        
        return(
            <Container>
                <Grid>
                    <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                        { btnLocation == 0 
                        &&  <Switch 
                                onPress={() => this.handleWinBtnPress()}
                                isActive={ isSolved }/>}
                    </Row>
                    <Row size={60}>
                        <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                        </Col>
                         <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                        </Col>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

OneStepAhead.propTypes = {
    onSolve: PropTypes.func,
    isSolved: PropTypes.bool,
    nextLvl: PropTypes.func
}

export default OneStepAhead;