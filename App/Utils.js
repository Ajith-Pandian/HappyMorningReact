export function sortByKey(unordered) {
  const ordered = {};
  Object.keys(unordered).sort().forEach(key => (ordered[key] = unordered[key]));
  console.log(JSON.stringify(ordered));
  return ordered;
}

export function getRandomId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    let id = v.toString(16);
    return id;
  });
}

export function getTimeString(date) {
  let hours = date.getHours(),
    minutes = date.getMinutes();
  let isPM = hours >= 12;
  let isMidday = hours == 12;
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  hours = hours - (isPM && !isMidday ? 12 : 0);
  hours = hours >= 10 ? hours : "0" + hours;
  let time = [hours, minutes].join(":") + (isPM ? " PM" : " AM");
  return time;
}

export function contains(haystack, needle) {
  return !!~haystack.indexOf(needle);
}
