package backend

import "github.com/gin-gonic/gin"

var (
	router = gin.Default()
)

func main() {
	routes.mapUrls()
	router.Run(":8080")
}
