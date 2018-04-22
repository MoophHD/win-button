import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Image } from 'react-native';
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

const ImgWrapper = styled.View`
    padding: 10px;
    padding-top: 0;
    flex: 1;
`

const disabledSwitchObj = {
    1: false,
    2: false,
    3: false,
    4: false
}

const img = require("assets/lvls/ratBuilding.png");

const ORDER = '3421';
class RatAndCheese extends Component {
    constructor(props) {
        super(props); 
        
        this.switchIds = [1,2,3,4];
        this.state = {
            isSwitchPressed: {
                1: false,
                2: false,
                3: false,
                4: false,
            }
        }
        
        this.idleOrder = '';
        
        this.handleSwitchPress = this.handleSwitchPress.bind(this);
    }
    
    handleSwitchPress(id) {
        if (this.state.isSwitchPressed[id]) return;
        
        this.idleOrder += id;
        
        let currentSwitchState = this.state.isSwitchPressed;
        this.setState(() => ({isSwitchPressed: {...currentSwitchState, [id]: true}}));
    
        setTimeout(() => {
           if (this.idleOrder.length == ORDER.length && ORDER.slice(0, this.idleOrder.length) != this.idleOrder) {
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
                        <Note> 
                            <View style={{padding: 5, flexDirection: 'column', display: 'flex', flex: 1}}>
                            
                                    <Image 
                                        resizeMode="contain"
                                        source={img}
                                        style={{
                                            height: '100%', 
                                            width: '100%', 
                                            flex: 1
                                        }} />
                          
                            </View>
                        </Note>
                        
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
                                    <View   key={`looseConnection${i}`}
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                     
                                        <Switch 
                                            strict
                                            isPressed={this.state.isSwitchPressed[id]}
                                            style={{margin: 7.5}}
                                            onPress={this.handleSwitchPress.bind(this, id)}/>
                                    </View>
                                    ))
                                     
                                 }
                            </SwitchContainer>
                        </ToolTable>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

RatAndCheese.propTypes = {
    onSolve: PropTypes.func,
    isSolved: PropTypes.bool,
    nextLvl: PropTypes.func
}

export default RatAndCheese;