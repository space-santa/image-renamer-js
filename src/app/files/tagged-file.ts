export interface TaggedFile {
  file: File;
  // The timestamp is in utc in the exif data.
  timestamp: Date;
}
