import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { Tenant } from '../entities/tenant.entity';
import { SignInDto } from './dto/signin.dto';
import { RegisterDto } from './dto/register.dto';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    private readonly tenantService: TenantService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, roleId, tenantName } =
      registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    // Check if tenant name is already taken
    const existingTenant = await this.tenantRepository.findOne({
      where: { name: tenantName },
    });
    if (existingTenant) {
      throw new UnauthorizedException('Tenant name already exists');
    }

    // Create new tenant
    const tenant = await this.tenantService.create({
      name: tenantName,
    });
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = {
      email,
      hashedPassword,
      firstName,
      lastName,
      tenant: tenant,
    };

    const savedUser = await this.userRepository.save(user);

    return {
      message: 'User and tenant registered successfully',
      user: {
        savedUser,
        tenant,
      },
    };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    // Find user
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['tenant'],
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate token
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      tenantId: user.tenant.id,
      schemaName: user.tenant.schemaName,
    });

    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        tenant: {
          id: user.tenant.id,
          name: user.tenant.name,
          schemaName: user.tenant.schemaName,
        },
      },
    };
  }
}
