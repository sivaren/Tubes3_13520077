package controller

import (
	"fmt"
	"net/http"

	"AlgeoComeback.com/database"
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
		c.JSON(http.StatusOK, gin.H{"error": err.Error(), "message": 400})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": 200,
		"message": "penyakit berhasil ditambahkan"})
}

func AddHasilPrediksi(c *gin.Context) {
	var prediksi models.HasilPrediksi
	err := c.ShouldBindJSON(&prediksi)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = services.AddHasilPrediksi(&prediksi)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": "Prediksi berhasil ditambahkan"})
}

func TestDNA(c *gin.Context) {
	var input models.Input
	err := c.ShouldBindJSON(&input)
	if err != nil {
		fmt.Println("error bind")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	hasilPrediksi, err := services.DNATest(input)
	if err != nil {
		fmt.Println("error hasil prediksi")
		c.JSON(http.StatusOK, gin.H{"error": err.Error(), "message": 400})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Prediksi berhasil ditambahkan",
		"data": hasilPrediksi})
}

func Searching(c *gin.Context) {
	result := database.GetHasilPrediksi()
	c.JSON(http.StatusOK, gin.H{"message": "Prediksi berhasil ditambahkan",
		"data": result})
}
