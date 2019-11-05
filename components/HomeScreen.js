import React, {Component} from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, AsyncStorage} from 'react-native';
import {Card} from "react-native-elements"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchBar from './SearchBar';

export class HomeScreen extends Component {
   
    static navigationOptions = {
        header: null
      };

    state = {
        query: '',
        courses: null,
        limit: 10,
        total: 0,
        searchHistory: [],
        mappedHistory: '',
        defaultText: null,
      }
    
      fetchCourses = async (q="") => {
        const courses = await fetch("http://it2810-39.idi.ntnu.no:3001/courses?" + q)
        .then(res => res.json())
        .catch(err => console.log(err))
        // console.log("Type of courses: ", courses.docs)
        this.setState({
          courses: courses.docs, 
          limit: courses.limit,
          total: courses.total,
        })
      }
    
      setQuery = q => {
        this.setState({
          query: q
        })
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
                console.log("SEARCH HISTORY:", this.state.searchHistory)
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
            console.log("STORED", text)
        }
        else{
          this.retrieveHistory()
        }
    }

    clearHistory = () => {
      try {
         AsyncStorage.clear()
         console.log("CLEARED")
         this.setState({searchHistory: [],
                        mappedHistory: '', 
                        defaultText: <Text style={styles.search}>Search history cleared!</Text>
                      })
      }
      catch(error){
        console.log(error)
      }
    }

    mapHistory = () => {
      this.setState({mappedHistory: this.state.searchHistory
                      .map((search, index) => 
                      <Button key={index}
                          color='#FFFFFF'
                          title={search}
                          onPress={() => this.fetchCourses(search).then(this.setQuery(search))}
                      />)
      }) 
    }

      showHistory = () => {

        return (
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#FFFFFF'}}>
            Search history:
          </Text>
          {this.state.mappedHistory}
          <Button color='#FFCE00' title={"Clear search history"} onPress={() => this.clearHistory()}/>
        </View>
      )
    }
      
      

      

  render() {
 
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
        </Text>
        <SearchBar fetchCourses={this.fetchCourses} 
                   setQuery={this.setQuery}
                   storeSearch={this.storeSearch}/>
        <ScrollView scrollEventThrottle={16} 
                    onScroll={({nativeEvent}) => this.handleScroll(nativeEvent)} 
                    contentContainerStyle={{alignItems: 'center', justifyContent: "space-between"}} >

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

    }
  });

  const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
    },
  );

export default createAppContainer(AppNavigator);