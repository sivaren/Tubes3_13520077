package routes

func mapUrls() {
	var router = backend.router
	router.POST("/api/v1/add/disease", AddPenyakit)
	router.POST("/api/v1/add/test", AddDNATest)
	router.GET("/api/v1/result", DNATestResult)
	router.GET("/api/v1/search", Searching)
}
