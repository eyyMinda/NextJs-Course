import fs from 'fs';
import path from 'path';

export const api = process.env.NEXT_PUBLIC_DB_URL;

export const getFilePath = (dirOrFilename = 'feedback.json', filename = '') => {
  if (filename === '') {
    filename = dirOrFilename;
    dirOrFilename = 'data';
  }
  return path.join(process.cwd(), dirOrFilename, filename);
};

export const getFileData = filePath => JSON.parse(fs.readFileSync(filePath));
