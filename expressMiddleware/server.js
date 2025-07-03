const express = require('express')
const app = express()

app.use(logger)


app.get('/', (req, res) =>{
    console.log('Home Page')
    res.send('Home Page Milan')
})

app.get('/users', auth, (req, res) =>{
    console.log('Users Page')
    res.send('Users Page')
})

function logger(req, res, next){
    console.log('Before')
    next()
    console.log('After')
}
function auth(req, res, next){
    if(req.query.admin === 'true'){
        req.admin = true
        next()
        return
    } else {
        res.send('No Auth')
    }
}

app.listen(3000)