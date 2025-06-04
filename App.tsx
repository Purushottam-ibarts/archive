import 'react-native-gesture-handler';
import React, { PropsWithChildren } from 'react';
import { LogBox, Text, View } from 'react-native';
import AppNavigation from './src/feature/app-navigation/app-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppThemeProvider } from './src/feature/app-theming';
import { AppThemesColorsData } from './src/data/theme-colors';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux'
import { persister, store } from './src/store/store';
// import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler"; 
import Config from 'react-native-config';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { MenuProvider } from 'react-native-popup-menu';
import { PersistGate } from 'redux-persist/integration/react';
import ScreenGuardModule from 'react-native-screenguard';

LogBox.ignoreLogs([""]);
// ScreenGuardModule.register({
//     backgroundColor: '#102335`',
//     timeAfterResume: 2000,
// });

function App(): React.JSX.Element {
  // console.log('App is rendering...11'); 
  return (  
      // <View style={{ 
      //   flex: 1,
      //   height:'100%',
      //    backgroundColor: 'red', 
      //    justifyContent: 'center', alignItems: 'center' 
      //    }}>
      //   <Text style={{ color: 'white' }}>Dian Club</Text>
      // </View> 
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <AppThemeProvider theme={'light'} themesColorsData={AppThemesColorsData}>
            <BottomSheetModalProvider>
              <NativeBaseProvider>
                <MenuProvider>
                {/* <Text style={{ color: 'white' }}>Dian Club</Text> */}
                  <AppNavigation />
                </MenuProvider>
              </NativeBaseProvider>
            </BottomSheetModalProvider>
          </AppThemeProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}


export default App;
