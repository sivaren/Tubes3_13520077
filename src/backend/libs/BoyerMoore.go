package libs

// Menerima masukan pattern berupa string
// Mengembalikan indeks terbesar dalam pattern dari semua karakter yang ada
func findLastOccurrence(pattern string) []int {
	var lastOccurrence = make([]int, 128)

	i := 0
	for i < 128 {
		lastOccurrence[i] = -1
		i++
	}

	j := 0
	for j < len(pattern) {
		lastOccurrence[pattern[j]] = j
		j++
	}

	return lastOccurrence
}

// Melakukan pencocokan string pattern secara
//		algoritma Boyer-Moore (BM) terhadap text
// Mengembalikan true jika substring dari teks sesuai dengan pattern.
// 		Jika tidak sesuai akan mengembalikan false.

func SearchBoyerMoore(text string, pattern string) bool {
	lastOccurrenceList := findLastOccurrence(pattern)
	n := len(text)
	m := len(pattern)
	i := m - 1

	if i > n-1 {
		return false
	} else {
		j := m - 1
		for {
			if i > n-1 {
				break
			} else {
				if pattern[j] == text[i] {
					if j == 0 {
						return true
					} else {
						i--
						j--
					}
				} else {
					var lastOccurrence = lastOccurrenceList[text[i]]
					i = i + m - findMin(j, 1+lastOccurrence)
					j = m - 1
				}
			}
		}
	}
	return false
}
