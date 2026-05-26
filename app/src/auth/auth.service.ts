import { Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { LoginOutput } from './dto/login.output';

export enum Role {
  ADMINISTRATOR = 'ADMIN',
  STORE = 'STORE',
  SALES = 'SALES',
}

export type MenuItem = {
  name: string;
  description: string;
  redirectTo: string;
};

@Injectable()
export class AuthService {
  private readonly baseUrl =
    process.env.CUSTOMER_API_BASE_URL ?? 'https://my-star-services.onrender.com';

  async login(input: LoginInput): Promise<LoginOutput> {
    const response = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: input.userName,
        password: input.password,
      }),
    });

    const body = (await response.json()) as {
      token?: string;
      success?: boolean;
      message?: string;
    };

    if (!response.ok || !body.success || !body.token) {
      return {
        success: false,
        message: body.message ?? 'No se pudo autenticar con el servicio',
        menuItems: [],
      };
    }

    const userInfo = await this.getUserInfo(input.userName, body.token);

    return {
      success: true,
      token: body.token,
      ...userInfo,
    };
  }

  private async getUserInfo(
    userName: string,
    _token: string,
  ): Promise<Omit<LoginOutput, 'success' | 'token' | 'message'>> {
    // Este método queda como punto de integración para un futuro endpoint tipo
    // GET /api/users/me o GET /api/auth/me que use el token emitido por login.
    return {
      userId: 1,
      userName,
      firstName: 'Jean Carlos',
      lastName: 'Garcia Changano',
      role: Role.ADMINISTRATOR,
      menuItems: [
        {
          name: 'Productos',
          description: 'Gestión de productos',
          redirectTo: 'products',
        },
        {
          name: 'Clientes',
          description: 'Gestión de clientes',
          redirectTo: 'customers',
        },
        { name: 'Otro', description: 'Otro menú', redirectTo: 'other' },
      ],
    };
  }
}
