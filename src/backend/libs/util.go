package libs

// Menerima masukan i dan j berupa integer
// Mengembalikan nilai terkecil antara i dan j
func findMin(i int, j int) int {
	if i < j {
		return i
	} else {
		return j
	}
}

// Fungsi untuk mencari nilai maksimum dari antara 2 angka
func findMax(i int, j int) int {
	if i > j {
		return i
	} else {
		return j
	}
}

// Fungsi untuk mencari nilai minimum dari antara 3 angka
func minimum(a, b, c int) int {
	if a < b {
		if a < c {
			return a
		}
	} else {
		if b < c {
			return b
		}
	}
	return c
}
