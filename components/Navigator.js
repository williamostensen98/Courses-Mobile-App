import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./HomeScreen"
import CourseScreen from "./CourseScreen"

// To navigate between different screens (HomeScreen and CourseScreen) all screen components are imported here. 
// AppNavigator is a stack for navigating between different screen. In the AppNav object we can set a default screen and also configure options for navigation.
// All screen components have access to props.navigation prop
// Is exported as a AppContainer to render in App.js

const AppNavigator = createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          headerTintColor: '#FFCE00',
          headerStyle: {
            backgroundColor: "#484D5C",
            borderBottomWidth: 0
          },
          
        },

        
      },
      Course: {
        screen: CourseScreen,
        navigationOptions: {
          headerTintColor: '#FFCE00',
          headerStyle: {
            backgroundColor: "#3b3f4b",
            borderBottomWidth: 0
          },
        }
      }
    },
    {
      initialRouteName: 'Home',
    }
  );
  
  export default createAppContainer(AppNavigator);


  