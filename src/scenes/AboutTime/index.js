import React, { Component } from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import { Text } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import PropTypes from 'prop-types';

import WinBtn from '../../components/WinBtn';
import MyText from '../../components/MyText';
import Clock from '../../components/Clock';
import { DEVICE_WIDTH } from 'config/metrics';

const Container = styled.View`
    flex-grow: 1;
`
const CodeContainer = styled.View`
    display: flex;
    align-items: center;
    background-color: #F1F2F4;
    flex: 1;
    border-radius: 10px;
    box-shadow: 10px 10px 10px 
`


// shadowRadius: 5,

// shadowOpacity: 1.0

const BottomRow = styled(Row)`
    padding: 10px;
    justify-content: center;
    align-items: center;
`

const ClockContainer = styled(View)`
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #4EC2E7;
    width: 80%;
    border-radius: 10px;
`

const center= {justifyContent: 'center', alignItems: 'center'};
const combination = 2011;
const viewCombination = 9366;
class AboutTime extends Component {
    constructor(props) {
        super(props);
        
        this.clockIds = [0,1,2,3];
        this.state = {
            isWin: false,
            
            clockById: {
                0: 0,
                1: 0,
                2: 0,
                3: 0
            }
        }
        
        //9639
        
        this.handleClockPress = this.handleClockPress.bind(this);
    }
    
    handleClockPress(id) {
        let newById = { ...this.state.clockById, [id]: (this.state.clockById[id] + 1)%4 };
        
        this.setState(() => ({ clockById: newById }), () => {
             if (Object.values(newById).join("") == combination) {
                this.onWin();
            }
        })
    }
    
    onWin() {
        this.setState(() => ({ isWin: true }));
    }
    
    render() {
        const { clockById } = this.state;
        return (
            <Container>
                <Grid>
                    <Row size={45} style={{padding: 10}}>
                        <Col style={{justifyContent:'center', alignItems:'stretch'}}>
                            <CodeContainer>
                                <MyText size={95}>
                                    {viewCombination.toString().slice(0, 2)}
                                </MyText>
                                 <MyText size={95}>
                                    {viewCombination.toString().slice(2)}
                                </MyText>
                            </CodeContainer>
                        </Col>
                        <Col style={center}>
                            <WinBtn isActive={this.state.isWin} />
                        </Col>
                    </Row>
                    
                    <BottomRow size={55} >
                        <ClockContainer>
                            {this.clockIds.map((id, i) => (
                                <Clock 
                                    key={`aboutTimeClock${i}`}
                                    angle={clockById[id]}
                                    onPress={this.handleClockPress.bind(this, id)}/>
                            ))}
                        </ClockContainer>
                    </BottomRow>
                </Grid>
            </Container>
        )
    }
}

AboutTime.propTypes = {
    onSolve: PropTypes.func,
    isSolved: PropTypes.bool,
    nextLvl: PropTypes.func
}


export default AboutTime;