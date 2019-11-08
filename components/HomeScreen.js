import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage, Dimensions} from 'react-native';
import {Card, Button} from "react-native-elements"
import SearchBar from './SearchBar';
import * as Font from 'expo-font';
import Filter from './Filter'
import { throwStatement } from '@babel/types';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class HomeScreen extends Component {
   
   

    state = {
        query: '',
        courses: null,
        limit: 10,
        total: 0,
        searchHistory: [],
        mappedHistory: '',
        defaultText: '',
        fontLoaded: false,
        showFilter: false,
        sort:"&sorting=norwegian_name",
        filter: "",
        order: "1",
        fall: false, 
        spring: false, 
        name: true, 
        code: false,
        hasSearched: false,
      }
    
      fetchCourses = async (q="", sorting, filtering, ordering) => {
        const courses = await fetch("http://it2810-39.idi.ntnu.no:3001/courses?" + q + sorting + filtering + "&order=" + ordering)
        .then(res => res.json())
        .catch(err => console.log(err))
        this.setState({
          courses: courses.docs, 
          limit: courses.limit,
          total: courses.total,
          sort: sorting, 
          filter: filtering,
          order: ordering,
          hasSearched: true
        })
      }
      storeFilterState = (f, s, c, n) => {
        console.log(f, s, c, n)
        this.setState({
          fall: f, 
          spring: s, 
          code: c, 
          name: n
        })
      }
     
      setQuery = (q) => {
        
        this.setState({
          query: q
        })
      }
    
    
      async componentDidMount() {
        this.fetchCourses()
        this.retrieveHistory()
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
          })} style={{width: Dimensions.get('window').width}}>
            <Card 
              course={course} 
              key={index} 
              style={{width: Dimensions.get('window').width*0.8}}
              containerStyle={{backgroundColor: "#3b3f4b", borderRadius: 15, borderColor: "#3b3f4b"}}
            >
              {this.state.fontLoaded ? 
              <Text style={{color: "#FFCE00", fontSize: 20, fontWeight: "bold", fontFamily: 'oswald'}}>
                {course.course_code + " " + course.norwegian_name}
              </Text>: null}
            </Card>
            </TouchableOpacity>
          )
        if (this.state.hasSearched && this.state.courses.length == 0) {
          console.log("HEI")
            return <Text style={styles.noresult}>Your search gave no results</Text>
        }
        return courseList
        }
        return null
        
      }
    
      handleScroll = nativeEvent => {
        if (this.isCloseToBottom(nativeEvent) && (this.state.limit < this.state.total+10)) {       
          this.setState(
            prevState => ({limit: prevState.limit+=10}))
            this.fetchCourses(this.state.query + "&limit=" + this.state.limit,this.state.sort,this.state.filter, this.state.order)
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
            this.setState({defaultText:''})
        }
        else{
          this.retrieveHistory()
        }
    }

    clearHistory = () => {
      try {
         AsyncStorage.clear()
         this.setState({searchHistory: [],
                        mappedHistory: '', 
                        defaultText: 'Search history cleared!'
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
                          icon= {<Icon name="history" color="#c5c9d4" size={17} style={{right:7}}/>}
                          title={search}
                          titleStyle={{color:'#c5c9d4', fontStyle:'italic', textAlign: 'left'}}
                          onPress={() => this.fetchCourses(search, '','','1').then(this.setQuery(search))}
                      />)
      }) 
    }

      showHistory = () => {
        return ( 
        <View style={{alignItems: 'center', width:'120%', marginTop: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: '#FFFFFF'}}>
            Search history:
          </Text>
          <View style={{alignItems: 'flex-start', width: Dimensions.get('window').width*0.69, marginTop: 10}}>
            {this.state.mappedHistory}
          </View>
          <Button type="clear" 
                  titleStyle={{color:'#FFCE00', fontWeight: 'bold', fontSize: 20}} 
                  title={"Clear search history"} 
                  onPress={() => this.clearHistory()}/>
        </View>
      )
    }
      
      
      ShowHideComponent = () => {
        
        if (this.state.showFilter === true) {
          this.setState({showFilter : false });
        } else {
          this.setState({ showFilter : true });
        }
      };
      filterFunction = () => {
        // console.log(this.state.fall, this.state.spring, this.state.code, this.state.name)
        return  (
          <View style={styles.filterContainer}>
            <Filter 
              storeFilterState={this.storeFilterState} 
              fetchCourses={this.fetchCourses} 
              query={this.state.query} 
              fall={this.state.fall}
              spring={this.state.spring}
              name={this.state.name}
              code={this.state.code}
              ordering={this.state.order}
              filtering={this.state.filter}
              sorting={this.state.sort}

              />
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
           <SearchBar style={styles.searchbar} storeSearch={this.storeSearch} storeFilterState={this.storeFilterState} fetchCourses={this.fetchCourses} setQuery={this.setQuery}/>
           {this.state.query !== "" ? 

              <TouchableOpacity
                style={styles.button}
                onPress={this.ShowHideComponent} >
                {this.state.fontLoaded ? 
                  <Text style={styles.buttonText}>
                    {"FILTER"}
                  </Text>: null
                }
              </TouchableOpacity>
        
            : null}

        {this.state.showFilter ? this.filterFunction() : null}
        </View>
        <ScrollView 
          scrollEventThrottle={16} 
          onScroll={({nativeEvent}) => this.handleScroll(nativeEvent)} 
          contentContainerStyle={{alignItems: 'center', justifyContent: "space-between"}} 
        >
          {this.state.query===''? ((this.state.mappedHistory.length>0)? this.showHistory() 
                                  : <Text style={styles.search}>{this.state.defaultText}</Text>) 
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
      height: "95%", 
      backgroundColor: "#ffce00",
      marginTop: 15,
    },
    noresult: {
      marginTop: 30,
      color: "#C0CCD8"
    }
  });