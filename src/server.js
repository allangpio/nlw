const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta /public
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

// utilizando template engine (nunjucks)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminhos da minha aplicação
// página inicial
// req: requisição
// res: resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {

    //req.query: Query Strings da nossa URL (aquilo que fica na url e guarda o que foi preenchido no formulário)
    // ele retorna um objeto com os valores
    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req.body: O corpo do formulário
    console.log(req.body)

    // inserir dados no banco de dados
    const query = `
        INSERT INT places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]


    // função que verifica se houve erro ou sucesso na inserção dos dados

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.render("create-point.html", { erroCadastro: true })
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    // o terceiro argumento é uma função que é rodada depois da inserção dos dados que é a função acima
    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        // pesquisa vazia
        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { total: 0 })
    }


    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        // console.log não é necessário, mas serve para observar no terminal o que está acontecenfo
        console.log("Aqui estão seus registros")
        console.log(rows)

        const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })
})

// ligar o servidor
server.listen(3000)