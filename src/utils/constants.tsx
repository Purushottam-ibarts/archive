// utils.js

import { Dimensions, StatusBar,Keyboard, Share, Alert } from "react-native";
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';

export const StatusBarHeight = () => {
    return StatusBar.currentHeight;
}

export const wp = (widthPercent :any) => widthPercentageToDP(widthPercent);
export const hp = (heightPercent : any) => heightPercentageToDP(heightPercent);

export const useCustomSafeAreaInsets = () => {
    const insets = useSafeAreaInsets(); 
return useSafeAreaInsets()
} 

export const screen_height = Dimensions.get('window').height;
export const screen_width = Dimensions.get('window').width;




const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

export function useOrientation(): 'PORTRAIT' | 'LANDSCAPE' {
  const [orientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>(
    isPortrait() ? 'PORTRAIT' : 'LANDSCAPE',
  );

  useEffect(() => {
    const callback = () => setOrientation(isPortrait() ? 'PORTRAIT' : 'LANDSCAPE');

    Dimensions.addEventListener('change', callback);

    return () => {
      Dimensions.removeEventListener('change', callback);
    };
  }, []);

  return orientation;
}

export const useKeyboard = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            e => {
                setKeyboardHeight(e.endCoordinates.height);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
            },
        );
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
    return keyboardHeight;
};

export const statusColor = (status: number) => {
  if (status == 1) return "#ffbf00";
  if (status == 2) return "#7BDFE5";
  if (status == 3) return "#00ff00";
  if (status == 4) return "#ff0000";
  else return "#00ff00";
}

export const onShare = async (url: any) => {
  try {    
    const result = await Share.share({
      message: url,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('activityType');
      } else {
        console.log('shared');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('dismissed');
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};

export const formatRelativeTime=(dateString:any)=> {
  const currentDate = new Date();
  const givenDate = new Date(dateString);
  
  const timeDifferenceInSeconds = Math.floor((currentDate - givenDate) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  // Define thresholds for time units
  const timeUnits = [
    { unit: 'second', value: 60 },
    { unit: 'minute', value: 60 },
    { unit: 'hour', value: 24 },
    { unit: 'day', value: 30 },
    { unit: 'month', value: 12 },
    { unit: 'year', value: Infinity }
  ];

  let remainingTime = timeDifferenceInSeconds;
  for (let i = 0; i < timeUnits.length; i++) {
    const { unit, value } = timeUnits[i];
    const timeUnitValue = Math.floor(remainingTime / value);
    
    if (timeUnitValue >= 1) {
      return rtf.format(-timeUnitValue, unit);
    }
    
    remainingTime %= value;
  }
  
  return rtf.format(0, 'second'); // fallback for seconds
}