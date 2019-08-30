import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableHighlight, Alert } from 'react-native';
import { Card, CardItem, Text, Left, Body, Right } from 'native-base';
import * as Font from "expo-font";

export default class CarrosComponent extends Component {

    state = {
        id: this.props.data.id,
        img: this.props.data.img,
        nome: this.props.data.nome,
        cor: this.props.data.cor,
        ano: `${this.props.data.ano}/${this.props.data.ano}`,
        fabricante: this.props.data.fabricante,
        valor: `R$ ${this.props.data.valor}`
    };

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf")
        });
    }

    render() {

        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={() => { Alert.alert(this.state.nome) }}>
                <Card>
                    <CardItem>
                        <Body>
                            <Text style={styles.carroNome}>{this.state.nome}</Text>
                            <Text note>{this.state.fabricante}</Text>
                        </Body>
                        <Right>
                            <Text />
                            <Text note>{this.state.ano}</Text>
                        </Right>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{ uri: this.state.img }} style={styles.carroImagem} />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{this.state.cor}</Text>
                        </Left>
                        <Right>
                            <Text style={styles.valorCarro}>{this.state.valor}</Text>
                        </Right>
                    </CardItem>
                </Card>
            </TouchableHighlight>
        );
    }

}

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    carroImagem: {
        flex: 1,
        margin: 5,
        height: 250,
        borderWidth: 2,
        borderRadius: 10,
    },
    carroNome: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center'
    },
    valorCarro: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});
