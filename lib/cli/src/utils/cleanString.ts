export default (string) => string
  .toLowerCase()
  // remove accents
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  // remove special chars
  .replace(/[^\w\s]/gi, '')
  .split(' ').join('_')
