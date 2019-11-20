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
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const logo = require('./assets/images/PokeWiki.png');
const exit = require('./assets/images/exit.png');

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
    this.setState({ pokemon: [], loading: true });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/` + id)
      .then(res => {
        return (this.setState({ pokemon: res.data, loading: false }))
      })
      .catch(err => this.setState({ loading: false }));

    this.setState({ modalVisible: visible });

  }

  getAbilities(items) {
    return items.map((data) =>
      <Text style={styles.powers}>{data.ability.name}</Text>
    );
  }

  getTypes(items) {
    return items.map((data) =>
      <Text style={styles.powers}>{data.type.name}</Text>
    );
  }
  
  render() {
    const { pokemon } = this.state
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <Image style={styles.logo} source={logo} />
        </View>
        <TouchableOpacity style={{ marginTop: -50, marginRight: 5, justifyContent: 'flex-end', alignItems: 'flex-end' }}
          onPress={() => {
            BackHandler.exitApp();
          }}>
          <Image style={{ width: 30, height: 40 }} source={exit} />
        </TouchableOpacity>
        <FlatList
          style={{ marginTop: 20 }}
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

        {pokemon.length != 0 ?
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
          >
            <View>
              <View style={{ height: 130, backgroundColor: 'skyblue' }}>
                <TouchableOpacity style={{ marginTop: 5, marginRight: 5, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Icon name="close" size={30} color="#000" />
                </TouchableOpacity>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -70 }}>
                <Image style={{ width: 180, height: 160 }} source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + this.state.pokemon.id + '.png' }} />
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginTop: -90 }}>
                <Text style={styles.text}>Order: #{this.state.pokemon.order}</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                <Text style={styles.text}>{pokemon.name}</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <Text style={styles.text}>Powers:</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {this.getAbilities(pokemon.abilities)}
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <Text style={styles.text}>Types:</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {this.getTypes(pokemon.types)}
              </View>        
            </View>
          </Modal>
          : null}
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
    marginTop: -12,
  },
  powers: {
    padding: 5,
    margin: 10,
    backgroundColor: 'skyblue',
    borderRadius: 10
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  }

});