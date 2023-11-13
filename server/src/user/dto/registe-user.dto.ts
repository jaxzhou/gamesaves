import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RegisteUserDto {
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

  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  password: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    required: true,
  })
  passwordRepeat: string;
}
