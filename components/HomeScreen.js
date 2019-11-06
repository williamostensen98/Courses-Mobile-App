import React, {Component} from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, Header} from 'react-native';
import {Card} from "react-native-elements"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchBar from './SearchBar';
import * as Font from 'expo-font';
import Filter from './Filter'
import { throwStatement } from '@babel/types';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class HomeScreen extends Component {
   

      
    static navigationOptions = {
      
      };

    state = {
        query: '',
        courses: null,
        limit: 10,
        total: 0,
        fontLoaded: false,
        showFilter: false,
        sort : {
          codeClicked: false, 
          nameClicked: true, 
        }, 
        filter: "",
        hasSearched: false,
      }
    
      fetchCourses = async (q="", sorting, filtering) => {
        const courses = await fetch("http://it2810-39.idi.ntnu.no:3001/courses?" + q + sorting + filtering)
        .then(res => res.json())
        .catch(err => console.log(err))
        // console.log("Type of courses: ", courses.docs)
        this.setState({
          courses: courses.docs, 
          limit: courses.limit,
          total: courses.total,
          sort: sorting, 
          filter: filtering,
          hasSearched: true
        })
        console.log(this.state.query, this.state.sort, this.state.filter)
      }
      setSortState = (code, name) => {
        this.setState({
          sort: {
            codeClicked: !code, 
            nameClicked: !name
          }
        })
      }

      setQuery = (q) => {
        
        this.setState({
          query: q
        })
      }
    
    
      async componentDidMount() {
        this.fetchCourses()
        await Font.loadAsync({
          'oswald': require('./../assets/fonts/Oswald.ttf'),
        });
        this.setState({ fontLoaded: true });
      }
    
      mapCoursesToCard() {
        if (this.state.courses != null) {
          let courseList = this.state.courses.map((course, index) => 
          <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate("Course", {
              course: course
          })} style={{width: "100%"}}>
            <Card 
              course={course} 
              key={index} 
              
              containerStyle={{backgroundColor: "#3b3f4b", borderRadius: 15, borderColor: "#3b3f4b"}}
            >
              {this.state.fontLoaded ? 
              <Text style={{color: "#FFCE00", fontSize: 20, fontWeight: "bold", fontFamily: 'oswald'}}>
                {course.course_code + " " + course.norwegian_name}
              </Text>: null}
            </Card>
            </TouchableOpacity>
          )
        return courseList
        }
        return null
        
      }
    
      handleScroll = nativeEvent => {
        if (this.isCloseToBottom(nativeEvent) && (this.state.limit < this.state.total)) {       
          this.setState(
            prevState => ({limit: prevState.limit+=10}))
            this.fetchCourses(this.state.query + "&limit=" + this.state.limit,this.state.sort,this.state.filter)
        }
      }
      
      
    
      isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {   
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
      }
      
      ShowHideComponent = () => {
        
        if (this.state.showFilter === true) {
          this.setState({showFilter : false });
        } else {
          this.setState({ showFilter : true });
        }
      };
      filterFunction = () => {
        return  (
          <View style={styles.filterContainer}>
            <Filter setSort={this.setSortState}  fetchCourses={this.fetchCourses} query={this.state.query} setQuery={this.setQuery} limit={this.state.limit} />
          </View> )
      }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: "row"}}>
          <Icon name="bar-chart" size={35} color={"#FFCE00"}/> 
          <Text h1 style={styles.header}>
          {""}Courses
          </Text>
          </View>
          <View style={{flexDirection: "row"}}>
            <Icon name="search" size={14} color={"#C0CCD8"} style={{top: 5}}/> 
            <Text style={styles.searchText}>
               SEARCH FOR COURSE NAMES OR CODES...
            </Text>
          </View>
           <SearchBar style={styles.searchbar} fetchCourses={this.fetchCourses} setQuery={this.setQuery}/>
           <TouchableOpacity
          
          style={styles.button}
          onPress={this.ShowHideComponent}
        >
           {this.state.fontLoaded ? 
           <Text style={styles.buttonText}>
             {"FILTER"}
          </Text>: null}
        </TouchableOpacity>
        {this.state.showFilter ? this.filterFunction() : null}
        </View>
        <ScrollView 
          scrollEventThrottle={16} 
          onScroll={({nativeEvent}) => this.handleScroll(nativeEvent)} 
          contentContainerStyle={{alignItems: 'center', justifyContent: "space-between"}} 
        >
          {this.mapCoursesToCard()}

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#484D5C',
    },
    text: {
      fontSize: 30,
      textAlign: 'center',
      margin: 10,
      color: "#FFCE00"
    },
    header: {
      fontSize: 30,
      textAlign: 'center',
      color: "#FFCE00",
      fontStyle: "italic"
    },
    searchText: {
      color: "#C0CCD8",
      fontSize: 14,
      margin: 5
    },

    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    card: {
      backgroundColor: "#3b3f4b",
      flex: 1,
      padding: 0,
    },
    courseText : {
      color: "#FFFFFF"
    }, 
    searchContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%"
    },
    searchbar: {
      
    },
    button: {
      backgroundColor: "#ffce00",
      width: "85%",
      borderRadius: 5,
      // borderWidth: 1,
      // borderColor: "#ffce00",
      padding: 5,
      marginBottom: 20
    }, 
    buttonText:{
      justifyContent: 'center',
      alignSelf: 'center',
      textAlign: 'center',
      color: "#3b3f4b",
      fontSize: 20,
      // textAlign: 'center',
      margin: 'auto',
      fontFamily: 'oswald',
    }, 
    filterContainer: {
      width: "100%", 
      height: "85%", 
      backgroundColor: "#ffce00",
      marginTop: 0,
      
    }
  });

  const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
    }
  );