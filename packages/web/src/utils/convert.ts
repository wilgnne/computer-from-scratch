export function number2hex(num: number): string {
  const hex = Number(num).toString(16);
  if (hex.length < 2) return `0${hex}`;
  return hex;
}
