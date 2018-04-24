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

const ClockContainer = styled.View`
    display: flex;
    flex-direction: row;
`

const ImgWrapper = styled.View`
    flex: 1;
    padding: 6.5px;
    padding-top: 0;
`

const img = require("assets/lvls/colorCombination.png");

const combination = 2301;
class ColorCombination extends Component {
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
                            <View style={{flexDirection: 'column', display: 'flex', flex: 1}}>
                   
                                <ImgWrapper>
                                    <Image 
                                        resizeMode="contain"
                                        source={img}
                                        style={{height: '100%', width: '100%', flex: 1}} />
                                </ImgWrapper>
                            </View>
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
                                        style={{margin: 7.5}}
                                        key={`newsClock${i}`}
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

ColorCombination.propTypes = {
    onSolve: PropTypes.func,
    isSolved: PropTypes.bool,
    nextLvl: PropTypes.func
}


export default ColorCombination;