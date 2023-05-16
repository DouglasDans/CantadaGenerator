const express = require("express");
const fetchAPI = require("./services/request")
const handlebars = require("express-handlebars").engine

const app = express()

//Declação de variáveis
const portaRede = 8081; //define a porta de rede que será usada
const pageExtensao = "hbs" // define o nome da extensão dos arquivos

app.use('/public', express.static(__dirname + '/public'))
app.use(express.json())

//Mudei a localização da pasta views
app.set("views", "./src/views")

// ( "Define a extensão dos arquivos, define o layout padrão ")
app.engine(pageExtensao, handlebars({defaultLayout: "main"}))
app.set("view engine" , pageExtensao)

app.get("/", async (req, res) => {
    res.render("index")
})

app.get("/request", async (req, res) => {
    const {tema} = req.query
    fetchAPI(`Mande uma cantada com o tema: ${tema}`)
        .then(data => res.render("request", {data: data.choices[0].message.content}))
    // res.render("request", {data: "Maria! Maria! Estoy enamorado por ti, Maria!"})
})


app.listen(portaRede, () => {
    console.log("[express] Working http://localhost:" + portaRede);
})