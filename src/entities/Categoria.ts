// src/entities/Categoria.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Produto } from './Produto.js';

@Entity('categorias')
export class Categoria {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false
  })
  nome!: string;

  @Column({
    type: 'text',
    nullable: true
  })
  descricao?: string;

  @CreateDateColumn({
    type: 'timestamp'
  })
  dataCriacao!: Date;

  @UpdateDateColumn({
    type: 'timestamp'
  })
  dataAtualizacao!: Date;

  @OneToMany(() => Produto, produto => produto.categoria)
  produtos!: Produto[];
}
