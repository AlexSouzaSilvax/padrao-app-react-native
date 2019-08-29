import React, { Component } from 'react';
import { Text, RefreshControl, View, FlatList } from 'react-native';
import axios from 'axios';

import { url } from '../util'

import CarrosComponent from '../components/CarrosComponent';

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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Carregando...</Text>
                </View>
            );
        } return (
            <View style={{ flex: 1, marginTop: 24 }}>
                <FlatList
                    data={this.state.carros}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CarrosComponent data={item} />}

                    refreshControl={
                        <RefreshControl
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                />
            </View>
        );
    }
}
