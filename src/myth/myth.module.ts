import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MythController } from './myth.controller';
import { MythService } from './myth.service';
import { Myth, MythSchema } from './schemas/myth.schema';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Myth.name, schema: MythSchema }]),

    JwtModule,
  ],
  controllers: [MythController],
  providers: [MythService, JwtStrategy],
  exports: [MongooseModule],
})
export class MythModule {}
