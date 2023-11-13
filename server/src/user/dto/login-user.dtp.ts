import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginUserDto {
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
  password: string;
}
