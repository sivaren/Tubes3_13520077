// VALIDATION SEARCH FORMAT W/ REGEX
// FORMAT 1:
// DD Bulan YYYY NamaPenyakit
export const SearchFormat1 = new RegExp (
    '^(0[1-9]|[12][0-9]|3[01]) (Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember) (19|20)\\d\\d [a-zA-Z0-9- ]+$'  
);

// FORMAT 2:
// DD Bulan YYYY
export const SearchFormat2 = new RegExp (
    '^(0[1-9]|[12][0-9]|3[01]) (Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember) (19|20)\\d\\d$'  
);

// FORMAT 3:
// NamaPenyakit
export const SearchFormat3 = new RegExp (
    '^[a-zA-Z0-9- ]+$'  
);

// Return boolean bounded w/ FORMAT1
export function searchValidation1(searchValue, data) {
    const isValid = SearchFormat1.test(searchValue);

    if(isValid) {
        // split stringContets to get date
        const stringContents = searchValue.split(' ');
        const date = stringContents[0] + ' ' + stringContents[1] + ' ' + stringContents[2];
        var disease = '';

        // get disease name
        for(let i = 3; i < stringContents.length; i++) {
            if(i === stringContents.length - 1) {
                disease += stringContents[i];
            }
            else {
                disease += stringContents[i] + ' ';
            }
        }

        if (data.tanggal_prediksi === date && data.penyakit_prediksi === disease) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}

// Return boolean bounded w/ FORMAT2
export function searchValidation2(searchValue, data) {
    const isValid = SearchFormat2.test(searchValue);

    if(isValid && data.tanggal_prediksi === searchValue) {
        return true;
    }
    return false;
}

// Return boolean bounded w/ FORMAT3
export function searchValidation3(searchValue, data) {
    const isValid = SearchFormat3.test(searchValue);

    if(isValid && (data.penyakit_prediksi).includes(searchValue)) {
        return true;
    }
    return false;
}
