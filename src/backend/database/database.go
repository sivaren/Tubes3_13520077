package database

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// Mendeklarasikan beberapa variabel yang akan digunakan untuk mengakses database
var (
	CLIENT                    *mongo.Client     = Initialize()
	PENYAKIT_COLLECTION       *mongo.Collection = CLIENT.Database("dna_db").Collection("jenis_penyakit")
	HASIL_PREDIKSI_COLLECTION *mongo.Collection = CLIENT.Database("dna_db").Collection("hasil_prediksi")
)

// Fungsi untuk melakukan connection ke database MongoDB sesuai dengan URI yang diberikan
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

// Fungsi untuk mengambil semua document (row) yang ada di tabel hasil_prediksi
func GetHasilPrediksi() []bson.M {
	var resultList []bson.M
	cursor, err := HASIL_PREDIKSI_COLLECTION.Find(context.TODO(), bson.M{})
	if err != nil {
		fmt.Println("Cannot find using tanggal_prediksi")
	} else {
		for cursor.Next(context.TODO()) {
			var result bson.M
			err := cursor.Decode(&result)
			if err != nil {
				fmt.Println("Decoding failed")
			}
			resultList = append(resultList, result)
		}
	}
	return resultList
}
