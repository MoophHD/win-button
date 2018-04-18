import React, { Component } from 'react';
import styled from 'styled-components';
import { View, Image } from 'react-native';
import { Text } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import PropTypes from 'prop-types';

import WinBtn from '../../components/WinBtn';
import MyText from '../../components/MyText';
import Clock from '../../components/Clock';
import ToolTable from '../../components/ToolTable';
import Note from '../../components/Note';
import { CONTENT_WIDTH, CTRL_IMG_SCALE } from 'config/metrics';

const Container = styled.View`
    flex: 1;
    width: ${CONTENT_WIDTH}px;
    margin: auto;
`

const WinBtnContainer = styled.View`
    padding-top: 30px;
    height: 100%;
`

const clockImg = require("assets/clock/clock0.png");
const { width } = Image.resolveAssetSource(clockImg);
const clockPadding = 5; //supplied to clock directly
const side = 2 * width * CTRL_IMG_SCALE + clockPadding * 4;

const ClockContainer = styled.View`
    width: ${ side }px;
    height: ${ side }px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`


const NoteImg = styled.View`
    flex: 1;
    padding: 25px 0;
`

const noteImg = require("assets/lvls/blackAndWhite.png");

const combination = 2310;
class BlackAndWhite extends Component {
    constructor(props) {
        super(props);
        
        this.clockIds = [0,1,2,3];
        this.state = {
            isWin: false,
            
            clockById: {
                0: 3,
                1: 3,
                2: 3,
                3: 3
            }
        }
        
        //9639
        
        this.handleClockPress = this.handleClockPress.bind(this);
    }
    
    handleClockPress(id) {
        let newById = { ...this.state.clockById, [id]: (this.state.clockById[id] + 1)%4 };
        
        this.setState(() => ({ clockById: newById }), () => {
             if (Object.values(newById).join("") == combination) {
                this.handleSolve()
            }
        })
    }
    
    handleSolve() {
        this.props.onSolve();
        this.setState(() => ({ isWin: true }));
    }
    
    render() {
        const { clockById } = this.state;
        const { nextLvl } = this.props;
        return (
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
                                onPress={nextLvl}
                                isActive={this.state.isWin} />
                        </WinBtnContainer>
                    </Row>
                    
                    <Row>
                        <ToolTable center>
                            <ClockContainer>
                                {this.clockIds.map((id, i) => (
                                    <Clock 
                                        style={{margin: clockPadding}}
                                        key={`aboutTimeClock${i}`}
                                        angle={clockById[id]}
                                        onPress={this.handleClockPress.bind(this, id)}/>
                                ))}
                            </ClockContainer>
                        </ToolTable>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

BlackAndWhite.propTypes = {
    onSolve: PropTypes.func,
    isSolved: PropTypes.bool,
    nextLvl: PropTypes.func
}


export default BlackAndWhite;