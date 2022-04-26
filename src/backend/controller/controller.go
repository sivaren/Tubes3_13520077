package controller

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-delve/delve/service"
)

func AddPenyakit(c *gin.Context) {
	var penyakit models.Penyakit
	err := c.ShouldBindJSON(&penyakit)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Message": err.Error()})
		return
	}

	err = service.AddPenyakit(&penyakit)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"Message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Message": "Successfully added"})
}
