import mysql from "mysql";


export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "unbunbunb1",
    database: "api_usuarios"
})
