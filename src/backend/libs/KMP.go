package libs

// Menerima masukan pattern berupa string
// Mengembalikan ukuran terbesar prefix dari pattern[0..k] dan suffix dari pattern[1..K]
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

func KMPMatch(text string, pattern string) bool {
	N := len(text)
	M := len(pattern)
	i := 0
	j := 0
	borderList := BorderFunction(pattern)
	for i < N {
		if pattern[j] == text[i] {
			if j == M-1 {
				return true
			}
			i++
			j++
		} else if j > 0 {
			j = borderList[j-1]
		} else {
			i++
		}
	}
	return false
}
