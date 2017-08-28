export function sortByKey(unordered) {
  const ordered = {};
  Object.keys(unordered).sort().forEach(key => (ordered[key] = unordered[key]));
  console.log(JSON.stringify(ordered));
  return ordered;
}
