import { Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login.input';

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
  login(input: LoginInput) {
    // Usuario fijo
    return {
      userId: 1,
      userName: input.userName,
      name: 'Jean Carlos Garcia',
      role: Role.ADMINISTRATOR,
      menuItems: [
        { name: 'Productos', description: 'Gestión de productos', redirectTo: 'products' },
        { name: 'Clientes', description: 'Gestión de clientes', redirectTo: 'customers' },
        { name: 'Otro', description: 'Otro menú', redirectTo: 'other' },
      ],
    };
  }
}