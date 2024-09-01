import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "courses" })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: "text" })
  name: string;

  @Column({ type: "text" })
  cover: string;

  @Column({ type: "text" })
  description: string;

  @Column({ default: false, type: "boolean" })
  active: boolean;
}
