import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import styled from 'styled-components';

const MyImage = styled(Image)`
    opacity: ${pr => pr.visible ? 1 : 0};
    flex: 1;
    height: 100%;
    width: 100%;
    position: absolute;

`

class ImageSequence extends Component {

    shouldComponentUpdate(nextProps) {
        const differentIndex = this.props.index != nextProps.index;
        
        return differentIndex;
    }
    
    render() {
        const images = this.props.images;
        let index = this.props.index;
        
        index = index == undefined ? 0 : index;
        return (
            <View style={{flexGrow: 1, position: 'relative', backgroundColor: 'rgba(0,0,0,0)'}}>
                { images.map((src, i) => (
                    <MyImage 
                        resizeMode="cover"
                        key={`imgSequence${i}`} 
                        source={src} 
                        visible={i == index} />
                ))}
            </View>
        )
    }
}

ImageSequence.propTypes = {
    images: PropTypes.array.isRequired,
    index: PropTypes.number
}

export default ImageSequence;