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
    4: false,
    5: false,
    6: false
}

const img = require("assets/lvls/arrowRight.png");

const ORDER = '531246';
class FallAndRise extends Component {
    constructor(props) {
        super(props); 
        
        this.switchIds = [1,2,3,4,5,6];
        this.state = {
            isSwitchPressed: {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false
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
                            <View style={{padding: 10, flexDirection: 'column', display: 'flex', flex: 1}}>
                                <MyText style={{textAlign: 'center'}} size={35}>
                                    ODD
                                </MyText>
                                <ImgWrapper>
                                   <Image 
                                        resizeMode="contain"
                                        source={img}
                                        style={{
                                            height: '100%', 
                                            width: '100%', 
                                            flex: 1,
                                            transform: [
                                                { rotate: '45deg' }
                                            ]
                                        }} />
                                </ImgWrapper>
                                <View style={{height: 1, width: '82.5%', backgroundColor: '#333', alignSelf: 'center'}} />
                               <MyText style={{textAlign: 'center', padding: 5}} size={35}>
                                    EVEN
                                </MyText>
                                <ImgWrapper>
                                    <Image 
                                        resizeMode="contain"
                                        source={img}
                                        style={{
                                            height: '100%', 
                                            width: '100%', 
                                            flex: 1,
                                            transform: [
                                                { rotate: '-45deg' }
                                            ]
                                        }} />
                                </ImgWrapper>
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
                                        <MyText  size={12}>
                                            {id}
                                        </MyText>
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

FallAndRise.propTypes = {
    onSolve: PropTypes.func,
    isSolved: PropTypes.bool,
    nextLvl: PropTypes.func
}

export default FallAndRise;