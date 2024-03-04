import fs from "fs";

interface File {
  type: "file" | "dir";
  name: string;
}

/**
 * Fetches the list of files and directories in the specified directory.
 * @param dir - The directory path to fetch files and directories from.
 * @param baseDir - The base directory path.
 * @returns A promise that resolves to an array of File objects representing the files and directories in the specified directory.
 */
export const fetchDir = (dir: string, baseDir: string): Promise<File[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          files.map((file) => ({
            type: file.isDirectory() ? "dir" : "file",
            name: file.name,
            path: `${baseDir}/${file.name}`,
          })),
        );
      }
    });
  });
};

/**
 * Fetches the content of a file.
 *
 * @param file - The path to the file.
 * @returns A promise that resolves with the content of the file as a string.
 */
export const fetchFileContent = (file: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

/**
 * Saves the content to a file.
 *
 * @param file - The path of the file to save.
 * @param content - The content to write to the file.
 * @returns A promise that resolves when the file is successfully saved, or rejects with an error if there was a problem.
 */
export const saveFile = async (
  file: string,
  content: string,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, "utf8", (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};
