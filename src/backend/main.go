package main

import (
	"github.com/gin-gonic/gin"
	"AlgeoComeback.com/routes"
)

var (
	Router = gin.Default()
)

func main() {
	routes.MapUrls(Router)
	Router.Run(":8080")
}
