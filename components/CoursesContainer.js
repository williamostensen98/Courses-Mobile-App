import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Platform, StyleSheet, Text, View, Button, Alert} from 'react-native';
import {Card} from "react-native-elements"


export default class CoursesContainer extends Component {
    render() {
        return (
            <Card title="Courses" style={styles.card}/>
        )
    }
}


export default CoursesContainer