package services

import (
	"context"
	"errors"

	"AlgeoComeback.com/database"
	"AlgeoComeback.com/models"
	"go.mongodb.org/mongo-driver/bson"
)

func AddPenyakit(Penyakit *models.Penyakit) error {
	var err error

	err = GetPenyakit(&Penyakit.NamaPenyakit)
	if err != nil {
		return errors.New("nama penyakit sudah ada")
	}

	_, err = database.PENYAKIT_COLLECTION.InsertOne(context.TODO(), Penyakit)
	return err
}

func GetPenyakit(namaPenyakit *string) error {
	var Penyakit *models.Penyakit
	query := bson.D{bson.E{Key: "nama_penyakit", Value: namaPenyakit}}
	err := database.PENYAKIT_COLLECTION.FindOne(context.TODO(), query).Decode(&Penyakit)
	return err
}
