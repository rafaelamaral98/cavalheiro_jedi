import React from 'react';
export default class Contato extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {mensagens: []};
        this.enviarFormulario = this.enviarFormulario.bind(this);
    }

    async componentDidMount(){
        const resposta = await fetch ('http://localhost/ReactJS%20-%20B%C3%A1sico/fullstack_eletro/src/backend/php/pegarMensagem.php');
        const json = await resposta.json ();
        this.setState ({mensagens: json});
    }

    async enviarFormulario(elemento){
        elemento.preventDefault();
        const url = "http://localhost/ReactJS%20-%20B%C3%A1sico/fullstack_eletro/src/backend/php/enviarFormulario.php";
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

                <br/><br/>
                
                <header>
        
                    <h2>Contato</h2>
        
                </header>
        
                <hr/>
        
                <table className="table">
                  
                   <thead> 
                        <tr>
            
                            <td className="text-center w-50">
                                
                                <img src={require('./../../Imagens/Email.png').default} width="40px" alt=""/>
                                contato@fullstackeletro.com
            
                            </td>
            
                            <td className="text-center w-50">
                                
                                <img src={require('./../../Imagens/Whatsapp.png').default} width="40px" alt=""/>
                                (11) 99999-9999
            
                            </td>
            
                        </tr>
                    </thead>
        
                </table>
        
                <br/><br/>
        
                <form className="form-group formulario" onSubmit={this.enviarFormulario}>
        
                    <h4>Nome</h4>
                    <input className="form-control caixa_mensagem" type="text" name="nome" placeholder="Escreva aqui o seu nome"/>
                    <h4>E-mail</h4>
                    <input className="form-control caixa_mensagem" type="email" name="email" placeholder="Insira aqui seu email" />
                    <h4>Mensagem</h4>
                    <textarea rows="8" placeholder="Deixe aqui sua mensagem" name="msg" className=" form-control caixa_mensagem"></textarea>
                    <input className="btn btn-lg mt-2 btn-danger" type="submit" value="Enviar"/>
        
                </form>

                <div className="container-fluid" >
                    <div className="row" >
                        <div className="col">
                            <h3>Comentarios de nossos clientes:</h3>
                            <div className="list-group">
                                {this.state.mensagens.map(mensagem =>(
                                    <div className="list-group-item">
                                        <h5>{mensagem.nome}</h5>
                                        <p>{mensagem.msg}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            
                <br/><br/><br/><br/>
                    
            </div>
        );
    }
}