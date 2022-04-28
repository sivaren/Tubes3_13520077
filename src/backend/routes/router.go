package routes

import (
	"AlgeoComeback.com/controller"
	"github.com/gin-gonic/gin"
)

// Fungsi yang melakukan mapping terhadap http request yang dibutuhkan
func MapUrls(Router *gin.Engine) {
	Router.POST("/api/v1/add/disease", controller.AddPenyakit)
	Router.POST("/api/v1/test", controller.TestDNA)
	Router.POST("/api/v1/search", controller.Searching)
}
