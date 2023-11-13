import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
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
}
