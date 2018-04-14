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
const PATTERN = [0, 2, 4];
class Arrows extends Component {
    constructor(props) {
        super(props); 
        
        this.switchIds = [0,1,2,3,4,5];
        this.idle = [];
        
        this.state = {
            left: false,
            right: false
        }
        
        this.handleSwitchPress = this.handleSwitchPress.bind(this);
    }
    
    handleSwitchPress(isLeft) {
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
                                    <Switch 
                                        strict
                                        isPressed={this.state.left}
                                        style={{margin: 5}}
                                        onPress={this.handleSwitchPress.bind(this, true)}/>
                                     <Switch 
                                        strict
                                        isPressed={this.state.right}
                                        style={{margin: 5}}
                                        onPress={this.handleSwitchPress.bind(this, false)}/>
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