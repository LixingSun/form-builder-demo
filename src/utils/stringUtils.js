export function toCamelCase(str) {
  return str
    .replace(/[-_\s]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(/^[A-Z]/, (match) => match.toLowerCase());
}
