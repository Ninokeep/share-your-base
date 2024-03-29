import { IncomingHttpHeaders } from 'http';

export function extractTokenFromHeader(request: {
  headers: IncomingHttpHeaders;
}): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}
