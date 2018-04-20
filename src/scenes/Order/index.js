import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import WinBtn from '../../components/WinBtn';
import Switch from '../../components/Switch';
import ToolTable from '../../components/ToolTable';
import Note from '../../components/Note';
import { CONTENT_WIDTH } from 'config/metrics';
import MyText from '../../components/MyText';

const Container = styled.View`
    flex: 1;
    width: ${CONTENT_WIDTH}px;
    margin: auto;
`

const WinBtnContainer = styled.View`
    margin: auto;
`

const SwitchContainer = styled.View`
    display: flex;
    flex-direction: row;
`
const disabledSwitchObj = {
    0: false,
    1: false,
    2: false
}

// 3 1 4
const ORDER = '120';
class Order extends Component {
    constructor(props) {
        super(props); 
        
        this.switchIds = [0,1,2];
        this.state = {
            isSwitchPressed: {
                0: false,
                1: false,
                2: false
            }
        }
        
        this.idleOrder = '';
        
        this.handleSwitchPress = this.handleSwitchPress.bind(this);
    }
    
    handleSwitchPress(id) {
        this.idleOrder += id;
        
        let currentSwitchState = this.state.isSwitchPressed;
        this.setState(() => ({isSwitchPressed: {...currentSwitchState, [id]: true}}));
        
        setTimeout(() => {
           if (ORDER.slice(0, this.idleOrder.length) != this.idleOrder) {
                this.idleOrder = '';
                
                
                this.setState(() => ({isSwitchPressed: disabledSwitchObj}));
                
                return;
            }
        }, 250)
        
     
        if (this.idleOrder == ORDER) {
            this.props.onSolve();
        }
    }
    
    handleWinBtnPress() {
        if (this.props.isSolved) {
            this.props.nextLvl();
        }
    }

    render() {
        const { isSolved } = this.props;
        return(
            <Container>
                <Grid>
                    <Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
                        <WinBtnContainer>
                            <WinBtn 
                                onPress={() => this.handleWinBtnPress()}
                                isActive={ isSolved }/>
                        </WinBtnContainer>
                      
                    </Row>
                    <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                        <ToolTable>
                            <SwitchContainer>
                                 {this.switchIds.map((id, i) => (
                                        <Switch 
                                            strict
                                            isPressed={this.state.isSwitchPressed[id]}
                                            style={{margin: 7.5}}
                                            key={`orderSwitch${i}`}
                                            onPress={this.handleSwitchPress.bind(this, id)}/>
                                    ))}
                            </SwitchContainer>
                        </ToolTable>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

Order.propTypes = {
    onSolve: PropTypes.func,
    isSolved: PropTypes.bool,
    nextLvl: PropTypes.func
}

export default Order;