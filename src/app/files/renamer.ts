import * as fs from 'fs';
import * as path from 'path';
import exifr from 'exifr';

export function rename(file: any, newName: string) {
  if (newName === 'bad file') {
    return;
  }

  const dirPath = path.dirname(file.path);

  fs.rename(
    path.join(dirPath, file.name),
    path.join(dirPath, newName),
    function (error) {
      if (error) {
        console.log(error);
      }
    }
  );
}

export function findNewName(file: File): Promise<string> {
  return exifr
    .parse(file)
    .then((output: any) => {
      return `${formatDate(output.DateTimeOriginal)}.jpg`;
    })
    .catch((error) => {
      return new Promise((resolve, reject) => {
        resolve(parseDateFromString(file.name));
      });
    });
}

function formatDate(date: Date): string {
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

function parseDateFromString(name: string): string {
  for (const pattern of patterns) {
    if (pattern && pattern.pattern.test(name)) {
      return pattern.func(name);
    }
  }
  return 'bad file';
}

const patterns = [
  {
    pattern: /\d\d\d\d:\d\d:\d\d \d\d:\d\d:\d\d\.jpg$/,
    func: (name: string): string => {
      return '';
    },
  },
  {
    pattern: /(IMG|VID)_\d{8}_\d{6}.(jpg|mp4)$/,
    func: (name: string): string => {
      return '';
    },
  },
  {
    pattern: /MTGA \d_\d\d_\d\d\d\d \d_\d\d_\d\d (am|pm|AM|PM).(png|mp4)$/,
    func: (name: string): string => {
      return '';
    },
  },
  ,
  {
    pattern: /^\d\d\d\d-\d\d-\d\d_(am|pm|AM|PM)-\d\d-\d\d-\d\d/,
    func: (name: string): string => {
      return '';
    },
  },
];
