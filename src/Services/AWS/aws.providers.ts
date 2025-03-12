// aws.providers.ts
import { S3Client } from '@aws-sdk/client-s3';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { AwsConfig } from './aws.config';

export const AwsS3Provider = {
  provide: 'AWS_S3_CLIENT',
  useFactory: (awsConfig: AwsConfig) =>
    new S3Client({
      region: awsConfig.region,
      credentials: awsConfig.credentials,
    }),
  inject: [AwsConfig],
};

export const AwsCognitoProvider = {
  provide: 'AWS_COGNITO_CLIENT',
  useFactory: (awsConfig: AwsConfig) =>
    new CognitoIdentityProviderClient({
      region: awsConfig.region,
      credentials: awsConfig.credentials,
    }),
  inject: [AwsConfig],
};
