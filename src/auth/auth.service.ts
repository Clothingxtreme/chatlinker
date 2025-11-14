import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already in use');
    const user = this.usersRepo.create({
      email: dto.email,
      fullName: dto.fullName,
      passwordHash: await argon2.hash(dto.password),
      role: Role.USER,
    });
    await this.usersRepo.save(user);
    return this.sign(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (!user || !(await argon2.verify(user.passwordHash, dto.password)))
      throw new UnauthorizedException('Invalid credentials');
    return this.sign(user);
  }

  private sign(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { token: this.jwt.sign(payload) };
  }
}
