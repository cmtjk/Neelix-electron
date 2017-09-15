'use strict'

const remote = require('electron').remote;
const main = remote.require('./main.js')

const mysql = require('mysql');

function MysqlHandler() {
    this.getConnection = function () {
        let con = mysql.createConnection({
            host: "<IP>",
            user: "<USER>",
            password: "<PASSWORD>",
            database: "<DATABASE>"
        });
        return con;
    }

    this.getRequestTypes = function (callback) {
        let con = this.getConnection();
        con.connect(log);
        con.query('SELECT * FROM RequestTypes', function (err, rows, fields) {
            if (err) {
                console.log("Error while fetching request types from database: " + err)
            } else {
                let data = ""
                rows.forEach(row => {
                    data += "<option value='" + row.Name + "' data-description='" + row.Description + "'>" + row.Name + "</option>"
                });
                callback(data)
            }
        });
        con.end()
    }


    this.getNotes = function (callback) {
        let con = this.getConnection();
        con.connect(log)
        con.query("SELECT * FROM Notes ORDER BY Id DESC", function (err, rows, fields) {
            if (err) {
                console.log("Error while fetching request types from database: " + err)
            } else {
                let data = ""
                rows.forEach(row => {
                    let date = row.Datetime.toISOString().split('T')[0]
                    let time = row.Datetime.toISOString().split('T')[1].split('.')[0]
                    data += "<div class='margin-bottom'><strong>USER</strong><p class='small'><code>" + date + " " + time + "</code></p><p>" + row.Note + "</p><a href='javascript:deleteNote(" + row.Id + ")' class='btn btn-warning btn-xs'>erledigt?</a></div>"
                })
                callback(data);
            }
        })
    }

    this.saveNote = function (note) {
        let con = this.getConnection();
        con.connect(log);
        var sql = "INSERT INTO Notes VALUES('', ?, ?)"
        var inserts = [new Date().toISOString(), note]
        sql = mysql.format(sql, inserts)
        console.log(sql)
        con.query(sql)
        con.end()
    }

    this.deleteNote = function (id) {
        let con = this.getConnection();
        con.connect(log);
        var sql = "DELETE FROM Notes WHERE Id = ?";
        var inserts = [id]
        sql = mysql.format(sql, inserts)
        console.log(sql);
        con.query(sql);
        con.end();
    }
}




function log(err) {
    if (err) {
        console.log("An error occurred: " + err)
    } else {
        console.log("Success.")
    }
}

