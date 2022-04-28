// Valid DNA Pattern
export const ValidDNA = new RegExp (
  '^[ACGT]+$'  
);

export function dnaValidation(sequenceDna) {
  return (ValidDNA.test(sequenceDna));
}
