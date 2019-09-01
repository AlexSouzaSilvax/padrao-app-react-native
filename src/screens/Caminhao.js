import React from 'react';
import { RefreshControl, View, FlatList, Image } from 'react-native';
import axios from 'axios';
import { url } from '../util'
import VeiculoComponent from '../components/VeiculoComponent';
import BotaoFlutuante from '../components/BotaoFlutuanteAdc';

export default class Caminhao extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            caminhao: [],
            loading: true
        };

        this.GetData();
    }

    async GetData() {
        await axios.get(url + 'caminhao')
            .then((response) => {
                console.log("Lista de caminhao: ", response.data)
                this.setState({ caminhao: response.data, loading: false })
            }).catch((err) => {
                console.log("Erro ao listar caminhao: ", err)
                console.log("Nenhum caminhao foi encontrado");
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
                    data={this.state.caminhao}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <VeiculoComponent
                            data={item}
                            onPress={() => { this.props.navigation.navigate('DetalheVeiculo', { data: item, titulo: item.nome }) }}
                        />
                    }
                    refreshControl={<RefreshControl onRefresh={this.onRefresh.bind(this)} />}
                />
                <BotaoFlutuante onPress={() => { this.props.navigation.navigate('DetalheVeiculo') }} />
            </View>
        );
    }
}
