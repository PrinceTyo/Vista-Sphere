declare module "formidable-serverless" {
  import { IncomingMessage } from "http";

  export interface File {
    filepath: string;
    originalFilename?: string;
    mimetype?: string;
    size: number;
  }

  export interface Files {
    [key: string]: File | File[];
  }

  export interface Fields {
    [key: string]: any;
  }

  export type ParseCallback = (err: Error | null, fields: Fields, files: Files) => void;

  export interface FormidableOptions {
    multiples?: boolean;
  }

  export default class formidable {
    constructor(options?: FormidableOptions);
    parse(req: IncomingMessage, callback: ParseCallback): void;
  }
}
