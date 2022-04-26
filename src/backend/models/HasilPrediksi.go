package models

type HasilPrediksi struct {
	TanggalPrediksi  string `json:"tanggal_prediksi" bson:"tanggal_prediksi" binding:"required"`
	NamaPasien       string `json:"nama_pasien" bson:"nama_pasien" binding:"required"`
	PenyakitPrediksi string `json:"penyakit_prediksi" bson:"penyakit_prediksi" binding:"required"`
	StatusPrediksi   bool   `json:"status_prediksi" bson:"status_prediksi" binding:"required"`
}
