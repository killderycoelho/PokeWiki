import React from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const logo = require('./assets/images/PokeWiki.png');

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pokemon: [],
      id: null,
      loading: false,
      modalVisible: false,
    };
  }

  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=964`)
      .then(res => {
        return (this.setState({ data: res.data.results }))
      })
      .catch(err => this.setState({ loading: false }));
  }

  setModalVisible(visible, id) {
    this.setState({ pokemon: [] });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/` + id)
      .then(res => {
        return (this.setState({ pokemon: res.data }))
      })
      .catch(err => this.setState({ loading: false }));
      console.log(this.state.pokemon);
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <Image style={styles.logo} source={logo} />
        </View>
        <FlatList
          data={this.state.data}
          contentContainerStyle={{ paddingBottom: 80 }}
          numColumns={3}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.container} onPress={() => this.setModalVisible(true, index)}>
              <View style={styles.item}>
                <Image style={{ width: 90, height: 90 }} source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + ++index + '.png' }} />
                <Text style={styles.title}>{item.name}</Text>
              </View>
            </TouchableOpacity>

          )}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
              <TouchableOpacity style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Icon name="close" size={30} color="#900" />
              </TouchableOpacity>
              <Image style={{ width: 180, height: 160 }} source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + this.state.pokemon.id + '.png' }} />
              <Text>{this.state.pokemon.name}</Text>    
              <Text>{this.state.pokemon.height}</Text> 
              <Text>{this.state.pokemon.weight}</Text> 
          </View>      
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'skyblue',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 60,
  },
  item: {
    height: 100,
    marginVertical: 5,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'opensans',
    fontSize: 14,
    marginTop: -12
  },
});
