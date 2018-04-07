import React, { PureComponent } from 'react';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import { DEVICE_WIDTH } from 'config/metrics';


class MyText extends PureComponent {
    render() {
        const { size, bold } = this.props;
        const scaledSize = Math.round(size * DEVICE_WIDTH / 375);
        return(
            <Text
                style={{fontFamily: `${bold ? 'MyriadProBold' : 'MyriadPro' }`, fontSize: scaledSize}}
                {...this.props} />
        )
    }
}

MyText.propTypes = {
    size: PropTypes.number
}

export default MyText;