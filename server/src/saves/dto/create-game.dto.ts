import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  name: string;

}
