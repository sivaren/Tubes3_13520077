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

/* GET ALL HASIL PREDIKSI */
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
			fmt.Println("Result:", result)
		}
	}
	return resultList
}

/* GET HASIL PREDIKSI */
func GetHasilPrediksibyTanggal(ctx context.Context, tanggal_prediksi string) []bson.M {
	var resultList []bson.M
	cursor, err := HASIL_PREDIKSI_COLLECTION.Find(context.TODO(), bson.M{"tanggal_prediksi": tanggal_prediksi})
	if err != nil {
		fmt.Println("Cannot find using tanggal_prediksi")
	} else {
		for cursor.Next(ctx) {
			var result bson.M
			err := cursor.Decode(&result)
			if err != nil {
				fmt.Println("Decoding failed")
			}
			resultList = append(resultList, result)
			fmt.Println("Result:", result)
		}
	}
	return resultList
}
