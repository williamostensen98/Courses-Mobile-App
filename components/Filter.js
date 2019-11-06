import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Button} from "react-native";
import { processFontFamily } from 'expo-font';


const Filter  = (props) => {

    const [fallClicked, setFallClicked] = useState(false);
    const [springClicked, setSpringClicked] = useState(false);
    const [codeClicked, setCodeClicked] = useState(false);
    const [nameClicked, setNameClicked] = useState(true);
    const [filterBy, setFilter]= useState("");
    const [sortBy, setSorting] = useState("&sorting=norwegian_name");

    useEffect(() => {
        handleFilterChange;
      }, [codeClicked, nameClicked]); // Only re-run the effect if count changes

    const fetchNewCourses = (sort, filter) =>{
        props.fetchCourses(props.query, sort, filter)
        
    }
   
    const handleFilterChange = () =>{
        let sort = !codeClicked ? "&sorting=course_code": "&sorting=norwegian_name"
        console.log(sort)
        fetchNewCourses(sort, filterBy)
        props.setSort(codeClicked, nameClicked)
        setCodeClicked(!codeClicked)
        setNameClicked(!nameClicked)
        console.log(props.query)
        console.log("Code: ", codeClicked, "name: ", nameClicked)
       

    }
    return (
       <View style={styles.container}>
        <View>
          <Text style={styles.text}>SORT BY</Text>
            <View style={styles.sortingContainer}>
                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.button} onPress={handleFilterChange} >
                        <Text style={styles.iconText} >1-9</Text>
                    </TouchableOpacity>
                    <Text style={styles.iconText}>CODE</Text>
                </View>
                
                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.button} onPress={handleFilterChange} >
                        <Text style={styles.iconText}>9-1</Text>
                    </TouchableOpacity>
                    <Text style={styles.iconText}>CODE</Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.button} onPress={handleFilterChange} >
                        <Text style={styles.iconText} >A-Z</Text>
                    </TouchableOpacity>
                    <Text style={styles.iconText} >NAME</Text>
                </View>

                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.button} onPress={handleFilterChange} >
                        <Text style={styles.iconText} >Z-A</Text>
                    </TouchableOpacity>
                    <Text style={styles.iconText} >NAME</Text>
                </View>
           </View>
           </View>
        <View style={{marginTop: "25%"}} >
          <Text style={styles.text}>FILTER BY</Text>
            <View style={styles.sortingContainer}>
                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.button} onPress={handleFilterChange} >
                        <Text style={styles.iconText} >ALL</Text>
                    </TouchableOpacity>
                    <Text style={styles.iconText} >ALL</Text>
                </View>
                
                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.button} onPress={handleFilterChange} >
                        <Text style={styles.iconText} >FALL</Text>
                    </TouchableOpacity>
                    <Text style={styles.iconText} >FALL</Text>
                </View>

                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.button} onPress={handleFilterChange} >
                        <Text style={styles.iconText} >SPRING</Text>
                    </TouchableOpacity>
                    <Text style={styles.iconText} >SPRING</Text>
                </View>

           </View>
        </View>
        </View>
        )
}




const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
    //   paddingTop: 20,
      paddingBottom: 20, 
      alignItems: 'center',
      
    },
    text: {
      fontSize: 30,
      textAlign: 'center',
      margin: 10,
      color: "#000000",
      fontFamily: 'oswald'
    },
    iconText: {
      fontSize: 20,
      margin: 10,
      textAlign: "center",
      color: "#000000",
      fontFamily: 'oswald'
    },
    clickedText: {
        fontSize: 20,
        margin: 10,
        color: "#ffce00",
        fontFamily: 'oswald'
      },
    button: {
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "#ffce00",
        width: 80,
        height: 80,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#000000",
    
        // marginBottom: 10
      },
      clicked: {
        backgroundColor: "#000000",
        color: "#ffce00",
        alignItems: "center", 
        justifyContent: "center",
        width: 80,
        height: 80,
        borderRadius: 100,
        borderWidth: 2,
    
        borderColor: "#000000",
    
        marginBottom: 10
      },
      sortingContainer: {
        //   backgroundColor: "#ffd522",
          height: 90, 
          width: "100%",
          padding: 10, 
          justifyContent: "space-evenly",
          flexDirection: "row",
         


      } 

  });


export default Filter