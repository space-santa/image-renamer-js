import * as fs from 'fs';
import * as path from 'path';

export function rename(dirPath: string, oldName: string, newName: string) {
  fs.rename(
    path.join(dirPath, oldName),
    path.join(dirPath, newName),
    function (error) {
      if (error) {
        console.log(error);
      }
    }
  );
}

export function formatDate(date: Date): string {
  const YYYY = date.getFullYear();
  const MM = zeroPad(date.getMonth() + 1);
  const DD = zeroPad(date.getDate());
  const hh = zeroPad(date.getHours());
  const mm = zeroPad(date.getMinutes());
  const ss = zeroPad(date.getSeconds());

  return `${YYYY}-${MM}-${DD}_${hh}.${mm}.${ss}`;
}

function zeroPad(value: number): string {
  return `0${value}`.slice(-2);
}
