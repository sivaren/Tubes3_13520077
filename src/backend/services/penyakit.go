package services

import (
	"context"
	"errors"
	"fmt"

	"AlgeoComeback.com/database"
	"AlgeoComeback.com/models"
	"go.mongodb.org/mongo-driver/bson"
)

// Fungsi untuk menambahkan penyakit ke dalam tabel jenis_penyakit
func AddPenyakit(Penyakit *models.Penyakit) error {
	var err error

	_, err = GetPenyakit(&Penyakit.NamaPenyakit)
	if err == nil {
		return errors.New("nama penyakit sudah ada")
	}

	_, err = database.PENYAKIT_COLLECTION.InsertOne(context.TODO(), Penyakit)
	return err
}

// Fungsi untuk mengambil data dengan atribut nama_penyakit yang sama, apabila sudah ada, maka tidak mengembalikan error
func GetPenyakit(namaPenyakit *string) (string, error) {
	var (
		DNAPenyakit string
		Penyakit    *models.Penyakit
	)
	query := bson.D{bson.E{Key: "nama_penyakit", Value: namaPenyakit}}
	err := database.PENYAKIT_COLLECTION.FindOne(context.TODO(), query).Decode(&Penyakit)
	if err != nil {
		fmt.Println("Masuk", err)
		return DNAPenyakit, err
	}
	DNAPenyakit = Penyakit.DNAPenyakit
	return DNAPenyakit, err
}
