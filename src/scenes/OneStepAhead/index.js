import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import WinBtn from '../../components/WinBtn';
import Switch from '../../components/Switch';
import { CONTENT_WIDTH } from 'config/metrics';

const Container = styled.View`
    flex: 1;
    width: ${CONTENT_WIDTH}px;
    margin: auto;
`

class OneStepAhead extends Component {
    constructor(props) {
        super(props); 
        
        this.state = {
            btnLocation: 0 //0 1 2
        }
    }
    

    handleWinBtnPress() {
        this.setState(() => ({ btnLocation: (this.state.btnLocation + 1)%3 }))
        // if (this.props.isSolved) this.props.nextLvl();
    }
    
    handleRealWinBtnPress() {
        this.setState(() => ({ btnLocation: (this.state.btnLocation + 1)%3 }))
        this.props.onSolve();
        setTimeout(() => { this.props.nextLvl() }, 500);
    }
    
    render() {
        const { isSolved } = this.props;
        const { btnLocation } = this.state;
        
        return(
            <Container>
                <Grid>
                    <Row size={40} style={{ alignItems: 'center', justifyContent: 'center'}}>
                        <View>
                            { btnLocation == 0 
                                &&  <WinBtn 
                                        onPress={() => this.handleWinBtnPress()}
                                        isActive={ isSolved }/>
                                
                            }
                        { btnLocation == 2 
                                &&  
                                <TouchableWithoutFeedback onPress={() => this.handleRealWinBtnPress()}>
                                    <View style={{backgroundColor: undefined, height: 100, width: 100}} />
                                </TouchableWithoutFeedback>
                            }
                        </View>
              
                    </Row>
                    <Row size={60}>
                        <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                            { btnLocation == 1
                                &&  <WinBtn 
                                        onPress={() => this.handleWinBtnPress()}
                                        isActive={ isSolved }/>}
                           { btnLocation == 0
                                &&  
                                <TouchableWithoutFeedback onPress={() => this.handleRealWinBtnPress()}>
                                    <View style={{backgroundColor: undefined, height: 100, width: 100}} />
                                </TouchableWithoutFeedback>
                            }
                        </Col>
                         <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                           { btnLocation == 2
                                &&  <WinBtn 
                                        onPress={() => this.handleWinBtnPress()}
                                        isActive={ isSolved }/>}
                           { btnLocation == 1
                                &&  
                                <TouchableWithoutFeedback onPress={() => this.handleRealWinBtnPress()}>
                                    <View style={{backgroundColor: undefined, height: 100, width: 100}} />
                                </TouchableWithoutFeedback>
                            }
                        </Col>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

OneStepAhead.propTypes = {
    onSolve: PropTypes.func,
    isSolved: PropTypes.bool,
    nextLvl: PropTypes.func
}

export default OneStepAhead;