package controller

import (
	"net/http"

	"AlgeoComeback.com/models"
	"AlgeoComeback.com/services"
	"github.com/gin-gonic/gin"
)

func AddPenyakit(c *gin.Context) {
	var penyakit models.Penyakit
	err := c.ShouldBindJSON(&penyakit)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = services.AddPenyakit(&penyakit)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "penyakit berhasil ditambahkan"})
}

func AddHasilPrediksi(c *gin.Context) {
	var prediksi models.HasilPrediksi
	err := c.ShouldBindJSON(&prediksi)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Error": err.Error()})
		return
	}

	err = services.AddHasilPrediksi(&prediksi)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Success": "Prediksi berhasil ditambahkan"})
}

func AlgoritmaKMP(c *gin.Context) {
	// afk dl :D
	// var penyakit models.Penyakit
	// pos := libs.KMPMatch()
}

func AlgoritmaBoyerMoore(c *gin.Context) {

}

func Searching(c *gin.Context) {

}
