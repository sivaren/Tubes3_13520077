package main

import (
	"AlgeoComeback.com/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var (
	Router = gin.Default()
)

func main() {
	Router.Use(cors.Default())
	routes.MapUrls(Router)
	Router.Run()
}
