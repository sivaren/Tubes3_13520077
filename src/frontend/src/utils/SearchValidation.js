// Valid Search Format
export const SearchFormat1 = new RegExp (
    '^(0[1-9]|[12][0-9]|3[01]) (Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember) (19|20)\\d\\d [a-zA-Z0-9- ]+$'  
);

export function searchValidation(searchValue, data) {
    // 13 April 2020 
    // HIV
    const isValid = SearchFormat1.test(searchValue);

    if(isValid) {
        const stringContents = searchValue.split(' ');
        const date = stringContents[0] + ' ' + stringContents[1] + ' ' + stringContents[2];
        var disease = '';

        for(let i = 3; i < stringContents.length; i++) {
            if(i === stringContents.length - 1) {
                disease += stringContents[i];
            }
            else {
                disease += stringContents[i] + ' ';
            }
        }

        if (data.date === date && data.disease === disease) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}
