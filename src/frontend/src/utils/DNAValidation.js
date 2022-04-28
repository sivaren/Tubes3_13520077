// VALIDATION DNA PATTERN W/ REGEX
// Valid DNA contains only ACGT
export const ValidDNA = new RegExp (
  '^[ACGT]+$'  
);

// DNA Validation bounded with ValidDNA
export function dnaValidation(sequenceDna) {
  return (ValidDNA.test(sequenceDna));
}
