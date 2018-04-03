import React, { PureComponent } from 'react';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import { DEVICE_WIDTH } from 'config/metrics';


class MyText extends PureComponent {
    render() {
        const { size } = this.props;
        const scaledSize = Math.round(size * DEVICE_WIDTH / 375);
        return(
            <Text
                style={{fontFamily: 'Raleway', fontSize: scaledSize}}
                {...this.props} />
        )
    }
}

MyText.propTypes = {
    size: PropTypes.number
}

export default MyText;