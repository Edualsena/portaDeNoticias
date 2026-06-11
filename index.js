require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const path = require('path');



const app = express();

const Posts = require('./Posts');

mongoose.connect(process.env.MONGO_URI).then(function(){
    console.log("Conectado com sucesso");
}).catch(function(err){
    console.log(err.message);
})

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));

/*
app.get('/',(req,res)=>{

    if(req.query.busca == null){
        Posts.find({}).sort({'_id':-1}).exec(function(err,posts){
            console.log(posts[0]);
        })
        res.render('home',{});    
    }else{
        res.render('busca',{});
    }

    
})
*/

// Código Corrigido (com async/await)

app.get('/', async (req, res) => {

    if (req.query.busca == null) {
        try {
            // Removido o callback e o .exec(), adicionado o await
            const posts = await Posts.find({}).sort({ '_id': -1 });

            var postsMap = posts.map(function(val){
                return {
                    titulo: val.titulo,
                    conteudo: val.conteudo,
                    descricaoCurta: val.conteudo.substr(0,100),
                    imagem: val.imagem,
                    slug: val.slug,
                    categoria: val.categoria
                }
            })
            
            if (posts.length > 0) {
                /*console.log(posts[0]);*/
                res.render('home', { posts: postsMap });
            }
            
            // Se você precisa enviar os posts para a página, lembre-se de passá-los aqui:
            /*res.render('home', { posts: posts });*/ 
        } catch (err) {
            console.error("Erro ao buscar posts:", err);
            res.status(500).send("Erro interno do servidor");
        }   
    } else {
        res.render('busca', {});
    }

});


app.get('/:slug', async (req,res)=>{
    //res.send(req.params.slug);
    try {
    const resposta = await Posts.findOneAndUpdate({slug: req.params.slug}, {$inc : {views: 1}}, {new: true});

    if (!resposta) {
            return res.status(404).send('Notícia não encontrada.');
            // Ou você pode renderizar uma página de erro: res.render('404');
    }

    console.log(resposta);
    res.render('single',{ noticia: resposta });
    } catch (err) {
        res.status(500).send(err);
    }
})



app.listen(5000,()=>{
    console.log('server rodando!');
})