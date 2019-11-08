import React from 'react'
import {TextInput, StyleSheet } from 'react-native'


// Simple functional components to render in HomeScreen. Uses methods sent as props to fetch results for a given search.

export default function SearchBar(props) {
    return(
            <TextInput 
                style={styles.search}
                placeholder={"Search..."}
                onSubmitEditing={(event) => props.fetchCourses(event.nativeEvent.text, "", "", "1")
                                            .then(props.setQuery(event.nativeEvent.text))
                                            .then(props.storeSearch(event.nativeEvent.text))}
                autoFocus={true}    
                returnKeyType={'search'}
            />
        
    )


   
    
}


const styles = StyleSheet.create({
    search: {
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
        height: 40,
        width: '95%',
        color: "#000000",
        backgroundColor: "#C0CCD8",
        borderRadius: 10,
    },
})