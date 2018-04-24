import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import WinBtn from '../../components/WinBtn';
import Switch from '../../components/Switch';
import ToolTable from '../../components/ToolTable';
import Note from '../../components/Note';
import { CONTENT_WIDTH } from 'config/metrics';
import * as Animatable from 'react-native-animatable';

const Container = styled.View`
    flex: 1;
    width: ${CONTENT_WIDTH}px;
    margin: auto;
`

const WinBtnContainer = styled.View`
    padding-top: 30px;
`

const NoteImg = styled.View`
    flex: 1;
    
    padding: 15px 0;
`
const resetSwitchState = {
    0: false,
    1: false,
    2: false
}
const ANI_DUR = 600;
const ANI_ITERATIONS  = 5;
const ANI_PATTERN = [1,2,0,1,2];

// 135
const PATTERN = '12012';
class Blinking extends Component {
    constructor(props) {
        super(props); 
        this.idle = '';
        this.handleSwitchPress = this.handleSwitchPress.bind(this);
        this.switchIds = [0,1,2];
        this.state = {
            switchState: {
                0: false,
                1: false,
                2: false
            }
        }
        
        this.btn = [];
    }
    
    componentDidMount() {
        setTimeout(() => this.playLoop(), 500);
    }
    
    playLoop( lastI=0 ) {
        //last elem
        if (lastI == ANI_PATTERN.length) return;
        let id = ANI_PATTERN[lastI];
        
        this.blink(id, ANI_DUR);
         setTimeout(() => this.playLoop(lastI + 1), ANI_DUR)
    }
    
    playLose() {
        this.setState(() => ({switchState: resetSwitchState}), () => {
            this.switchContainer.shake(150).then(() => this.playLoop(0)); 
        })
       
    }
    
    handleSwitchPress(id) {
        this.setState(() => (
            { switchState: {...this.state.switchState, [id]: !this.state.switchState[id]} }
            )
        );
        
        this.idle += id;
        let idle = this.idle;
        
        console.log(`idle ${idle}`);

        
        if (idle.length == 5 && PATTERN != idle) {
            this.idle = '';
             this.playLose();
            // this.setState(() => ())
        } else if (PATTERN == idle) {
            this.props.onSolve();
        }
    }
    
    handleWinBtnPress() {
        if (this.props.isSolved) {
            this.props.nextLvl();
        } else {
            this.playLose();
        }
    }
    
    blink(id, dur) {
        if (!this.btn[id]) return;
        
        this.btn[id].transitionTo({ opacity: 0.4 }, dur * .5);
        setTimeout(() => this.btn[id].transitionTo({ opacity: 0 }, dur * .5), dur * .5);
    }

    render() {
        const { isSolved } = this.props;
        const { switchState } = this.state;
        
        return(
            <Container>
                <Grid>
                    <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                        <WinBtnContainer>
                            <WinBtn 
                                onPress={() => this.handleWinBtnPress()}
                                isActive={ isSolved }/>
                        </WinBtnContainer>
                      
                    </Row>
                    <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                        <ToolTable>
                            <Animatable.View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}
                                ref={el => {if (el) this.switchContainer = el}}>
                               { this.switchIds.map((id) => (
                                  <TouchableWithoutFeedback 
                                        key={`_touchableKey${id}`}
                                        onPress={() => this.handleSwitchPress(id)}
                                        style={{position: 'relative', backgroundColor: 'transparent'}}>
                                        <View style={{margin: 10}}>
                                            <Switch 
                                                isPressed={switchState[id]}
                                                strict/>
                                            <Animatable.View 
                                                ref={el => { if (el) this.btn[id] = el }}
                                                style={{
                                                opacity: 0,
                                                backgroundColor: 'white', 
                                                height: '100%', 
                                                width: '100%', 
                                                position: 'absolute',
                                                borderRadius: 11.5
                                                }} 
                                                 />
                                         </View>
                                    </TouchableWithoutFeedback>
                                ))}
                            </Animatable.View>
                        </ToolTable>
                    </Row>
                </Grid>
        </Container>
        )
    }
}



            //   <TouchableWithoutFeedback 
            //         onPress={() => this.handleSwitchPress(0)}
            //         style={{position: 'relative', backgroundColor: 'transparent'}}>
            //         <View>
            //             <Switch 
            //                 isPressed={switchState[0]}
            //                 strict/>
            //             <Animatable.View 
            //                 ref={el => { if (el) this.btn[0] = el }}
            //                 style={{
            //                 opacity: 0,
            //                 backgroundColor: 'white', 
            //                 height: '100%', 
            //                 width: '100%', 
            //                 position: 'absolute'}} 
            //                  />
            //          </View>
            //     </TouchableWithoutFeedback>






function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

Blinking.propTypes = {
    onSolve: PropTypes.func,
    isSolved: PropTypes.bool,
    nextLvl: PropTypes.func
}

export default Blinking;

