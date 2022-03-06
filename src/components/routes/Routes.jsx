import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Businesses from '../../views/Businesses';
import Business from '../../views/Business';
import Persons from '../../views/Persons';
import Person from '../../views/Person';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: '#000'
        }}>
          <Stack.Screen name='Businesses' component={Businesses}/>
          <Stack.Screen name='Business' component={Business} />
          <Stack.Screen name='Persons' component={Persons} />
          <Stack.Screen name='Person' component={Person} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}