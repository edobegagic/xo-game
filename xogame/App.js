import React, { component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Tile from "./app/components/tile";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.board}>
          <Tile />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEBCD",
    alignItems: "center",
    justifyContent: "center"
  },
  board: {
    height: 300,
    width: 300
  }
});
