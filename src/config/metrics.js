import { Dimensions, Platform } from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
const { height, width } = Dimensions.get('window');

export const ANDROID_STATUSBAR = 24;
export const DEVICE_HEIGHT = height;
export const DEVICE_WIDTH = width;

//IMGS

const TARGET_WIDTH = 1440; //rn scales screen size by 0.5
const TARGET_CONTENT_WIDTH = 1291.25;

const scale = DEVICE_WIDTH / TARGET_WIDTH;
export const IMG_SCALE = scale;
export const CTRL_IMG_SCALE = scale * 1.35;
export const SCALE = scale;
export const CONTENT_WIDTH = IMG_SCALE * TARGET_CONTENT_WIDTH;