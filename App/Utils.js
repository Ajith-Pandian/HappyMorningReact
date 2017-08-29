export function sortByKey(unordered) {
  const ordered = {};
  Object.keys(unordered).sort().forEach(key => (ordered[key] = unordered[key]));
  console.log(JSON.stringify(ordered));
  return ordered;
}

export function getRandomId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    let id = v.toString(16);
    return id;
  });
}
