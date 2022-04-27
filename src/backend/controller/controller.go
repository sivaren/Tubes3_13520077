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
		c.JSON(http.StatusBadRequest, gin.H{"Message": err.Error()})
		return
	}

	err = services.AddPenyakit(&penyakit)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Message": "penyakit berhasil ditambahkan"})
}

func AddHasilPrediksi(c *gin.Context) {

}

func HasilPrediksi(c *gin.Context) {

}

func Searching(c *gin.Context) {

}
