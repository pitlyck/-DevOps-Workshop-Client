export type FilesUploadResponse = FileMetadata[];

export interface FileMetadata {
  id: string;
  name: string;
  extension: string;
  createdBy: string;
  filesize: number;
}


