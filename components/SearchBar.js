import React from 'react'
import {TextInput, StyleSheet } from 'react-native'



export default function SearchBar(props) {
   
    return(
<<<<<<< HEAD
            <TextInput 
                style={styles.search}
                placeholder={"Search..."}
                onSubmitEditing={(event) => props.fetchCourses(event.nativeEvent.text, "", "", "1")
                                            .then(props.setQuery(event.nativeEvent.text))
                                            .then(props.storeSearch(event.nativeEvent.text))}
                autoFocus={true}    
                returnKeyType={'search'}
            />
        
=======
        <TextInput 
            style={styles.search}
            placeholder={"Search..."}
            onSubmitEditing={(event) => props.fetchCourses(event.nativeEvent.text, "", "", "1")
                                        .then(props.setQuery(event.nativeEvent.text))
                                        .then( props.storeFilterState(false, false, false, true))
                                        .then(props.storeSearch(event.nativeEvent.text))}
            autoFocus={true}
        />
>>>>>>> 175d663d80dd63043421f9ab939cf172aac5ed33
    )


   
    
}


const styles = StyleSheet.create({
    search: {
        fontSize: 20,
        margin: 10,
        // marginBottom: 20,
        paddingLeft: 10,
        height: 40,
        width: '95%',
        color: "#000000",
        backgroundColor: "#C0CCD8",
        borderRadius: 10,
    },
})