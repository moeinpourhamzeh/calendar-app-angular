
// Create an array with a range of numbers
export function getRange(start = 0, end = 0, length = end - start) {
  return Array.from({length}, (_, i) => i + start)
}
