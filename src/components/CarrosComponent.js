import React, { Component } from 'react';
import {
    View,
    Text,    
    Image,    
    TouchableHighlight,        
    StyleSheet
} from 'react-native';

export default class CarrosComponent extends Component {

    state = {        
        id: this.props.data.id,
        img: this.props.data.img,
        nome: this.props.data.nome,
        marca: this.props.data.marca,
        ano: this.props.data.ano        
    };

    render() {

        return (

            <View>

                <TouchableHighlight underlayColor={'#EAEAEA'} >

                    <View style={styles.cardCarro}>

                        <Image source={{ uri: this.state.img.replace('http:', 'https:') }} style={styles.carroImagem} />

                        <View style={styles.carroInfo}>
                            <Text style={styles.carroNome}>{this.state.nome}</Text>
                            <Text>Código: {this.state.id}</Text>
                            <Text>Marca: {this.state.marca}</Text>
                            <Text>Ano: {this.state.ano}</Text>                            
                        </View>

                    </View>

                </TouchableHighlight>

            </View >
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardCarro: {
        margin: 5,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#EAEAEA',
        backgroundColor: '#C0CCDA25',
        opacity: 5,
        height: 300
    },
    carroImagem: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        height: 150,
        borderWidth: 2,
        borderRadius: 10,
    },
    carroInfo: {
        flex: 1,
        flexDirection: 'column',
        margin: 8
    },
    carroNome: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center'
    }
});