package services

import (
	"context"

	"AlgeoComeback.com/database"
	"AlgeoComeback.com/models"
)

func AddHasilPrediksi(Prediksi *models.HasilPrediksi) error {
	_, err := database.HASIL_PREDIKSI_COLLECTION.InsertOne(context.TODO(), Prediksi)
	return err
}
