import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/modules/prisma/service/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleAuthService {
  private readonly logger = new Logger(GoogleAuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async validateGoogleUser(googleUser: any) {
    try {
      let user = await this.prisma.user.findUnique({
        where: { email: googleUser.email },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            uuid: uuidv4(),
            email: googleUser.email,
            username: googleUser.name,
            avatar: googleUser.picture,
            provider: 'google',
            providerId: googleUser.providerId,
            password: 'test1488',
          },
        });
      }

      const payload = { uuid: user.uuid };
      const token = this.jwtService.sign(payload);

      return { user, token };
    } catch (error) {
      this.logger.error(`Login via google failed: ${error.message}`, error.stack);
      throw error;
    }
  }
}
