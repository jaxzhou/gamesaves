import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({})
export class User {
  @PrimaryKey()
  id: number;

  @Property({
    nullable: false,
    type: 'varchar',
    length: 20,
    unique: true,
  })
  username: string;

  @Property({
    nullable: false,
    type: 'varchar',
    length: 20,
    unique: true,
  })
  phone: string;

  @Property({
    hidden: true,
    type: 'varchar',
    length: 32,
  })
  password: string;
}
