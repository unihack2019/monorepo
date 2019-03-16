function stripTechName(name) {
  return name.toLowerCase().replace(/-/g, '');
}

export default function icon(name) {
  return require('./devicons')[stripTechName(name)];
}
