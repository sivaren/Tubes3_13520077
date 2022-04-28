package libs

// Fungsi untuk menghitung nilai distance menggunakan algoritma Damerau–Levenshtein
func levenshteinDistance(text string, pattern string) int {
	rows := len(text) + 1
	cols := len(pattern) + 1
	matrix := make([][]int, rows)
	for i := 0; i < rows; i++ {
		matrix[i] = make([]int, cols)
	}

	for i := 1; i < cols; i++ {
		matrix[0][i] = i
	}

	for i := 1; i < rows; i++ {
		matrix[i][0] = i
	}

	for row := 1; row < rows; row++ {
		for col := 1; col < cols; col++ {
			var cost int
			if text[row-1] == pattern[col-1] {
				cost = 0
			} else {
				cost = 1
			}
			del := matrix[row-1][col] + 1
			ins := matrix[row][col-1] + 1
			subs := matrix[row-1][col-1] + cost

			matrix[row][col] = minimum(del, ins, subs)
		}
	}
	return matrix[rows-1][cols-1]
}

// Fungsi untuk mencari nilai persentase kemiripan antara string text dengan string pattern
func Score(text string, pattern string) float64 {
	distance := levenshteinDistance(text, pattern)
	distmax := float64(distance) / float64(findMax(len(text), len(pattern)))
	return float64(1.0 - distmax)
}
