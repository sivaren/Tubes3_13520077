package controller

import (
	"net/http"

	"AlgeoComeback.com/database"
	"AlgeoComeback.com/models"
	"AlgeoComeback.com/services"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
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

	c.JSON(http.StatusOK, gin.H{"status": 200,
		"message": "penyakit berhasil ditambahkan"})
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

func TestDNA(c *gin.Context) {
	var input models.Input
	err := c.ShouldBindJSON(&input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Error": err.Error()})
	}

	err = services.DNATest(input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Success": "Prediksi berhasil ditambahkan"})
}

func Searching(c *gin.Context) []bson.M {
	result := database.GetHasilPrediksi()
	return result
}
