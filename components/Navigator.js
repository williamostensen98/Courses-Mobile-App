import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./HomeScreen"
import Course from "./Course"
import Filter from "./Filter"

const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Course: Course,
      Filter: Filter
    },
    {
      initialRouteName: 'Home',
    }
  );
  
  export default createAppContainer(AppNavigator);


  