import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Save } from './save.entity';

@Entity({})
export class Game {
  @PrimaryKey()
  id: number;

  @Property({
    nullable: false,
    type: 'varchar',
    length: 40,
    unique: true,
  })
  name: string;
  
  @Property({
    nullable: false,
    type: 'varchar',
    length: 40,
    unique: true,
  })
  icon: string;

  @OneToMany(() => Save, (save) => save.game)
  saves = new Collection<Save>(this);

}
