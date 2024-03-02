import { Module } from '@nestjs/common';
import { SubscriptionService } from './service/subscription.service';
import { SubscriptionController } from './controller/subscription.controller';

@Module({
  imports: [],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
