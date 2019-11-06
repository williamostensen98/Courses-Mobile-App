import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage, Dimensions} from 'react-native';
import {Card, Button} from "react-native-elements"
import { createStackNavigator } from 'react-navigation-stack';

import SearchBar from './SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class HomeScreen extends Component {
   
    static navigationOptions = {
      
      };

    state = {
        query: '',
        courses: null,
        limit: 10,
        total: 0,
        searchHistory: [],
        mappedHistory: '',
        defaultText: null,
        hasSearched: false,
      }
    
      fetchCourses = async (q="") => {
        const courses = await fetch("http://it2810-39.idi.ntnu.no:3001/courses?" + q)
        .then(res => res.json())
        .catch(err => console.log(err))
      console.log("QUERY: ", q)
        this.setState({
          courses: courses.docs, 
          limit: courses.limit,
          total: courses.total,
          hasSearched: true
        })
      }
    
      setQuery = q => {
        this.setState({
          query: q
        })
        console.log("-------- SET", q)
      }
    
    
      componentDidMount() {
        this.fetchCourses()
        this.retrieveHistory()
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
              style={{width: "80%"}}
              containerStyle={{backgroundColor: "#3b3f4b", borderRadius: 15, borderColor: "#3b3f4b"}}
            >
              <Text style={{color: "#FFCE00", fontSize: 20, fontWeight: "bold"}}>
                {course.course_code + " " + course.norwegian_name}
              </Text>
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
            this.fetchCourses(this.state.query+'&limit='+this.state.limit)
        }
      }
      
      isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {   
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
      }
    

    retrieveHistory = async () =>{
      // Query local history
      AsyncStorage.getItem("searchHistory").then(history => JSON.parse(history))
        .then(history => {
          (history == null) ? 
                this.setState({searchHistory: []}) : this.setState({searchHistory: history})
                // console.log("SEARCH HISTORY:", this.state.searchHistory)
                this.mapHistory()
          }

      )
    }
    // save the search tag
    storeSearch = async (text) => {
          if(text!=='') {
            let tempArr = this.state.searchHistory;
            tempArr.unshift(text);
            tempArr = JSON.stringify(tempArr)
            await AsyncStorage.setItem("searchHistory", tempArr)
            this.setState({defaultText: null})
            // console.log("STORED", text)
        }
        else{
          this.retrieveHistory()
        }
    }

    clearHistory = () => {
      try {
         AsyncStorage.clear()
        //  console.log("CLEARED")
         this.setState({searchHistory: [],
                        mappedHistory: '', 
                        defaultText: <Text style={styles.search}>Search history cleared!</Text>
                      })
      }
      catch(error){
        console.log(error)
      }
    }

    mapHistory =  () => {
      this.setState({mappedHistory: this.state.searchHistory
                      .map((search, index) => 
                      <Button key={index}
                          type="clear"
                          // buttonStyle={{alignItems: 'stretch'}}
                          icon= {<Icon name="history" color="#c5c9d4" size={17} style={{right:7}}/>}
                          title={search}
                          titleStyle={{color:'#c5c9d4', fontStyle:'italic', textAlign: 'left'}}
                          onPress={() => this.fetchCourses(search).then(this.setQuery(search)).then(console.log("PRESSED", search))}
                      />)
      }) 
    }

      showHistory = () => {
        return (
        <View style={{alignItems: 'center', width:'120%', marginTop: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: '#FFFFFF'}}>
            Search history:
          </Text>
          <View style={{alignItems: 'left', width: Dimensions.get('window').width*0.69, marginTop: 10}}>
            {this.state.mappedHistory}
          </View>
          <Button type="clear" 
                  titleStyle={{color:'#FFCE00', fontWeight: 'bold', fontSize: 20}} 
                  title={"Clear search history"} 
                  onPress={() => this.clearHistory()}/>
        </View>
      )
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
           <SearchBar style={styles.searchbar} fetchCourses={this.fetchCourses} setQuery={this.setQuery} storeSearch={this.storeSearch}/>
        </View>
        <ScrollView 
          scrollEventThrottle={16} 
          onScroll={({nativeEvent}) => this.handleScroll(nativeEvent)} 
          contentContainerStyle={{alignItems: 'center', justifyContent: "space-between"}} 
        >
          {this.state.query===''? ((this.state.mappedHistory.length>0)? this.showHistory() : this.state.defaultText) 
                                  : this.mapCoursesToCard()}
          

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
    search: {
      color: "#FFFFFF",
      fontSize: 18,
      marginTop: 100,
    },
    searchContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%"
    },
    
  });

 