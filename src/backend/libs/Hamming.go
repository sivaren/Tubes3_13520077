package libs

func HammingDistance(text string, pattern string) float64 {
	var accuracy float64
	i := 0
	mismatch := 0

	for {
		if i < len(pattern) {
			break
		}

		if text[i] != pattern[i] {
			mismatch++
		}
		i++
	}

	accurateCount := len(pattern) - mismatch
	accuracy = float64(accurateCount) / float64(len(pattern))
	return accuracy
}
