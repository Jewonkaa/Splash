import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

class InputNumberButton extends Component {

    render() {
        const {value, handleOnPress} = this.props;

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={()=>handleOnPress(value)}>

                <Text style={styles.text}>{value}</Text>

            </TouchableOpacity>
          );
    }

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 2,
      backgroundColor: '#535457',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
        color:'#e4e5f2',
        fontSize: 26
    }
  });

  export default InputNumberButton;