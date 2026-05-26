import { UnauthorizedException } from '@nestjs/common';

type RequestLike = {
  headers?: {
    authorization?: string;
  };
};

export type GraphqlContext = {
  req?: RequestLike;
  token?: string;
};

export const getBearerToken = (authorization?: string): string | undefined => {
  const [scheme, token] = authorization?.split(' ') ?? [];

  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return undefined;
  }

  return token;
};

export const requireBearerToken = (context: GraphqlContext): string => {
  const token =
    context.token ?? getBearerToken(context.req?.headers?.authorization);

  if (!token) {
    throw new UnauthorizedException('Bearer token requerido');
  }

  return token;
};
