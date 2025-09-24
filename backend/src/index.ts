import express from 'express'

const app = express()

app.post('/addtx', (req, res)=>{
    const document1 = req.body.doc1
    const document2 = req.body.doc2
    const document3 = req.body.doc3
})


app.get('/test', (req, res)=>{
    res.json({
        msg: "server is running"
    })
})

app.listen(8081)