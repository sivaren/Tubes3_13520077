package services

import (
	"fmt"
	"time"

	"AlgeoComeback.com/libs"
	"AlgeoComeback.com/models"
)

func DNATest(Input models.Input) error {
	var status bool
	bulan := [13]string{"", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"}
	date := time.Now()
	dateNow := fmt.Sprintf("%s %d %s %d", bulan[date.Month()], date.Day(), date.Year(), date.Hour())

	DNAPenyakit, err := GetPenyakit(&Input.NamaPasien)
	if err != nil {
		return err
	}

	if Input.Method == "KMP" {
		status = libs.KMPMatch(Input.NamaPasien, DNAPenyakit)
	} else {
		status = libs.SearchBoyerMoore(Input.NamaPasien, DNAPenyakit)
	}
	accuracy := libs.HammingDistance(Input.NamaPasien, DNAPenyakit)

	if accuracy >= 0.8 {
		status = true
	}

	// hasilPrediksi := models.HasilPrediksi{
	// 	TanggalPrediksi: dateNow,
	// 	TipePrediksi:
	// }
	return err
}
