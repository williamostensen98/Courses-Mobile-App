import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Button} from "react-native";
import { processFontFamily } from 'expo-font';
import { Icon } from 'react-native-elements'

const Filter  = (props) => {

    const [fallClicked, setFallClicked] = useState(props.fall);
    const [springClicked, setSpringClicked] = useState(props.spring);
    const [codeClicked, setCodeClicked] = useState(props.code);
    const [order, setOrder] = useState(props.ordering);
    const [nameClicked, setNameClicked] = useState(props.name);
    const [filterBy, setFilter]= useState(props.filtering);
    const [sortBy, setSorting] = useState(props.sorting);

    useEffect(() => {
        let a = nameClicked ? 'NAME': 'CODE'
        handleSortChange(a,true);
       
      }, [order]); // Only re-run the effect if order changes

    const fetchNewCourses = (sort, filter, ordering) =>{
       console.log(filter, sort)
       console.log(sortBy)

      props.fetchCourses(props.query, sort, filter, ordering)
        
        
        
    }

   
    const handleOrderChange = () => {
       
        if(order === '1'){
          setOrder('-1')
          fetchNewCourses(sortBy, filterBy, '-1')
        }
        else{
          setOrder('1')
          fetchNewCourses(sortBy, filterBy, '1')

        }
    }
   
    const handleAllClicked = () => {
      props.storeFilterState(false,false, codeClicked, nameClicked)
      setSpringClicked(false)
      setFallClicked(false)
      fetchNewCourses(sortBy, "", order)
      setFilter("")
    }
   const handleFilterChange = (param) => {
     if(param === 'FALL'){
       
       fetchNewCourses(sortBy, "&taught_in_autumn=true", order)
       props.storeFilterState(true,false, codeClicked, nameClicked)
       setFallClicked(true)
       setSpringClicked(false)
       setFilter("&taught_in_autumn=true")
      
     }
     else {
      fetchNewCourses(sortBy, "&taught_in_spring=true", order)
      props.storeFilterState(false,true, codeClicked, nameClicked)
      setFallClicked(false)
      setSpringClicked(true)
      setFilter("&taught_in_spring=true")
     }

   }
   
    const handleSortChange = (param, orderChanged) =>{
        
        switch(param) {
          case 'CODE':
            if(!codeClicked || orderChanged){
              let c = "&sorting=course_code"
              fetchNewCourses(c, filterBy, order)
              props.storeFilterState(fallClicked,springClicked, true, false)
              setNameClicked(false)
              setCodeClicked(true)
              setSorting(c)
              break;
            }
            else{   
              break;
            }

          case 'NAME':
            
            if(!nameClicked || orderChanged){
              let n = "&sorting=norwegian_name"
              fetchNewCourses(n, filterBy, order)
              props.storeFilterState(fallClicked,springClicked, false, true)
              setNameClicked(true)
              setCodeClicked(false)
              setSorting(n)
              break;
            }
            else{
              console.log('BREAK NAME')
              break;
            }
          default:
            console.log("NUMBER NOT FOUND")
          }
     
    }
    return (
       <View style={styles.container}>
        <View>
          <Text style={styles.text}>SORT BY</Text>
            <View style={styles.sortingContainer}>
                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={codeClicked ? styles.clicked: styles.button} onPress={() => handleSortChange('CODE', false)} >
                        
                           <Icon
                            name='code'
                            type='feather'
                            color={codeClicked ? '#ffce00' : '#000000'}
                          />
                    </TouchableOpacity>
                    <Text style={styles.iconText}>CODE</Text>
                </View>
            
                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={nameClicked ? styles.clicked: styles.button} onPress={() => handleSortChange('NAME', false)} >
                        <Text style={nameClicked ? styles.clickedIcon: styles.iconText} >{order === '-1' ? 'Z-A': 'A-Z'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.iconText} >NAME</Text>
                </View>

                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.clicked} onPress={handleOrderChange} >
                      
                          <Icon
                              name= {order === '-1' ? 'arrow-down': 'arrow-up'}
                              type='feather'
                              color={'#ffce00'}
                            />
                        
                    </TouchableOpacity>
                    <Text style={styles.iconText} >ORDER</Text>
                </View>
           </View>
           </View>
        <View style={{marginTop: "25%"}} >
          <Text style={styles.text}>FILTER BY</Text>
            <View style={styles.sortingContainer}>
                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={!(fallClicked || springClicked) ? styles.clicked: styles.button} onPress={handleAllClicked} >
                        <Text style={!(fallClicked || springClicked) ? styles.clickedIcon: styles.iconText} >ALL</Text>
                    </TouchableOpacity>
                    <Text style={styles.iconText} >ALL</Text>
                </View>
                
                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={fallClicked ? styles.clicked: styles.button} onPress={() => handleFilterChange('FALL')} >
                          <Icon
                            name='umbrella'
                            type='feather'
                            color={fallClicked ? '#ffce00' : '#000000'}
                          />
                    </TouchableOpacity>
                    <Text style={styles.iconText} >FALL</Text>
                </View>

                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={springClicked ? styles.clicked: styles.button} onPress={() => handleFilterChange('SPRING')} >
                          <Icon
                            name='flower-tulip-outline'
                            type='material-community'
                            color={springClicked ? '#ffce00' : '#000000'}
                          />
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
    clickedIcon: {
        fontSize: 20,
        // margin: 10,
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
    
        // marginBottom: 10
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