// aws.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsConfig } from './aws.config';
import { AwsS3Provider, AwsCognitoProvider } from './aws.providers';
import { CognitoService } from './cognito.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AwsConfig, AwsS3Provider, AwsCognitoProvider, CognitoService],
  exports: [CognitoService],
})
export class AwsModule {}
