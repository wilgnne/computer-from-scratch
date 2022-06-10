export const regex =
  /^[\t ]*(?:([.A-Za-z]\w*)[:])?(?:[\t ]*([A-Za-z]{2,4})(?:[\t ]+(\[(\w+((\+|-)\d+)?)\]|".+?"|'.+?'|[.A-Za-z0-9]\w*)(?:[\t ]*[,][\t ]*(\[(\w+((\+|-)\d+)?)\]|".+?"|'.+?'|[.A-Za-z0-9]\w*))?)?)?/;

export const RegexGroup = {
  Label: 1,
  Mnemonic: 2,
  Operand1: 3,
  Operand2: 7,
};
