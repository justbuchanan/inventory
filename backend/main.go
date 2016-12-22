package main

import (
	"bytes"
	"fmt"
	"html"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strconv"

	"encoding/json"
	"github.com/gorilla/mux"
)

type Part struct {
	Id          string `json:"id"`
	Brief       string `json:"brief"`
	Description string `json:"description"`
	Quantity    uint64 `json:"quantity"`
}

func main() {
	router := mux.NewRouter().StrictSlash(true)

	// parts "api" routes
	router.HandleFunc("/part/{partId}", PartHandler)
	router.HandleFunc("/part/{partId}/label", PartLabelHandler)
	router.HandleFunc("/parts", PartsIndexHandler)

	// serve angular frontend
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./dist/")))

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

func PartsIndexHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: pull from db
	parts := []Part{
		Part{Id: "1", Brief: "M3 x 12mm screws", Description: "", Quantity: 75},
		Part{Id: "2", Brief: "Red Leds", Description: "", Quantity: 20},
		Part{Id: "3", Brief: "M4 x 10mm screws", Description: "", Quantity: 100},
	}

	json.NewEncoder(w).Encode(parts)
}

func PartLabelHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	partId := vars["partId"]

	// lookup part
	// TODO: pull info from database
	p := Part{Id: partId, Brief: "M3 x 12mm screws", Description: "", Quantity: 75}

	// create tmp dir to write label into
	tmpdir, err := ioutil.TempDir("/tmp", "inventory")
	if err != nil {
		log.Fatal(err)
	}

	outpath := tmpdir + "/label.pdf"

	// generate label using python script
	// TODO: change path to python file
	cmd := exec.Command("/home/justin/src/justin/dymo-python/main.py",
		p.Brief,
		"https://inventory.justbuchanan.com/part/"+p.Id,
		"--bbox",
		"--size=small",
		"--output="+outpath)
	var out bytes.Buffer
	cmd.Stdout = &out
	err = cmd.Run()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf(string(out.Bytes()))

	// read pdf file
	pdfdata, err := os.Open(outpath)
	if err != nil {
		log.Fatal(err)
	}
	defer pdfdata.Close()

	// get file size
	var fi os.FileInfo
	fi, err = pdfdata.Stat()
	if err != nil {
		log.Fatal(err)
	}
	pdfSize := fi.Size()

	// set header info
	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition", "attachment; filename=\"file.pdf\"") // TODO: this doesn't work
	w.Header().Set("Content-Length", strconv.FormatInt(pdfSize, 10))

	// write pdf to http response
	_, err = io.Copy(w, pdfdata)
	if err != nil {
		log.Fatal(err)
	}
}
