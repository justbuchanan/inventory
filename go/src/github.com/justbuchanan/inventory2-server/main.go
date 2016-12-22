package main

import (
    "fmt"
    "html"
    "log"
    "net/http"
    "os/exec"
    "bytes"

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
    router.HandleFunc("/part/{partId}/label", PartLabelHandler)
    fmt.Println("Inventory api listening on port 8080")
    log.Fatal(http.ListenAndServe(":8080", router))
}

func Index(w http.ResponseWriter, r *http.Request) {
    path := html.EscapeString(r.URL.Path)
    fmt.Printf("GET %q\n", path)
}

func PartHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    partId := vars["partId"]

    p := Part{Id: partId, Brief: "M3 x 12mm screws", Description: "", Quantity: 75}
    json.NewEncoder(w).Encode(p)
}

func PartLabelHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    partId := vars["partId"]
    p := Part{Id: partId, Brief: "M3 x 12mm screws", Description: "", Quantity: 75}

    cmd := exec.Command("/home/justin/src/justin/dymo-python/main.py",
        p.Brief,
        "https://inventory.justbuchanan.com/part/" + p.Id,
        "--bbox",
        "--size=small",
        "--output=/tmp/label.pdf")
    var out bytes.Buffer
    cmd.Stdout = &out
    err := cmd.Run()
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf(string(out.Bytes()))

    json.NewEncoder(w).Encode(p)
    fmt.Fprintln(w, "label")
}
