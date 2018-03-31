import React, { Component } from 'react';
import { Image } from 'react-native';

class ImageFit extends Component {
    render() {
        return(
            <Image 
               style={{ flex: 1,
                        height: 'undefined',
                        width: 'undefined'}}
                resizeMode="contain"
                {...this.props}
   
                />
        )
    }
}

export default ImageFit;