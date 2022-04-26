package routes

import (
	"AlgeoComeback.com/controller"
	"github.com/gin-gonic/gin"
)

func MapUrls(Router *gin.Engine) {
	Router.POST("/api/v1/add/disease", controller.AddPenyakit)
	Router.POST("/api/v1/add/test", controller.AddHasilPrediksi)
	Router.GET("/api/v1/result", controller.HasilPrediksi)
	Router.GET("/api/v1/search", controller.Searching)
}
