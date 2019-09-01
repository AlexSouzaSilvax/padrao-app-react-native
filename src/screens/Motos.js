import React, { Component } from 'react';
import { Alert, RefreshControl, View, FlatList, Image } from 'react-native';
import axios from 'axios';

import { url } from '../util'

import VeiculoComponent from '../components/VeiculoComponent';

import ActionButton from 'react-native-action-button';

export default class Motos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            motos: [],
            loading: true
        };

        this.GetData();
    }

    async GetData() {
        await axios.get(url + 'motos')
            .then((response) => {
                console.log("Lista de motos: ", response.data)
                this.setState({ motos: response.data, loading: false })
            }).catch((err) => {
                console.log("Erro ao listar motos: ", err)
                console.log("Nenhuma moto foi encontrada");
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
                    data={this.state.motos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <VeiculoComponent data={item} />}
                    refreshControl={<RefreshControl onRefresh={this.onRefresh.bind(this)} />}
                />
                <ActionButton buttonColor="#16164E" onPress={() => Alert.alert("Implementar adicionar!")} />
            </View>
        );
    }
}
