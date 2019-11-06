import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./HomeScreen"
import CourseScreen from "./CourseScreen"

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


  