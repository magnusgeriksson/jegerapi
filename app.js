import express from 'express';
import { jegerinfo, skyteprover, vaapen, proveskudd } from './db/db';
import bodyParser from 'body-parser';


// Set up the express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// get all todos
app.get('/api/getjegerinfo/', (req, res) => {
    console.log('traff getjegerinfo')
  res.status(200).send({
    jegerinfo: jegerinfo
  })
});

app.post('/api/addskyteprove/', (req, res) => {
    console.log('traff addskyteprove')
    if(!req.body.dato) {
        return res.status(400).send({
            success: 'false',
            message: 'Mangler dato'
        })
    }
    if(!req.body.vaapennr) {
        return res.status(400).send({
            success: 'false',
            message: 'Mangler våpennr'
        })
    }
  
    if(!vaapen.find((v)=> v.vaapennr === req.body.vaapennr)){
        return res.status(400).send({
            success: 'false',
            message: 'Våpennummer finnes ikke på brukeren'
        })
    }
    const skyteprove = {
        dato: req.body.dato,
        vaapennr: req.body.vaapennr,
        godkjent: true
    }
    skyteprover.push(skyteprove)
    return res.status(201).send({
        success: 'true',
        message: 'Skyteprøve lagt til'
    })
    
});

app.post('/api/addproveskudd', (req, res) => {
    console.log('traff addskyteprove')
    if(!req.body.dato) {
        return res.status(400).send({
            success: 'false',
            message: 'Mangler dato'
        })
    }
    if(!req.body.antall) {
        return res.status(400).send({
            success: 'false',
            message: 'Mangler antall'
        })
    }

    const ps = {
        antall: Number(req.body.antall),
        dato: req.body.dato
    }
    proveskudd.push(ps);
    return res.status(201).send({
        success: 'true',
        message: 'Prøveskudd lagt til'
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});