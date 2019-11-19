import React from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Header
} from 'react-native';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
    };
  }

  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=20&limit=20`)
      .then(res => {
        return (this.setState({ data: res.data.results }))
      })
      .catch(err => this.setState({ loading: false }));
  }

  _keyExtractor = (item, index) => item.key;

  render() {
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <Text>PokeWiki</Text>
        </View>
        <FlatList
          data={this.state.data}
          numColumns={3}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.container} onPress={() => this.getPokemon(index + 1)}>
              <View style={styles.item}>
                <Image style={{ width: 90, height: 90 }} source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + index + 1 + '.png' }} />
                <Text style={styles.title}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          _keyExtractor={this._keyExtractor}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  header: {
    backgroundColor: 'skyblue',
    alignContent: 'center'
  },
  item: {
    height: 100,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 14,
  },
});
