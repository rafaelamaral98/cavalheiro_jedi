import React from 'react';
import * as Script from './../../JavaScript/funcoes.js';

export default class Produtos extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            produtos:[]
        }
        this.enviarCompra = this.enviarCompra.bind(this);
    }
    
    async componentDidMount(){
        let resposta = await fetch('http://localhost/ReactJS%20-%20B%C3%A1sico/fullstack_eletro/src/backend/php/pegarCont.php?tabela=produtos');
        let dados = await resposta.json();
        this.setState({produtos: dados});
    }

    async enviarCompra(elemento){
        elemento.preventDefault();
        const url = "http://localhost/ReactJS%20-%20B%C3%A1sico/fullstack_eletro/src/backend/php/enviarCompra.php";
        const dados = new FormData(elemento.target);
        const cabecalho = {
            method: "post",
            body: dados,
        }
        await fetch(url,cabecalho);
    }
    
    render(){
        return(
                <div>       
                    <section className="categorias bg-dark">
                       
                        <nav className="navbar navbar-expand-lg container-fluid text-white">
                            <h3 className="navbar-brand font-weight-bold">Categorias</h3>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#categoria_nav">
                            <span className="container-fluid text-white font-weight-bold">Mostrar</span>
                            </button>

                            <div id="categoria_nav" className="collapse navbar-collapse justify-content-end">
                                <ul className="navbar-nav">
                                    <li className="nav-item ml-4" onClick={Script.exibir_todos}>Todos (12)</li>
                                    <li className="nav-item ml-4" onClick={() => Script.exibir_categoria('geladeiras')}>Geladeiras (3)</li>
                                    <li className="nav-item ml-4" onClick={() => Script.exibir_categoria('fogoes')}>Fogões (2)</li>
                                    <li className="nav-item ml-4" onClick={() => Script.exibir_categoria('microondas')}>Microondas (3)</li>
                                    <li className="nav-item ml-4" onClick={() => Script.exibir_categoria('lava_roupas')}>Lavadora de Roupas (2)</li>
                                    <li className="nav-item ml-4" onClick={() => Script.exibir_categoria('lava_loucas')}>Lava-Louças (2)</li>
                                </ul>
                            </div>
                        </nav>
                
                    </section>            

                    <header>
                        <h2>Produtos</h2>
                    </header> 
                    
                    <hr/>           


                    <div className="container-fluid">
                        <div className="produtos row row-cols-2 row-cols-md-3 row-cols-lg-4">
                            {this.state.produtos && this.state.produtos.map((item,id,)=>
                                
                        
                                    <div className="box_produto col mb-1 border border-dark" id={item['categoria']}>

                                        <img src={require('./../../' + item['imagem']).default} width="120px" onClick={() => Script.destaque(this)} alt=""/>
                                        <br/>

                                        <p className="nome_produto">{item['descricao']}</p>
                                        <hr/>

                                        <p className=""><del>{parseInt(item['preco_antigo']).toLocaleString ('pt-br', {style: 'currency', currency: 'BRL'})}</del></p>
                                        <p className="text-danger font-weight-bold">{parseInt(item['preco_venda']).toLocaleString ('pt-br', {style: 'currency', currency: 'BRL'})}</p><br/>            


                                        <form onSubmit={this.enviarCompra}>
                                            <button type="submit" className="btn btn-danger font-weight-bold" onMouseOver={() => Script.porCima(this)} onMouseOut={() => Script.porFora(this)}>COMPRAR</button>
                                            <input type="hidden" name="cliente" value="cliente_default"/>
                                            <input type="hidden" name="produto" value={item['descricao']} />
                                            <input type="hidden" name="valor_unitario" value={item['preco_venda']} />
                                        </form>
                                        <br/><br/>               

                                    </div>                         

                            )}
                        </div> 
                    </div>    

                </div>   
        );
    }
}