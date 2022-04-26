package database

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var (
	CLIENT                    *mongo.Client     = Initialize()
	PENYAKIT_COLLECTION       *mongo.Collection = CLIENT.Database("dna_db").Collection("jenis_penyakit")
	HASIL_PREDIKSI_COLLECTION *mongo.Collection = CLIENT.Database("dna_db").Collection("hasil_prediksi")
)

func Initialize() *mongo.Client {
	var (
		ctx    context.Context
		err    error
		client *mongo.Client
	)

	connect := options.Client().ApplyURI("mongodb+srv://algeocomeback:tubes3stima@dna-db.fuxdc.mongodb.net/dna_db?retryWrites=true&w=majority").SetServerAPIOptions(options.ServerAPI(options.ServerAPIVersion1))
	client, err = mongo.Connect(ctx, connect)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Successfully connected to MongoDB")
	return client
}
