import { createStackNavigator } from 'react-navigation';

import Main from './src/component/Main';
import Splash from './src/component/Splash';

const RootStack = createStackNavigator({
    Home: {
      screen: Splash,
    },
    Main: {
      screen: Main,
    }
  });

export default RootStack;
