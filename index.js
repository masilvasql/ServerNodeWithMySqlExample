
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'seu host',
    user: 'seu usuário',
    password: 'sua senha',
    database: 'nome do seu banco',
    port: 'a porta onde seu banco está rodando'
});

app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/select', (req, res) => {
    connection.query('SELECT * FROM usuario', (err,results)=>{
        res.send(results)
        console.log(results)
    })
})

app.post('/insere', (req, res) => {
    connection.query(`INSERT INTO usuario (nomeUsuario, loginUsuario, senhaUsuario) 
    values ('${req.body.nome}', '${req.body.login}', '${req.body.senha}')`, (err,results)=>{
        console.log(err)
        if(err == null){
            res.send('Deu Certo')
        }
    })
})

app.listen(port, () => {
    console.log(`executando na porta: ${port}`)
})