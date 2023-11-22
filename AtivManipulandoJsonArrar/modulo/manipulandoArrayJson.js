/*
*Autor: Carlos Eduardo
*Data: 01/11/2023
*Objetivo: Criar um Back-End para no futuro integrar em uma API que terá como objetivo trazer informações sobre os estados do Brasil
*Versão:1.0
*/

var estados_cidades = require('./estadosBrasileiros')
const estadosCidadesJSON = estados_cidades.estadosCidades

const getListaDeEstados = function(){
    let arrayLocal = []
    let jsonEstados = {}
    let status = false

    estados_cidades.estadosCidades.estados.forEach(estado => {
        arrayLocal.push(estado.sigla)
        status = true
    });

    jsonEstados.UF = arrayLocal
    jsonEstados.Quantidade = arrayLocal.length

    if(status)
        return jsonEstados;
    else
        return false
}
console.log(getListaDeEstados());
console.log()

const getDadosEstado = function(siglaRecebida){

    let siglaEstado = siglaRecebida

    let estados_cidades = estadosCidadesJSON
    let estados = estados_cidades.estados
    let estadoJSON = {}
    let status = false

    estados.forEach(function(estado){

        let sigla = estado.sigla
        let nome = estado.nome

        if(siglaEstado.toUpperCase().match(sigla.toUpperCase())){

            let capital = estado.capital
            let regiao = estado.regiao

            estadoJSON.uf = sigla
            estadoJSON.descricao = nome
            estadoJSON.capital = capital
            estadoJSON.regiao = regiao
            status = true
        }
    })

    if(status)
        return estadoJSON;
    else
        return false
    

}

console.log()
console.log(getDadosEstado('mg'))

const getCapitalEstado = function(siglaRecebida){

    let siglaEstado = siglaRecebida
    let status = false

    let estados_cidades = estadosCidadesJSON
    let estados = estados_cidades.estados
    let estadoJSON = {}

    estados.forEach(function(estado){

        let sigla = estado.sigla
        let nome = estado.nome
        
        
        if(siglaEstado.toUpperCase().match(sigla.toUpperCase())){

            let capital = estado.capital

            estadoJSON.uf = sigla
            estadoJSON.descricao = nome
            estadoJSON.capital = capital
            status = true
        }

    })

    if(status){
        return estadoJSON
    }else{
        status = false
    }

}

console.log()
console.log(getCapitalEstado('rj'))


const getEstadosRegiao = function(regiaoRecebida){

    let regiaoEstados = regiaoRecebida

    let estados_cidades = estadosCidadesJSON
    let estados = estados_cidades.estados
    let regiaoJSON = {}
    regiaoJSON.regiao = regiaoEstados
    let status = false

    let arrayEstados = []

    estados.forEach(function(estado){

        let regiao = estado.regiao
        
        if(regiao.toLowerCase().match(regiaoEstados.toLowerCase())){

            let estadoJSON ={}

            let sigla = estado.sigla
            let nome = estado.nome

            estadoJSON.uf = sigla
            estadoJSON.descricao = nome

            arrayEstados.push(estadoJSON)
            status = true
        }

    })

    regiaoJSON.estados = arrayEstados
    if(status){
        return regiaoJSON
    }else{
        status = false
    }

}

console.log()
console.log(getEstadosRegiao('nordeste'))


const getCapitalPais = function(){

    let estados_cidades = estadosCidadesJSON
    let estados = estados_cidades.estados
    let paisJSON = {}
    let arrayCapitais = []
    let status = false

    estados.forEach(function(estado){

        let eCapital =  estado.capital_pais
        
        if(eCapital){

            let capital_atual = estado.capital
            let uf = estado.sigla
            let descricao = estado.nome
            let capital = estado.capital
            let regiao = estado.regiao
            let inicio = estado.ano_inicio
            let final = estado.ano_fim

            let estadoJSON = {
                capital_atual: capital_atual,
                uf: uf,
                descricao: descricao,
                capital: capital,
                regiao: regiao,
                capital_pais_ano_inicio: inicio,
                capital_pais_ano_fim: final
            }
            status = true
            arrayCapitais.push(estadoJSON)
        }

    })

    paisJSON.capitais = arrayCapitais
    if(status)
        return paisJSON
    else
        status = false
}

console.log()
console.log(getCapitalPais())

const getCidades = function (siglaRecebida){

    let siglaEstado = siglaRecebida

    let estados_cidades = estadosCidadesJSON
    let estados = estados_cidades.estados
    let estadoJSON = {}
    let cidadesArray = []
    let status= false

    estados.forEach(function(estado){

        let sigla = estado.sigla

        if(siglaEstado.toUpperCase().match(sigla.toUpperCase())){

            estadoJSON.uf = sigla
            estadoJSON.descricao = estado.nome

            let cidadesEstado = estado.cidades

            cidadesEstado.forEach(function(cidade){
                let nome = cidade.nome
                cidadesArray.push(nome)
            })

            estadoJSON.quantidade_cidades = cidadesArray.length
            status = true
        }
    })
    estadoJSON.cidades = cidadesArray

    if(status)
        return estadoJSON
    else
        status = false
}

console.log()
console.log(getCidades('pe'))

module.exports = {
    getCapitalEstado,
    getCapitalPais,
    getCidades,
    getEstadosRegiao,
    getListaDeEstados,
    getDadosEstado
}