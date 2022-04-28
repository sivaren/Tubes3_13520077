package models

type Input struct {
	NamaPasien        string `json:"nama_pasien" bson:"nama_pasien" binding:"required"`
	PenyakitPrediksi  string `json:"penyakit_prediksi" bson:"penyakit_prediksi" binding:"required"`
	Method            string `json:"method" binding:"required"`
	SequenceDNAPasien string `json:"text" binding:"required"`
}
