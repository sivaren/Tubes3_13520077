package services

import (
	"context"
	"fmt"
	"time"

	"AlgeoComeback.com/database"
	"AlgeoComeback.com/libs"
	"AlgeoComeback.com/models"
)

// Fungsi untuk menjalankan algoritma KMP atau Boyer-Moore dan menghitung distance menggunakan algoritma Damerau–Levenshtein
func DNATest(Input models.Input) (models.HasilPrediksi, error) {
	var hasilPrediksi models.HasilPrediksi
	var status bool
	bulan := [13]string{"", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"}
	date := time.Now()

	DNAPenyakit, err := GetPenyakit(&Input.PenyakitPrediksi)
	if err != nil {
		return hasilPrediksi, err
	}

	if Input.Method == "KMP" {
		status = libs.KMPMatch(Input.SequenceDNAPasien, DNAPenyakit)
	} else {
		status = libs.SearchBoyerMoore(Input.SequenceDNAPasien, DNAPenyakit)
	}
	accuracy := libs.Score(Input.SequenceDNAPasien, DNAPenyakit)

	if accuracy >= 0.8 {
		status = true
	}

	accuracyPercentage := accuracy * 100

	hasilPrediksi = models.HasilPrediksi{
		TanggalPrediksi:  fmt.Sprintf("%d %s %d", date.Day(), bulan[date.Month()], date.Year()),
		NamaPasien:       Input.NamaPasien,
		PenyakitPrediksi: Input.PenyakitPrediksi,
		StatusPrediksi:   status,
		Accuracy:         fmt.Sprintf("%.2f", accuracyPercentage)}

	_, err = database.HASIL_PREDIKSI_COLLECTION.InsertOne(context.TODO(), hasilPrediksi)
	return hasilPrediksi, err
}
