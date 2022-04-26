package algorithm

func BorderFunction(pattern string) []int {
	N := len(pattern)
	var borderList = make([]int, N)
	i := 1
	j := 0
	borderList[0] = 0
	for i < N {
		if pattern[i] == pattern[j] {
			borderList[i] = j + 1
			i++
			j++
		} else if j > 0 {
			j = borderList[j-1]
		} else {
			borderList[i] = 0
			i++
		}
	}
	return borderList
}

func KMPMatch(text string, pattern string) int {
	N := len(text)
	M := len(pattern)
	i := 0
	j := 0
	borderList := BorderFunction(pattern)
	for i < N {
		if pattern[j] == text[i] {
			if j == M-1 {
				return i - M + 1
			}
			i++
			j++
		} else if j > 0 {
			j = borderList[j-1]
		} else {
			i++
		}
	}
	return -1
}

// Contoh Fungsi Main
// func main() {
// 	var Pattern string
// 	var Text string
// 	Text = "ACTGCAGTTCAGAGTCA"
// 	Pattern = "AGTCA"
// 	println("Text:", Text)
// 	println("Pattern:", Pattern)
// 	pos := KMPMatch(Text, Pattern)
// 	if pos == -1 {
// 		print("Pattern not found in Text")
// 	} else {
// 		print("Pattern found at position:", pos)
// 	}
// }
