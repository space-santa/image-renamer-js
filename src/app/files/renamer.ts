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

export async function findNewName(file: File): Promise<string> {
  try {
    const output = await exifr.parse(file);
    return `${formatDate(output.DateTimeOriginal)}.jpg`;
  } catch (error) {
    return await new Promise((resolve, reject) => {
      resolve(parseDateFromString(file.name));
    });
  }
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

export function parseDateFromString(name: string): string {
  for (const pattern of patterns) {
    if (pattern && pattern.pattern.test(name)) {
      return dateBitsToString(pattern.func(name));
    }
  }
  return 'bad file';
}

const patterns = [
  {
    pattern: /\d\d\d\d:\d\d:\d\d \d\d:\d\d:\d\d\.jpg$/,
    func: (name: string): DateBits => {
      return {
        year: name.substring(0, 4),
        month: name.substring(5, 7),
        day: name.substring(8, 10),
        hour: name.substring(11, 13),
        minute: name.substring(14, 16),
        second: name.substring(17, 19),
        extension: name.substring(20, 23),
      };
    },
  },
  {
    pattern: /(IMG|VID)_\d{8}_\d{6}.(jpg|mp4)$/,
    func: (name: string): DateBits => {
      return {
        year: name.substring(4, 8),
        month: name.substring(8, 10),
        day: name.substring(10, 12),
        hour: name.substring(13, 15),
        minute: name.substring(15, 17),
        second: name.substring(17, 19),
        extension: name.substring(20, 23),
      };
    },
  },
  {
    pattern:
      /MTGA \d\d?_\d\d?_\d\d\d\d \d\d?_\d\d?_\d\d? (am|pm|AM|PM).(png|mp4)$/,
    func: (name: string): DateBits => {
      const largeBits = name.split(' ');
      const dateBits = largeBits[1].split('_');
      const timeBits = largeBits[2].split('_');
      const extraBits = largeBits[3].split('.');
      const amPmBits = extraBits[0];
      const extension = extraBits[1];

      var hour = parseInt(timeBits[0]);

      if (amPmBits.toLowerCase() == 'pm') {
        hour = hour + 12;

        if (hour === 24) {
          hour = 0;
        }
      }

      return {
        year: dateBits[2],
        month: zeroPad(parseInt(dateBits[1])),
        day: zeroPad(parseInt(dateBits[0])),
        hour: zeroPad(hour),
        minute: zeroPad(parseInt(timeBits[1])),
        second: zeroPad(parseInt(timeBits[2])),
        extension: extension,
      };
    },
  },
  ,
  {
    pattern: /^\d\d\d\d-\d\d-\d\d_(am|pm|AM|PM)-\d\d-\d\d-\d\d/,
    func: (name: string): DateBits => {
      return {
        year: name.substring(0, 4),
        month: name.substring(6, 7),
        day: name.substring(9, 10),
        hour: name.substring(12, 13),
        minute: name.substring(15, 16),
        second: name.substring(18, 19),
        extension: name.substring(21, 23),
      };
    },
  },
];

interface DateBits {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  extension: string;
}

function dateBitsToString(bits: DateBits): string {
  return `${bits.year}-${bits.month}-${bits.day}_${bits.hour}.${bits.minute}.${bits.second}.${bits.extension}`;
}
