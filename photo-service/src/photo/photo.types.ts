import { ApiProperty } from "@nestjs/swagger";

export class PhotoUrlResponse {
  url: string;
}

export class PhotoInput {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}