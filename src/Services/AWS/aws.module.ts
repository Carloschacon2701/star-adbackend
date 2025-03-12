// aws.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsConfig } from './aws.config';
import { AwsS3Provider, AwsCognitoProvider } from './aws.providers';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AwsConfig, AwsS3Provider, AwsCognitoProvider],
  exports: [AwsS3Provider, AwsCognitoProvider],
})
export class AwsModule {}
