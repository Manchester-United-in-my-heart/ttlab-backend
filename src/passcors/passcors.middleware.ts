import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PasscorsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    next();
  }
}
