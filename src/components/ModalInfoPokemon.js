import React from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ModalInfoPokemon extends React.Component {
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
        const { pokemon } = this.props.pokemon || null
        const { modalVisible } = this.props.modalVisible || null
        return (
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
          >
            <View>
              <View style={{ height: 130, backgroundColor: 'skyblue' }}>
                <TouchableOpacity style={{ marginTop: 5, marginRight: 5, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
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
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
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
        )
    }
}