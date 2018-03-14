import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Body, Button, Text } from 'native-base';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as actions from 'state/actions/game.actions';

const StyledBody = styled(Body)`
  align-items: center;
  justify-content: center;
`

const Title = styled(Text)`
  font-size: 50px;
  margin-bottom: 35px;
`

const StyledBtn = styled(Button)`
  height: 75px;
  width: 150px;
  justify-content: center;
  align-items: center;
`
class Main extends Component {
  render() {
    const { actions, counter } = this.props;
    return (
      <Container>
        <StyledBody>
          <Title>{counter}</Title>
          <StyledBtn onPress={() => actions.add()}>
            <Text>
              Add
            </Text>
          </StyledBtn>
        </StyledBody>
      </Container>
  )

  }
}


function mapStateToProps (state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

Main.propTypes = {
  counter: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);