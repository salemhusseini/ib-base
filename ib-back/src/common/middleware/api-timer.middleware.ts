import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class ApiTimerMiddleware implements NestMiddleware {
  private logger = new Logger('ApiTimerMiddleware');
  use(req: any, res: any, next: () => void) {
    console.time('Request-response time');
    this.logger.log('START - ApiTimerMiddleware');

    res.on('finish', () => {
      console.timeEnd('Request-response time');
      this.logger.log('END - ApiTimerMiddleware');
    });

    next();
  }
}
