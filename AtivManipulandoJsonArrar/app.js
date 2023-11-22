/***********************************************
*Objetivo: Criar APIpara manipular dados  
*Data: 01/11/2023    
*Autor: Carlos Eduardo 
*Versão: 1.0 
***********************************************/

// Arquivos instalados
/**
 *      npm install express --save
 *          É a biblioteca que vai gerenciar as requisições da API
 *      
 *      npm install body-parser --save
 *          É a biblioteca que vai manipular dados do corpo da requisição (POST, PUT)
 *          
 *      npm install cors --save
 *          É a biblioteca responsavel pelas permissões (HEADER) de acesso das requisições
 * 
 */

//Importe das bibliotecas para criar a API
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Criando um objeto para manipular as requisoções da API
const app = express();

//      request - recebe algum dado
//      response - saída de dados da API

//Função para manipular as restrições da API (HEADER)
app.use((request, response, next) =>{
    //Permite especificar quem poderá acessar a API('*' - libera o acesso publico, 'IP' - libera acesso apenas para aquela máquina)
    response.header('Access-Control-Allow-Origin', '*')
    //Permite especificar como a API, será requisitada (GET, POST, PUT e DELETE)
    response.header('Access-Control-Allow-Methods','GET')

//Ativa as configurações de permissão do cors
    app.use(cors());

    next();
})

//EndPoints:

//Endpoint que lista as siglas de todos os estados
app.get('/estados/sigla', cors(), async function(request, response, next){


        let controleEstadosCidades = require('./modulo/manipulandoArrayJson.js');
        let listaEstados = controleEstadosCidades.getListaDeEstados();

        if(listaEstados){
            response.json(listaEstados)
            response.status(200)
        }else{
            response.status(404)
        }
})

//Endpoint que retorna dados filtrando pela sigla
app.get('/estado/sigla/:uf', cors(), async function(request, response, next){

    //recebe uma variavel encaminhada como parametro na requisicao
    let siglaEstado = request.params.uf;

    let controleDadosEstado = require('./modulo/manipulandoArrayJson.js')
    let dadosEstado = controleDadosEstado.getDadosEstado(siglaEstado)
    
    if(dadosEstado){
        response.json(dadosEstado)
        response.status(200)
    }else{
        response.status(404)
        response.json({ERRO:'item não encontrado'})
    }
})

//Endpoint que retorna dados da capital filtrando pela sigla
app.get('/capital/estado', cors(), async function(request, response, next){

    //recebe uma variavel encaminhada como queryString na requisicao
    //Ex.: /capital/estado?uf=SP
    let siglaEstado = request.query.uf;

    let controleDadosCapital = require('./modulo/manipulandoArrayJson.js')
    let dadosEstado = controleDadosCapital.getCapitalEstado(siglaEstado)
    
    if(dadosEstado){
        response.json(dadosEstado)
        response.status(200)
    }else{
        response.status(404)
        response.json({ERRO:'item não encontrado'})
    }
})

//Endpoint que retorna os estados pela regiao
app.get('/estado/regiao', cors(), async function(request, response, next){

    let regiaoEstado = request.query.regiao;

    let controleDadosRegiao = require('./modulo/manipulandoArrayJson.js')
    let dadosRegiao = controleDadosRegiao.getEstadosRegiao(regiaoEstado)

    if(dadosRegiao){
        response.json(dadosRegiao)
        response.status(200)
    }else{
        response.status(404)
        response.json({ERRO:'item não encontrado'})
    }
})

//Endpoint que retorna as informações referente aos estados que formam a capital do Brasil.
app.get('/estado/capitalPais', cors(), async function(request, response, next){

    let controleCapitalPais = require('./modulo/manipulandoArrayJson.js')
    let dadosCapital = controleCapitalPais.getCapitalPais()

    if(dadosCapital){
        response.json(dadosCapital)
        response.status(200)
    }else{
        response.status(404)
        response.json({ERRO:'item não encontrado'})
    }
})

//Endpoint que retorna todas as cidades filtrando pelo estado
app.get('/estado/cidades', cors(), async function(request, response, next){

    let siglaEstado = request.query.uf;

    let controleDadosCidades = require('./modulo/manipulandoArrayJson.js')
    let dadosCidades = controleDadosCidades.getCidades(siglaEstado)

    if(dadosCidades){
        response.json(dadosCidades)
        response.status(200)
    }else{
        response.status(404)
        response.json({ERRO:'item não encontrado'})
    }
})


app.listen('8080', function(){
        console.log('API funcionando!')
})


















