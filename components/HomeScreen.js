import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, AsyncStorage, Dimensions} from 'react-native';
import {Card, Button} from "react-native-elements"
import SearchBar from './SearchBar';
import * as Font from 'expo-font';
import Filter from './Filter'
import Icon from 'react-native-vector-icons/FontAwesome';


// Homescreen component is the landing screen in the app. Can be considered as App.js in a normal React Web application.cover-empty.
// Navigationstack and options is located in Navigation.js.
// 

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
    

      // Fetches courses from REST API
      // All queries to the API can be made by sending a GET reques to the URL underneath followed by ? and a query. Query on the form q=course_code=TDT&&taught_in_autumn=1
      fetchCourses = async (q="", sorting, filtering, ordering) => {
        const courses = await fetch("http://it2810-39.idi.ntnu.no:3001/courses?" + q + sorting + filtering + "&order=" + ordering)
        .then(res => res.json())
        .catch(err => console.log(err))
        try {
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
        catch(err) {
          console.log(err)
        }
      }

      // This method stores all states that is sent from the filtering component
      // Since redux is not used in this project we need to store sll states that is needed in children component 
      // in the parent-component which is this class. This is so we dont loose the states when the parent component is rendered
      // and the children component gets re-rendered with it. 
      // States are therefore sent from the Filter-component to this class which is its parent and then sent back to Filter 
      // through the filterFunction() (see further down).
      storeFilterState = (f, s, c, n) => {
        this.setState({
          fall: f, 
          spring: s, 
          code: c, 
          name: n
        })
      }
     
      //Updates the state 'query'
      setQuery = (q) => {
        this.setState({
          query: q
        })
      }
    
    // Fetch courses on mount and retrieve search history from AsyncStorage
      async componentDidMount() {
        this.fetchCourses()
        this.retrieveHistory()
        await Font.loadAsync({ // loads the font 'oswald' (found in assest-folder) and sets the fontLoaded state to true when finished
          'oswald': require('./../assets/fonts/Oswald.ttf'),
        });
        this.setState({ fontLoaded: true });
      }

      // Returns a liste of Card-components, each representning a course in the list view on homescreen. Can be clicked to navigate to the CourseScreen for that course.
      // If no courses is found, method returns Text-component saying the search gave no results. In all other cases returns null.
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
              <Text style={{color: "#FFCE00", fontSize: 20, fontFamily: 'oswald'}}>
                {course.course_code + " " + course.norwegian_name}
              </Text>: null}
            </Card>
            </TouchableOpacity>
          )
        if (this.state.hasSearched && this.state.courses.length == 0 && this.state.fontLoaded) {
            return <Text style={styles.feedback}>Your search gave no results</Text>
        }
        return courseList
        }
        return null
        
      }
    
      //Loads more items if the user has scrolled to the bottom, and if there is more data available
      handleScroll = nativeEvent => {
        if (this.isCloseToBottom(nativeEvent) && (this.state.limit < this.state.total+10)) {       
          this.setState(
            prevState => ({limit: prevState.limit+=10}))
            this.fetchCourses(this.state.query + "&limit=" + this.state.limit,this.state.sort,this.state.filter, this.state.order)
        }
      }
      
      //Checks if user has scrolled "close" to bottom of window
      isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {   
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
      }
    

    //Retrieved search history from AsyncStorage, and puts it in state 'searchHistory' if there is any data
    retrieveHistory = async () =>{
      // Query local history
      AsyncStorage.getItem("searchHistory").then(history => JSON.parse(history))
        .then(history => {
          (history == null) ? 
                this.setState({searchHistory: []}) : this.setState({searchHistory: history})
          this.mapHistory()
          }
      )
      .catch(err => console.log(err))
    }
    //Stores the user input query in AsyncStorage
    //Does not count empty strings as query
    storeSearch = async (text) => {
        if(text!=='') {
          let tempArr = this.state.searchHistory;
          tempArr.unshift(text);
          tempArr = JSON.stringify(tempArr)
          await AsyncStorage.setItem("searchHistory", tempArr)
          this.setState({defaultText:''})
        }
        else {
          this.retrieveHistory()
        }

    }

    //Deletes all the search history from AsyncStorage. Sets defaultText so the user gets feedback that it is completed.
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

    //Maps the search history from an array to Button-components to look like text
    //If the button is pressed, the query will be re-fetched.
    mapHistory =  () => {
      this.setState({mappedHistory: this.state.searchHistory
                      .map((search, index) => 
                      <Button key={index}
                          type="clear"
                          icon= {<Icon name="history" color="#c5c9d4" size={17} style={{right:7}}/>}
                          title={search}
                          titleStyle={{color:'#c5c9d4', textAlign: 'left', fontFamily: 'oswald'}}
                          onPress={() => this.fetchCourses(search, '','','1').then(this.setQuery(search))}
                      />)
      }) 
    }

    //Makes the entire search history view. 
    //Includes button for clearing search history
    showHistory = () => {
      return ( 
        <View style={{alignItems: 'center', width:'120%', marginTop: 20}}>
           {this.state.fontLoaded ? <Text style={{fontSize: 24, color: '#FFFFFF', fontFamily:'oswald'}}>
            Search history:
          </Text> : null}
          <View style={{alignItems: 'flex-start', width: Dimensions.get('window').width*0.69, marginTop: 10}}>
            {this.state.mappedHistory}
          </View>
          {this.state.fontLoaded ? 
            <TouchableOpacity style={{marginTop: 20, backgroundColor: '#ffce00', borderRadius: 5, width:'80%'}} 
            type="clear"       
            onPress={() => this.clearHistory()}>
             {this.state.fontLoaded ? 
            <Text style={styles.buttonText}>
                 Clear Search History
            </Text> : null}
            </TouchableOpacity>

          : null }
        </View>
      )
    }
      
      // Flips the state of whether to show filtering component or not. 
      ShowHideComponent = () => {
        if (this.state.showFilter === true) {
          this.setState({showFilter : false });
        } else {
          this.setState({ showFilter : true });
        }
      }

      // Renders a filter component
      filterFunction = () => {
        // Here all the filter- and sorting states are sent to the filtering components as props
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
      handleHomePress = () => {
        this.setQuery('')

        this.retrieveHistory()
        this.fetchCourses('', '','','1')
      }

  render() {
 
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
        <TouchableOpacity onPress={this.handleHomePress}>
          <View style={{flexDirection: "row", alignItems: 'center', justifyContent: "space-between", marginTop: 5}}>
          
            <Icon name="bar-chart" size={35} color={"#FFCE00"}/> 
            {this.state.fontLoaded ? 
              <Text h1 style={styles.header}>
                COURSES
              </Text>: null}
         
          </View>
          </TouchableOpacity>
          <View style={{flexDirection: "row", alignItems: 'center', justifyContent: "space-between"}}>
            <Icon name="search" size={14} color={"#C0CCD8"} style={{right: 2}}/> 
            {this.state.fontLoaded ? 
              <Text style={styles.searchText}>
                SEARCH FOR COURSE NAMES OR CODES
              </Text>: null }
          </View>
           <SearchBar style={styles.searchbar} storeSearch={this.storeSearch} storeFilterState={this.storeFilterState} fetchCourses={this.fetchCourses} setQuery={this.setQuery}/>
          {/* Only show the filter button if something has been searched */}
           {this.state.query !== "" ? 
              <TouchableOpacity
                style={styles.button}
                onPress={this.ShowHideComponent} >
                {this.state.fontLoaded ? 
                  <Text style={styles.buttonText}>
                    {!this.state.showFilter ? "FILTER" : "SHOW RESULTS"}
                  </Text>: null
                }
              </TouchableOpacity>
        
            : null}

        {/* Only show filter Component if filter button pressed */}
        {this.state.showFilter ? this.filterFunction() : null}
        </View>
        <ScrollView 
          scrollEventThrottle={16} 
          onScroll={({nativeEvent}) => this.handleScroll(nativeEvent)} 
          contentContainerStyle={{alignItems: 'center', justifyContent: "space-between"}} 
        >
          {/* On empty string, it will render the search history if there is any. If there is no history available, it will say so.
          Will show the queried query if there is a query. */}
          {this.state.query==='' && this.state.fontLoaded ? ((this.state.mappedHistory.length>0)? this.showHistory() 
                                  : <Text style={styles.feedback}>{this.state.defaultText}</Text>) 
                                  : this.mapCoursesToCard()}
          
        </ScrollView>
      </View>
    ); 
  }
}


// Styling for all components in this file
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
      fontFamily: 'oswald',
      
    },
    searchText: {
      fontFamily: 'oswald',
      color: "#C0CCD8",
      fontSize: 14,

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
    button: {
      backgroundColor: "#ffce00",
      width: "85%",
      borderRadius: 5,
      padding: 5,
      marginBottom: 20
    }, 
    buttonText:{
      justifyContent: 'center',
      alignSelf: 'center',
      textAlign: 'center',
      color: "#3b3f4b",
      fontSize: 20,
      margin: 'auto',
      fontFamily: 'oswald',
    }, 
    filterContainer: {
      width: "100%", 
      height: "95%", 
      backgroundColor: "#ffce00",
      marginTop: 15,
    },
    feedback: {
      marginTop: 50,
      color: "#C0CCD8",
      fontFamily: 'oswald',
      fontSize: 18,
    }
  });