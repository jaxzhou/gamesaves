import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserInfoDto {
  @ApiProperty({
    type: 'number',
    required: true,
  })
  id: number;

  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  username: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  phone: string;
}