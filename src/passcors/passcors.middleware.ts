import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PasscorsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    // add some custom string to test
    res['custom'] = 'custom string';
    console.log('PasscorsMiddleware');
    console.log(res['custom']);
    // log header to test
    console.log(req.headers);
    next();
  }
}
