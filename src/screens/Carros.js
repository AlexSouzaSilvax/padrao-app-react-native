import React from 'react';
import { RefreshControl, View, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { url } from '../util'
import VeiculoComponent from '../components/VeiculoComponent';
import BotaoFlutuante from '../components/BotaoFlutuanteAdc';

export default class Carros extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            carros: [],
            loading: true,
            atualizaLista: this.props.navigation.getParam('atualizaLista', 'false')
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

    async componentDidMount() {
        if (this.state.atualizaLista) {
            await this.GetData();
        }
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
//1º param tela de navegação, 2º valor para alimentar a tela de navegação. (Ex: o própio objeto está sendo passado.)
//this.props.navigation.state.params//recebe um objeto que vem no navigation --Alex