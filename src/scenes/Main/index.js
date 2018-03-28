import React, { Component, cloneElement } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import * as actions from 'state/actions/game.actions';

import FirstLevel from '../FirstLevel';

let Container = styled.View`
  flex-grow: 1;
`

class Main extends Component {
  componentWillMount() {
    this.lvlProps = { onSolve: this.props.actions.onSolve};
  }
  render() {
    const { current, counter } = this.props;
    
    let lvlToRender = cloneElement(lvlLegend[current], this.lvlProps);   
    
    return (
      <Container>
        {lvlToRender}
      </Container>
    )
  }
}


function mapStateToProps (state) {
  return {
    ids: state.ids,
    byid: state.byid,
    current: state.current
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

Main.propTypes = {
  ids: PropTypes.array,
  byid: PropTypes.object,
  target: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const lvlLegend = {
  0: <FirstLevel />
} 