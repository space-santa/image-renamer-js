export function formatDate(date: Date) {
  return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(
    date.getDate()
  )}_${zeroPad(date.getHours())}.${zeroPad(date.getMinutes())}.${zeroPad(
    date.getSeconds()
  )}`;
}

function zeroPad(value: number): string {
  return `0${value}`.slice(-2);
}
