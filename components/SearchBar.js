import React from 'react'
import {TextInput, StyleSheet } from 'react-native'


// Simple functional components to render in HomeScreen. Uses methods sent as props to fetch results for a given search.
export default function SearchBar(props) {
    return(
        <TextInput 
            style={styles.search}
            placeholder={"Search..."}
            onSubmitEditing={(event) => props.fetchCourses(event.nativeEvent.text, "", "", "1") //fetches the input
                                        .then(props.setQuery(event.nativeEvent.text))           //updates state 'query' to the last fetched query
                                        .then(props.storeSearch(event.nativeEvent.text))}       //stores the query in AsyncStorage
            autoFocus={true}            // Automatically focuses on the search bar. User does not need to select it before writing
            returnKeyType={'search'}    // Changes the bottom right button on keyboard to "search" instead of "return"
            placeholderTextColor={"#737373"}
            
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
        backgroundColor: "#C0CCD8",
        borderRadius: 15,
    }
})