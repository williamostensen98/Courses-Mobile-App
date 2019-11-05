import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./HomeScreen"
import Course from "./CourseScreen"

const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Course: Course
    },
    {
      initialRouteName: 'Home',
    }
  );
  
  export default createAppContainer(AppNavigator);


  