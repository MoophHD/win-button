import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Image } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import WinBtn from '../../components/WinBtn';
import Switch from '../../components/Switch';
import MyText from '../../components/MyText';
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

const ImgWrapper = styled.View`
    padding: 8px;
    padding-top: 0;
    flex: 1;
`

const img = require("assets/lvls/yes.png");

// 135
const PATTERN = [0, 2, 4];
class OddRule extends Component {
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
                            <View style={{padding: 10, flexDirection: 'column', display: 'flex', flex: 1}}>
                                <MyText style={{textAlign: 'center'}} size={50}>
                                    ODD
                                </MyText>
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
                                onPress={() => this.handleWinBtnPress()}
                                isActive={ isSolved }/>
                        </WinBtnContainer>
                      
                    </Row>
                    <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                        <ToolTable>
                            <SwitchContainer>
                                 {this.switchIds.map((id, i) => (
                                    <View   key={`oddRule${i}`}
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <MyText  size={12}>
                                            {i + 1}
                                        </MyText>
                                        <Switch 
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

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

OddRule.propTypes = {
    onSolve: PropTypes.func,
    isSolved: PropTypes.bool,
    nextLvl: PropTypes.func
}

export default OddRule;