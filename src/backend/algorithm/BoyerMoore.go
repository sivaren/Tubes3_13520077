package main

func findMin(i int, j int) int {
	if i < j {
		return i
	} else {
		return j
	}
}

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

func searchBoyerMoore(text string, pattern string) int {
	lastOccurrenceList := findLastOccurrence(pattern)
	n := len(text)
	m := len(pattern)
	i := m - 1

	if i > n-1 {
		return -1
	} else {
		j := m - 1
		for {
			if i > n-1 {
				break
			} else {
				if pattern[j] == text[i] {
					if j == 0 {
						return i
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
	return -1
}

/* func main() {
	var Pattern string
	var Text string
	Text = "ACTGCAGTTCAGAGTCA"
	Pattern = "AGTCA"
	println("Text:", Text)
	println("Pattern:", Pattern)
	pos := searchBoyerMoore(Text, Pattern)
	if pos == -1 {
		print("Pattern not found in Text")
	} else {
		print("Pattern found at position:", pos)
	}
}
*/
