var express = require("express");
    path = require("path"),
    bodyparser = require("body-parser"),
    cons = require("consolidate"),
    dust = require("dustjs-helpers"),
    app = express();
var pg = require('pg');
var R = require('ramda');
// DB connect string
const cs = 'postgres://postgres:s$cret@localhost:5432/recipe';

//assign dust engine to .dust files
app.engine('dust',cons.dust);

//set default ext
app.set('view engine','dust');
app.set('views',__dirname + '/views');
//set public folder
app.use(express.static(path.join(__dirname,'public')));

// bodyparser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

// node postgres

const client = new pg.Client(cs);
client.connect();




//get request

app.get('/',(req,res)=>{
  
  pg.connect(cs,function(err, client, done){
    if (err){
        return console.error("error fetching from the pool", err);
    }
    client.query('SELECT * FROM recipes;', function(err,result){
        if (err){
            return console.error("error fetching from the pool", err);
        }
        res.render('index', {recipes: result.rows});
        done()
    })

  })
   

});

//Post request


app.post('/add',(req,res)=> {
    pg.connect(cs,function(err, client, done){
        if (err){
            return console.error("error fetching from the pool", err);
        }
       client.query('INSERT INTO recipes (name, description, directions) VALUES ($1,$2,$3);',
       [req.body.name,req.body.description, req.body.directions]);
        done();
        res.redirect('/');
      })
})

app.post('/edit',(req,res)=> {
    pg.connect(cs,function(err, client, done){
        if (err){
            return console.error("error fetching from the pool", err);
        }
       client.query('UPDATE recipes SET name=$1, description=$2, directions=$3 WHERE id=$4;',
       [req.body.name,req.body.description,req.body.directions,req.body.id]);
       done();
       res.redirect('/');
      })
})

// delete

app.delete('/delete/:id',(req,res)=>{
    pg.connect(cs,function(err, client, done){
        if (err){
            return console.error("error fetching from the pool", err);
        }
       client.query('DELETE FROM recipes WHERE id = $1;',
       [req.params.id]);
        done();
        res.send(200);
      })
});

//listening port


app.listen(3000, function(){
    console.log('Server Started on Port 3000')
});