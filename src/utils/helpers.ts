export const getTime = (): string => {
  const now = new Date();
  const hours = now.getHours();

  return `(${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} - ${hours}:${now.getMinutes()}:${now.getSeconds()})`
}