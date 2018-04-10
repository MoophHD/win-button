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

const ClWheelWrapper = styled.View`
    flex: 1;
`

const clWheelImg = require("assets/lvls/colorWheel.png");

// 135
const PATTERN = [0, 2, 4];
class PrimaryColors extends Component {
    constructor(props) {
        super(props); 
        
        this.switchIds = [0,1,2,3,4,5];
        this.idle = [];
        
        this.handleSwitchPress = this.handleSwitchPress.bind(this);
    }
    
    handleSwitchPress(id) {
        let idle = this.idle;
        
        if (idle.indexOf(id) == -1) {
            idle.push(id);
        } else {
            idle.splice(idle.indexOf(id), 1);
        }

        
        if (arraysEqual(idle, PATTERN)) {
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
                            <ClWheelWrapper>
                                <Image 
                                    resizeMode="contain"
                                    source={clWheelImg}
                                    style={{height: '100%', width: '100%', flex: 1}} />
                            </ClWheelWrapper>
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
                                        <Switch 
                                            style={{margin: 5}}
                                            key={`prColorsSwitch${i}`}
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

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

PrimaryColors.propTypes = {
    onSolve: PropTypes.func,
    isSolved: PropTypes.bool,
    nextLvl: PropTypes.func
}

export default PrimaryColors;