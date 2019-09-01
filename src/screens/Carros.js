import React, { Component } from 'react';
import { Alert, Text, RefreshControl, View, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { url } from '../util'

import VeiculoComponent from '../components/VeiculoComponent';

import ActionButton from 'react-native-action-button';

export default class Carros extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            carros: [],
            loading: true
        };

        this.GetData();
    }

    async GetData() {
        await axios.get(url + 'carros')
            .then((response) => {
                console.log("Lista de carros: ", response.data)
                this.setState({ carros: response.data, loading: false })
            }).catch((err) => {
                console.log("Erro ao listar carros: ", err)
                console.log("Nenhum carro foi encontrado");
            })
    }

    onRefresh() {
        this.setState({ loading: true });
        this.GetData();
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                    <Image
                        source={require('../../assets/loading.gif')}
                        style={{ width: 300, height: 300 }}
                    />
                </View>
            );
        } return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.carros}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <VeiculoComponent data={item} />}
                    refreshControl={<RefreshControl onRefresh={this.onRefresh.bind(this)} />}
                />
                <ActionButton buttonColor="#16164E" onPress={() => Alert.alert("Implementar adicionar!")} />
            </View>
        );
    }
}
