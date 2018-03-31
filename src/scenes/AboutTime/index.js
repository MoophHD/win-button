import React, { Component } from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import Background from '../../components/Background';
import WinBtn from '../../components/WinBtn';
import Switcher from '../../components/Switcher';
import Clock from '../../components/Clock';

const Container = styled.View`
    flex-grow: 1;
`

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
        
        this.combination = 2102;//9639
        
        this.handleClockPress = this.handleClockPress.bind(this);
    }
    
    handleClockPress(id) {
        console.log('id', id);
        let newById = { ...this.state.clockById, [id]: (this.state.clockById[id] + 1)%4 };
        
        this.setState(() => ({ clockById: newById }), () => {
             if (Object.values(newById).join("") == this.combination) {
                this.onWin();
            }
            console.log(Object.values(newById).join(""));
        })
        
       
    }
    
    onWin() {
        console.log("win");
        this.setState(() => ({ isWin: true }));
    }
    
    render() {
        const { clockById } = this.state;
        return (
            <Container>
                <Background />
                <Grid>
                    <Row size={65}>
                        <Col>
                        
                        </Col>
                        <Col>
                            <WinBtn isActive={this.state.isWin} />
                        </Col>
                    </Row>
                    
                    <Row size={35}>
                        {this.clockIds.map((id, i) => (
                            <Clock 
                                key={`aboutTimeClock${i}`}
                                angle={clockById[id]}
                                onPress={this.handleClockPress.bind(this, id)}/>
                        ))}
                    </Row>
                </Grid>
            </Container>
        )
    }
}

export default AboutTime;