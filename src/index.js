import React from 'react';

import '~/config/ReactotronConfig';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';



const App = () => (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
)

export default App;
