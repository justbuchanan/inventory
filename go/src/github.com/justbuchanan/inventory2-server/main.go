package main

import (
    "fmt"
    "html"
    "log"
    "net/http"

    "encoding/json"
    "github.com/gorilla/mux"
)

type Part struct {
    Id string
    Brief string
    Description string
    Quantity uint64
}

func main() {
    router := mux.NewRouter().StrictSlash(true)
    router.HandleFunc("/", Index)
    router.HandleFunc("/part/{partId}", PartHandler)
    log.Fatal(http.ListenAndServe(":8080", router))
}

func Index(w http.ResponseWriter, r *http.Request) {
    path := html.EscapeString(r.URL.Path)
    fmt.Fprintf(w, "Hello, %q", path)
    fmt.Printf("GET %q\n", path)
}

func PartHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    partId := vars["partId"]

    p := Part{Id: partId, Brief: "M3 x 12mm screws", Description: "", Quantity: 75}
    json.NewEncoder(w).Encode(p)
}
