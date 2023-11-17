import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Game } from './game.entity';
import { User } from './user.entity';

@Entity({})
export class Save {
  @PrimaryKey()
  id: number;

  @Property({
    nullable: false,
    type: 'varchar',
    length: 40,
  })
  filename: string;

  @Property({
    nullable: false,
    type: 'date',
    length: 40,
  })
  update: Date;

  @ManyToOne(() => User, { ref: true })
  user: Ref<User>;

  @ManyToOne(() => Game, { ref: true })
  game: Ref<Game>;

}
