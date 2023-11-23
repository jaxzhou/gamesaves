import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GameInfoDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: 'string',
  })
  icon: string;
}
