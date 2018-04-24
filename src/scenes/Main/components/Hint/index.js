import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Button, Text } from 'native-base';
import styled from 'styled-components';
import MyText from 'components/MyText';
import { AdMobInterstitial, AdMobRewarded } from 'expo';

const Overlay = styled(View)`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
`

const TriggerBg = styled(View)`
    position: absolute;
    height: 100%;
    width: 100%;
`
const RewardedContainer = styled(View)`
    flex: 1;
`

const WatchVidContainer = styled(View)`
    flex: 1
`

const Container = styled(View)`
    border-radius: 15px;
    height: 300px;
    width: 275px;
    background-color: #EEEBEB;
    justify-content: center;
    align-items: center;
`

const Content = styled(View)`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BtnContainer = styled(View)`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: stretch;
    flex-direction: row;
`

const Btn = styled(TouchableOpacity)`
    flex: 1;
    border-top-color: grey;
    border-top-width: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
`


class Hint extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isHint: true,
            isLoading: false,
            isRewarded: false
        }
        
        this.handleWatchAd = this.handleWatchAd.bind(this);
    }
    
    componentWillMount() {
        AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () => this.reward());
    }
    
    reward() {
        if (this.state.isRewarded) return;
        
        this.setState(() => ({isRewarded: true}));
        this.props.onShow();
    }
    
  async showRewardedAd() {
    // AdMobRewarded.requestAd(() => AdMobRewarded.showAd());
    await AdMobRewarded.showAd()
    await AdMobRewarded.requestAd();
  }
    
    handleWatchAd() {
        this.showRewardedAd();
        if (!this.state.isLoading) this.setState(() => ({isLoading: true}));
    }
    
    render() {
        const { solution, hint, onClose, wasShown } = this.props;
        const { isRewarded, isLoading } = this.state;
        
        return(
            <Overlay>
            <TouchableWithoutFeedback style={{height: '100%', width: '100%'}} onPress={() => onClose()}>
                <TriggerBg />
            </TouchableWithoutFeedback>
                <Container>
                    { isRewarded || wasShown ? 
                        <RewardedContainer>
                            <Content>
                                <MyText style={{textAlign: 'center'}} size={26}>
                                    { this.state.isHint ? hint : solution }
                                </MyText>
                            </Content>
                            
                            <BtnContainer>
                                <Btn onPress={() => this.setState(() => ({isHint: true}))}>
                                    <MyText>
                                        hint
                                    </MyText>
                                </Btn>
                                
                                <View style={{height: '100%', width: 1, backgroundColor: 'grey'}}/>
                                
                                <Btn onPress={() => this.setState(() => ({isHint: false}))}>
                                    <MyText>
                                        solution
                                    </MyText>
                                </Btn>
                            </BtnContainer>
                        </RewardedContainer>
                        :
                        <WatchVidContainer>
                        { isLoading ? 
                            <Container>
                                <ActivityIndicator size={50} color="#47CEBF"/>
                            </Container>
                        :
                            <Container>
                                    <MyText>
                                        Watch ad to get a hint/solution
                                    </MyText>
                                    <View>
                                        <Button
                                            onPress={this.handleWatchAd}
                                            style={{
                                                marginTop: 10,
                                                height: 60, 
                                                width: 125, 
                                                display: 'flex', 
                                                justifyContent: 'center', 
                                                alignItems: 'center'}}>
                                            <Text style={{fontFamily: 'MyriadProBold', fontSize: 17}}>
                                                Watch
                                            </Text>
                                        </Button>
                                    </View>
                            </Container>
                        }
                        </WatchVidContainer>
                    }
                </Container>
            </Overlay>
        )
    }
}

Hint.propTypes = {
    hint: PropTypes.string,
    solution: PropTypes.string,
    onClose: PropTypes.func,
    onShow: PropTypes.func,
    wasShown: PropTypes.bool
}

export default Hint;