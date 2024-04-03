import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { StyleSheet, ImageBackground } from "react-native"; 

import NoteList from "./screens/NoteList";
import NewNote from './screens/NewNote';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
};

  
const App = () => {         
  return ( 
      <ImageBackground
        source={require('./assets/mountain.jpg')} 
        resizeMode="cover" 
        style={styles.image}
      >
        <NavigationContainer theme={theme}>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="NoteList">
            <Stack.Screen name="NoteList" component={NoteList} />
            <Stack.Screen name="NewNote" component={NewNote} />
          </Stack.Navigator>
        </NavigationContainer> 
        <StatusBar style="light" />
      </ImageBackground>       
  ); 
}; 
  
const styles = StyleSheet.create({ 
  image: {
    flex: 1,
    justifyContent: 'center',
  },
}); 
  
export default App;
