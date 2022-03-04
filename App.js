import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Business from './src/view/Business';
import AddBusiness from './src/view/AddBusiness';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Business' component={Business} />
        <Stack.Screen name='Add Business' component={AddBusiness} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}