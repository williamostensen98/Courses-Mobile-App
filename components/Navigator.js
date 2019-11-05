import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./HomeScreen"
import CourseScreen from "./CourseScreen"

const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Course: CourseScreen
    },
    {
      initialRouteName: 'Home',
    }
  );
  
  export default createAppContainer(AppNavigator);


  