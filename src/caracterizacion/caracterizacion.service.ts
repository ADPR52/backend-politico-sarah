import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { CreateCaracterizacionDto } from "./dto/create-caracterizacion.dto";
import { UpdateCaracterizacionDto } from "./dto/update-caracterizacion.dto";
import { hash, compare } from "bcrypt";
import { Caracterizacion } from "./entities/caracterizacion.entity";
import * as jwt from "jsonwebtoken";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Injectable()
export class CaracterizacionService {
  private jwtSecret: string = "secreto";

  constructor(
    @InjectRepository(Caracterizacion)
    private readonly caracterizacionesRepository: Repository<Caracterizacion>
  ) {}

  async create(createCaracterizacionDto: CreateCaracterizacionDto) {
    const existingUserByName = await this.caracterizacionesRepository.findOne({
      where: { usuario_name: createCaracterizacionDto.usuario_name },
    });

    if (existingUserByName) {
      throw new ConflictException(
        "El usuario ya existe. Intenta con otro nombre."
      );
    }
    const existingUserByDocument =
      await this.caracterizacionesRepository.findOne({
        where: { numero_documento: createCaracterizacionDto.numero_documento },
      });

    if (existingUserByDocument) {
      throw new ConflictException(
        "El número de documento ya está en uso. Intenta con otro número."
      );
    }
    createCaracterizacionDto.contrasena = await hash(
      createCaracterizacionDto.contrasena,
      10
    );

    const newUser = this.caracterizacionesRepository.create(
      createCaracterizacionDto
    );
    await this.caracterizacionesRepository.save(newUser);

    return "Usuario creado exitosamente";
  }

  async login(logingDto: { usuario_name: string; contrasena: string }) {
    const usuario = await this.caracterizacionesRepository.findOne({
      where: { usuario_name: logingDto.usuario_name },
    });

    if (!usuario) {
      throw new UnauthorizedException("El usuario no existe.");
    }

    if (usuario.activo === 2) {
      throw new UnauthorizedException("El usuario está inhabilitado.");
    }

    if (usuario.rol === 7) {
      throw new UnauthorizedException(
        "El usuario es un aliado, lo cual no le permite ingresar a la aplicación."
      );
    }

    const isMatch = await compare(logingDto.contrasena, usuario.contrasena);

    if (!isMatch) {
      throw new UnauthorizedException("Contraseña incorrecta.");
    }

    const token = this.generarToken(usuario);
    return { message: "Inicio de sesión exitoso", token };
  }

  private generarToken(usuario: Caracterizacion) {
    const payload = {
      numero_documento: usuario.numero_documento,
      usuario_name: usuario.usuario_name,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      rol: usuario.rol,
      correo: usuario.correo,
      admin: usuario.admin,
      campania: usuario.campania,
    };

    const token = jwt.sign(payload, this.jwtSecret, { expiresIn: "1h" });
    return token;
  }

  async findAll() {
    return this.caracterizacionesRepository.find({
      where: { activo: 1 },
    });
  }

  async findAllInactive() {
    return this.caracterizacionesRepository.find({
      where: { activo: 2 },
    });
  }

  async findByCampania(campaniaId: number) {
    const usuarios = await this.caracterizacionesRepository.find({
      where: { campania: campaniaId, activo: 1 },
    });

    if (usuarios.length === 0) {
      throw new NotFoundException(
        `No se encontraron usuarios en la campaña con ID ${campaniaId}`
      );
    }

    return usuarios;
  }

  async findInactiveUsersByCampania(campaniaId: number) {
    const usuariosInactivos = await this.caracterizacionesRepository.find({
      where: { campania: campaniaId, activo: 2 }, // Filtro por campaña e inactivos
    });
  
    if (usuariosInactivos.length === 0) {
      throw new NotFoundException(
        `No se encontraron usuarios inactivos en la campaña con ID ${campaniaId}`
      );
    }
  
    return usuariosInactivos;
  }
  

  async findOne(id: number) {
    const usuario = await this.caracterizacionesRepository.findOne({
      where: { numero_documento: id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario;
  }

  async update(id: number, updateCaracterizacionDto: UpdateCaracterizacionDto) {
    const usuario = await this.caracterizacionesRepository.findOne({
      where: { numero_documento: id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    Object.assign(usuario, updateCaracterizacionDto);

    await this.caracterizacionesRepository.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.caracterizacionesRepository.findOne({
      where: { numero_documento: id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    usuario.activo = 2;
    await this.caracterizacionesRepository.save(usuario);
  }

  async habilitar(id: number) {
    const usuario = await this.caracterizacionesRepository.findOne({
      where: { numero_documento: id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (usuario.activo === 1) {
      return { message: `El usuario con ID ${id} ya está habilitado` };
    }

    usuario.activo = 1;
    await this.caracterizacionesRepository.save(usuario);

    return { message: `Usuario con ID ${id} habilitado exitosamente` };
  }

  async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto) {
    const { currentPassword, newPassword } = updatePasswordDto;

    const usuario = await this.caracterizacionesRepository.findOne({
      where: { numero_documento: userId },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
    const isMatch = await compare(currentPassword, usuario.contrasena);
    if (!isMatch) {
      throw new UnauthorizedException("La contraseña actual es incorrecta.");
    }
    usuario.contrasena = await hash(newPassword, 10);
    await this.caracterizacionesRepository.save(usuario);
    return { message: "Contraseña actualizada exitosamente" };
  }
}
