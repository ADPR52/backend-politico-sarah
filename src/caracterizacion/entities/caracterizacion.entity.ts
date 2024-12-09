import { IsArray, IsInt } from "class-validator";
import { Entity, Column, PrimaryColumn, Unique } from "typeorm";

type Educacion = {
  lugar_estudio: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  titulo: string;
};

type Experiencia = {
  empresa: string;
  fecha_ingreso: Date;
  fecha_egreso: Date;
  cargo: string;
  referencia: string;
  municipio: number;
  estado: number;
  seudonimo: string;
  tiempo_laborado: string;
};

@Entity()
@Unique(["usuario_name"])
export class Caracterizacion {
  @PrimaryColumn()
  numero_documento: number = 0;

  @Column({ unique: true })
  usuario_name: string = "";

  @Column()
  tipo_documento: number = 0;

  @Column()
  nombre: string = "";

  @Column()
  apellidos: string = "";

  @Column()
  fecha_nacimiento: Date = new Date();

  @Column()
  edad: number = 0;

  @Column()
  correo: string = "";

  @Column()
  departamento: number = 0;

  @Column()
  municipio: number = 0;

  @Column()
  direccion: string = "";

  @Column()
  telefono: string = "";

  @Column()
  comuna: string = "";

  @Column()
  mesa: string = "";

  @Column()
  puesto: string = "";

  @Column()
  campania: number = 0;

  @Column()
  rol: number = 0;

  @Column()
  interes_politico: number = 0;

  @Column()
  nivel_participacion: number = 0;

  @Column("simple-array")
  @IsArray()
  @IsInt({ each: true })
  habilidades: number[] | undefined;

  @Column()
  red_contactos: number = 0;

  @Column()
  motivos_personales: number = 0;

  @Column()
  lugar_intervencion_social: number = 0;

  @Column()
  competencias_tecnicas: number = 0;

  @Column()
  competencias_interpersonales: number = 0;

  @Column()
  competencias_organizacionales: number = 0;

  @Column()
  competencias_digitales: number = 0;

  @Column()
  titulo: string = "";

  @Column("json", { default: [] })
  educacion!: Educacion[];

  @Column("json", { default: [] })
  experiencia_laboral!: Experiencia[];

  @Column("json", { default: [] })
  idioma: any[] = [];

  @Column()
  experiencia_exitos: string = "";

  @Column()
  contrasena: string = "";

  @Column()
  doc_create: number = 0;

  @Column()
  activo: number = 1;

  @Column()
  admin: number = 0;

  @Column()
  subcampania: number = 0;
}
