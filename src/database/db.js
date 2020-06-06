// importar a dependência do sqlite
// verbose vai mostar mensagens para cada alteração na banco de dados

const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

//exportando banco de dados para ser usar pela aplicação
module.exports = db

// utilizar o objeto de banco de dados para nossas operações
// serialize roda uma sequência de código || recebe uma função

// db.serialize(() => {
    //     //  Com comandos SQL:

    //     // 1 - Criar uma tabela
    //     db.run(`
    //         CREATE TABLE IF NOT EXISTS places (
    //             id INTEGER PRIMARY KEY AUTOINCREMENT, 
    //             image TEXT,
    //             name TEXT,
    //             address TEXT,
    //             address2 TEXT,
    //             state TEXT,
    //             city TEXT,
    //             items TEXT
    //         );
    //     `)

    // 2 - Inserir dados na tabela
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?, ?, ?, ?, ?, ?, ?);
    // `

    // const values = [
    //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
    //     "Papersider",
    //     "Guilherme Gemballa, Jardim América",
    //     "Nº260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Papel e Papelões"
    // ]


    // // função que verifica se houve erro ou sucesso na inserção dos dados

    // function afterInsertData(err) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Cadastrado com sucesso")
    //     console.log(this)
    // }

    // // o terceiro argumento é uma função que é rodada depois da inserção dos dados que é a função acima
    // db.run(query, values, afterInsertData)

    // 3 - Consultar dados da tabela
    // db.all(`SELECT * FROM places`, function (err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Aqui estão seus registros")
    //     console.log(rows)
    // })

    // 4 - Deletar dados da tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [3], function (err, rows) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log("Registro deletado com sucesso")
//     })
// })