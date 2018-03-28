import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import Background from '../../components/Background';
import WinBtn from '../../components/WinBtn';
import Switcher from '../../components/Switcher';
import { Col, Row, Grid } from "react-native-easy-grid";

const Container = styled.View`
    flex-grow: 1;
`

class FirstLevel extends Component {
    constructor(props) {
        super(props);
        
        this.handleSwitherPress = this.handleSwitherPress.bind(this);
    }
    
    handleSwitherPress() {
        if (this._winBtn) console.log(this._winBtn.props);
        if (this._winBtn) this._winBtn.setNativeProps({ isActive: true });
    }

    render() {
        return(
            <Container>
                <Background />
                    <Grid>
                        <Row 
                            size={60}
                            style={{alignItems: 'center', justifyContent: 'center'}}>
                            <WinBtn 
                                isActive={false}/>
                        </Row>
                        <Row size={40} style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Switcher onPress={this.handleSwitherPress} />
                        </Row>
                    </Grid>
            </Container>
        )
    }
}


FirstLevel.propTypes = {
    onSolve: PropTypes.func    
}

export default FirstLevel;