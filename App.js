import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Businesses from './src/views/Businesses';
import Business from './src/views/Business';
import Persons from './src/views/Persons';
import Person from './src/views/Person';
import { QueryClient, QueryClientProvider } from 'react-query';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}