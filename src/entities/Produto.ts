import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Categoria } from './Categoria.js';

@Entity('produtos')
export class Produto {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false
  })
  nome!: string;

  @Column({
    type: 'text',
    nullable: true
  })
  descricao?: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: {
      from: (value: string) => parseFloat(value),
      to: (value: number) => value.toString()
    }
  })
  preco!: number;

  @Column('integer', { nullable: false })
  estoque!: number;

  @CreateDateColumn({
    type: 'timestamp'
  })
  dataCriacao!: Date;

  @UpdateDateColumn({
    type: 'timestamp'
  })
  dataAtualizacao!: Date;

  @ManyToOne(() => Categoria, categoria => categoria.produtos, {
    nullable: false,
    onDelete: 'RESTRICT'
  })
  @JoinColumn({ name: 'categoriaId' })
  categoria!: Categoria;

  @Column({
    type: 'uuid',
    nullable: false
  })
  categoriaId!: string;
}
