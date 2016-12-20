package main

import (
    "database/sql"
    "fmt"
    "time"
    _ "github.com/mattn/go-sqlite3"
)

func main() {
    db, err := sql.Open("sqlite3", "./inventory.db")
    // checkErr(err)

    stmt, err := db.Prepare("INSERT")
}
