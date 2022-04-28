package services

import (
	"context"

	"AlgeoComeback.com/database"
	"AlgeoComeback.com/models"
)

// Fungsi untuk menambahkan hasil prediksi ke tabel hasil_prediksi (tidak memerlukan pengecekan apapun)
func AddHasilPrediksi(Prediksi *models.HasilPrediksi) error {
	_, err := database.HASIL_PREDIKSI_COLLECTION.InsertOne(context.TODO(), Prediksi)
	return err
}
