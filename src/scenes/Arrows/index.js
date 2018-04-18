import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import WinBtn from '../../components/WinBtn';
import SwitchBtn from '../../components/Switch/SwitchBtn';
import ToolTable from '../../components/ToolTable';
import Note from '../../components/Note';
import { CONTENT_WIDTH } from 'config/metrics';

const Container = styled.View`
    flex: 1;
    width: ${CONTENT_WIDTH}px;
    margin: auto;
`

const WinBtnContainer = styled.View`
    padding-top: 30px;
    height: 100%;
`

const SwitchContainer = styled.View`
    display: flex;
    flex-direction: row;
`

const NoteImg = styled.View`
    flex: 1;
    
    padding: 15px 0;
`

const noteImg = require("assets/lvls/arrows.png");

// 135
const PATTERN = '01101101';
class Arrows extends Component {
    constructor(props) {
        super(props); 
        // 0 - left, 1 - right
        this.idle = '';
        this.handleSwitchPress = this.handleSwitchPress.bind(this);
    }
    
    handleSwitchPress(id) {
        console.log(id);
        this.idle += id;
        let idle = this.idle;
        
        if (PATTERN.slice(0, idle.length) != idle) {
            this.idle = '';
        }
        
        if (PATTERN == idle) {
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
                            <NoteImg>
                                <Image 
                                    resizeMode="contain"
                                    source={noteImg}
                                    style={{height: '100%', width: '100%', flex: 1}} />
                            </NoteImg>
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
                                    <SwitchBtn 
                                        style={{margin: 10}}
                                        onPress={this.handleSwitchPress.bind(this, 0)}/>
                                     <SwitchBtn 
                                        style={{margin: 10}}
                                        onPress={this.handleSwitchPress.bind(this, 1)}/>
                            </SwitchContainer>
                        </ToolTable>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

Arrows.propTypes = {
    onSolve: PropTypes.func,
    isSolved: PropTypes.bool,
    nextLvl: PropTypes.func
}

export default Arrows;

