
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListScreen } from './screens/ListScreen';
import { DetailScreen } from './screens/DetailScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { DeleteScreen } from './screens/DeleteScreen';
import React from 'react';

const Stack = createStackNavigator();

const App=()=>{
return(
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='LoginScreen' component={LoginScreen}/>
      <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
      <Stack.Screen name='ListScreen' component={ListScreen}/>
      <Stack.Screen name='DeleteScreen' component={DeleteScreen}/>
      <Stack.Screen name='DetailScreen' component={DetailScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
)
}
export default App;