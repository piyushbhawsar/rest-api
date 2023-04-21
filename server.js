//clean modular code , routes and method handling easy , builtin urlsearchparams 
const express = require("express")
const app = express()
const port = 3000

const users = require("./MOCK_DATA.json")
const fs = require("fs")

// middleware
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

//routes
app.get("/" , (req,res) => {
    return res.json(users) 
})

app.get("/api", (req,res)=> { //for phone or smart device users 
    const html = `
        <ul>
            ${users.map(val => `<li>NAME: ${val.first_name}</li>`).join("")}
        <ul>
    `
    return res.send(html)
})

app.route("/:id")
    .get((req,res) => {
        const id = Number(req.params.id)
        const user = users.filter(user => user.id === id)
        return res.json(user)
    })
    .put((req,res) => {
        return res.json({ status: "pending"})
    })
    .patch((req,res) => {
        return res.json({ status: "pending"})
    })
    .delete((req,res) => {
        return res.json({ status: "pending"})
    })

app.post('/', (req,res) => {
    const body = req.body
    users.push({
        id: users.length+1 ,
        ...body
    })
    console.log("BODY " + JSON.stringify(body))
    fs.writeFile(`./MOCK_DATA.json` , JSON.stringify(users) , (err,data) => {
        return res.json({ status: "completed" , id: users.length })
    })
})

app.listen(port, () => console.log(`server started at port: ${port}`))
