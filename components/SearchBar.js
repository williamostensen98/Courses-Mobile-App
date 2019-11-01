import React from 'react'
import {TextInput, StyleSheet} from 'react-native'



export default function SearchBar(props) {

    return(
        <TextInput 
            style={styles.search}
            placeholder={"Search..."}
            onSubmitEditing={(event) => props.fetchCourses(event.nativeEvent.text)}
            autoFocus={true}
        />
    )
    
}


const styles = StyleSheet.create({
    search: {
        fontSize: 20,
        margin: 10, 
        paddingLeft:10,
        height: 40,
        width: '85%',
        color: "#000000",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
    },
})