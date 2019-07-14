import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    });
    currentPlayer: 1;
  };

  //vraca 1 ako je igrac 1 pobjednik
  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;
    //check rows
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }
    //check columns
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //check diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    //There are no winners
    return 0;
  };

  onnewGamePress = () => {
    this.initializeGame();
  };

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.znakx} />;
      case -1:
        return <Icon name="circle-outline" style={styles.znako} />;
      default:
        return <View />;
    }
  };

  onTilePress = (row, col) => {
    var currentPlayer = this.state.currentPlayer;
    //zabrana promjene postavljenog znaka
    var value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    //postavi znak
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    //mijenjaj igraca
    var nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    //provjeri pobjednika
    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("x wins");
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert("o wins");
      this.initializeGame();
    }
  };

  render() {
    return (
      <View>
        <View style={styles.grupa}>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 0)}
            style={[styles.tile, { borderTopWidth: 0, borderLeftWidth: 0 }]}
          >
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 2)}
            style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}
          >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.grupa}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}
          >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 1)}
            style={styles.tile}
          >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0 }]}
          >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={styles.grupa}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 0)}
            style={[styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0 }]}
          >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 2)}
            style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}
          >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 120 }} />
        <Button title="Restart" onPress={this.onnewGamePress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tile: {
    width: 100,
    height: 100,
    borderWidth: 8,
    borderColor: "steelblue",
    justifyContent: "center",
    alignItems: "center"
  },
  grupa: {
    flexDirection: "row"
  },
  znakx: {
    color: "lightcoral",
    fontSize: 85
  },
  znako: {
    color: "#85BB00",
    fontSize: 75
  }
});
