import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';

export type JwtPayload = { id: string; email: string };

export class Auth {
  constructor(private readonly httpService: HttpService) {}

  verifyToken(token: string): Observable<JwtPayload> {
    return this.httpService
      .post('http://localhost:3001/me', {
        operationName: 'VerifyToken',
        query: `query {
                verifyToken(token: "${token}") {
                    id,
                    email,
                }
            }`,
      })
      .pipe(map((res: AxiosResponse<JwtPayload>) => res.data));
  }
}
