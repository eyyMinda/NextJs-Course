export function transformObjToArr(data) {
  return Object.keys(data).map(key => ({
    id: key,
    username: data[key].username,
    volume: data[key].volume,
  }));
}
