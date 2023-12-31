import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSaveDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  game: string;
  
  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  filename: string;

  @ApiProperty({
    type: 'date',
  })
  update: Date;
}
