export default function chunk(collection: any[], size: number = 2): any[][] {
  const result = []

  for (let x = 0; x < Math.ceil(collection.length / size); x += 1) {
    const start = x * size
    const end = start + size

    result.push(collection.slice(start, end))
  }

  return result
}
