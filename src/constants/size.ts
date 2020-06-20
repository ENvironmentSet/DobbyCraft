import { Dimensions } from 'react-native';


export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const getWidth = (size: number) => size * (width / BaseWidth);
export const getHeight = (size: number) => size * (height / BaseHeight);

export const BaseWidth = 360;
export const BaseHeight = 640;