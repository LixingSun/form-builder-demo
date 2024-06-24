export const toCamelCase = (str:string):string => {
  return str
    .replace(/[-_\s]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
    .replace(/^[A-Z]/, (match) => match.toLowerCase());
}
