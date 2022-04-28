package database

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

const (
	DATABASE_NAME             = "dna_db"
	COLLECTION_JENIS_PENYAKIT = "jenis_penyakit"
	COLLECTION_HASIL_PREDIKSI = "hasil_prediksi"
)

func main() {
	// Configuring client URI connection
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://algeocomeback:tubes3stima@dna-db.fuxdc.mongodb.net/dna_db?retryWrites=true&w=majority"))
	if err != nil {
		fmt.Println("Client creation error")
	}

	// Apply a timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	defer cancel()

	if err != nil {
		fmt.Println("Connection failed")
	}

	defer client.Disconnect(ctx)

	// Ping the server
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		fmt.Println("Ping failed")
	}

	// List available databases within the cluster
	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		fmt.Println("Cannot display databases")
	}
	fmt.Println(databases)

	insertHasilPrediksi(client, "2022-04-11", "test", "hiv", false)
}

func getCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database(DATABASE_NAME).Collection(collectionName)
	return collection
}

func insertJenisPenyakit(client *mongo.Client, nama_penyakit string, rantai_dna string) {
	collection := getCollection(client, COLLECTION_JENIS_PENYAKIT)

	document := bson.D{
		{"nama_penyakit", nama_penyakit},
		{"rantai_dna", rantai_dna}}

	result, _ := collection.InsertOne(context.TODO(), document)
	fmt.Println("Inserted document with id: ", result)
}

func insertHasilPrediksi(client *mongo.Client, tanggal_prediksi string, nama_pasien string, penyakit_prediksi string, status_prediksi bool) {
	collection := getCollection(client, COLLECTION_HASIL_PREDIKSI)

	document := bson.D{
		{"tanggal_prediksi", tanggal_prediksi},
		{"nama_pasien", nama_pasien},
		{"penyakit_prediksi", penyakit_prediksi},
		{"status_prediksi", status_prediksi}}

	result, _ := collection.InsertOne(context.TODO(), document)
	fmt.Println("Inserted document with id: ", result)
}

func deleteFromDatabase(client *mongo.Client, collectionName string, id primitive.ObjectID) {
	if collectionName == COLLECTION_HASIL_PREDIKSI {
		collection := getCollection(client, COLLECTION_HASIL_PREDIKSI)
		_, err := collection.DeleteOne(context.Background(), bson.M{"_id": id})
		if err != nil {
			log.Fatal(err)
		}
	} else if collectionName == COLLECTION_JENIS_PENYAKIT {
		collection := getCollection(client, COLLECTION_JENIS_PENYAKIT)
		_, err := collection.DeleteOne(context.Background(), bson.M{"_id": id})
		if err != nil {
			log.Fatal(err)
		}
	}
}

/* GET HASIL PREDIKSI */
func getHasilPrediksibyTanggal(client *mongo.Client, ctx context.Context, tanggal_prediksi primitive.DateTime) []bson.M {
	var resultList []bson.M
	collection := getCollection(client, COLLECTION_HASIL_PREDIKSI)
	cursor, err := collection.Find(context.TODO(), bson.M{"tanggal_prediksi": tanggal_prediksi})
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

func getHasilPrediksibyNama(client *mongo.Client, ctx context.Context, nama_pasien string) []bson.M {
	var resultList []bson.M
	collection := getCollection(client, COLLECTION_HASIL_PREDIKSI)
	cursor, err := collection.Find(context.TODO(), bson.M{"nama_pasien": nama_pasien})
	if err != nil {
		fmt.Println("Cannot find using nama_pasien")
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

func getHasilPrediksibyPenyakit(client *mongo.Client, ctx context.Context, penyakit_prediksi string) []bson.M {
	var resultList []bson.M
	collection := getCollection(client, COLLECTION_HASIL_PREDIKSI)
	cursor, err := collection.Find(context.TODO(), bson.M{"penyakit_prediksi": penyakit_prediksi})
	if err != nil {
		fmt.Println("Cannot find using penyakit_prediksi")
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

func getHasilPrediksibyStatus(client *mongo.Client, ctx context.Context, status_prediksi bool) []bson.M {
	var resultList []bson.M
	collection := getCollection(client, COLLECTION_HASIL_PREDIKSI)
	cursor, err := collection.Find(context.TODO(), bson.M{"status_prediksi": status_prediksi})
	if err != nil {
		fmt.Println("Cannot find using status_prediksi")
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

/* GET JENIS PENYAKIT */
func getJenisPenyakitbyNama(client *mongo.Client, ctx context.Context, nama_penyakit string) []bson.M {
	var resultList []bson.M
	collection := getCollection(client, COLLECTION_JENIS_PENYAKIT)
	cursor, err := collection.Find(context.TODO(), bson.M{"nama_penyakit": nama_penyakit})
	if err != nil {
		fmt.Println("Cannot find using nama_penyakit")
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

func getJenisPenyakitbyRantaiDNA(client *mongo.Client, ctx context.Context, rantai_dna string) []bson.M {
	var resultList []bson.M
	collection := getCollection(client, COLLECTION_JENIS_PENYAKIT)
	cursor, err := collection.Find(context.TODO(), bson.M{"rantai_dna": rantai_dna})
	if err != nil {
		fmt.Println("Cannot find using rantai_dna")
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
