import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { UserInfoDto } from "../../user/dto/user-info.dto";
import { Game } from "../../database/entities/game.entity";
import { GameInfoDto } from "./game-info.dto";

export class SaveInfoDto {
  @IsString()
  @ApiProperty({
    type: GameInfoDto,
  })
  game: GameInfoDto;
  
  @ApiProperty({
    type: UserInfoDto,
  })
  user: UserInfoDto;

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