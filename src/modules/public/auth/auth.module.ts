import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TenantService } from '../tenant/tenant.service';
import { Tenant } from '../entities/tenant.entity';
import { UserRole } from '../../tenanted/entities/user-role.entity';
import { ConfigService } from '../../../config/config.service';

const configService = new ConfigService();
const dbConfig = configService.databaseConfig;
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tenant, UserRole]),
    PassportModule,
    JwtModule.register({
      secret: dbConfig.jwt_secret || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TenantService],
  exports: [AuthService],
})
export class AuthModule {}
