package models

type Penyakit struct {
	NamaPenyakit string `json:"nama_penyakit" bson:"nama_penyakit" binding="required"`
	RantaiDNA    string `json:"rantai_dna" bson:"rantai_dna" binding="required"`
}
