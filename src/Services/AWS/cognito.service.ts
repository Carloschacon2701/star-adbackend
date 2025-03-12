// auth.service.ts
import { Inject, Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { AwsConfig } from 'src/Services/AWS/aws.config';

@Injectable()
export class CognitoService {
  constructor(
    @Inject('AWS_COGNITO_CLIENT')
    private cognitoClient: CognitoIdentityProviderClient,
    private awsConfig: AwsConfig,
  ) {}

  async signUp(email: string, password: string) {
    const command = new SignUpCommand({
      ClientId: this.awsConfig.cognitoClientId,
      Username: email,
      Password: password,
      UserAttributes: [{ Name: 'email', Value: email }],
    });
    return this.cognitoClient.send(command);
  }

  async confirmSignUp(email: string, confirmationCode: string) {
    const command = new ConfirmSignUpCommand({
      ClientId: this.awsConfig.cognitoClientId,
      Username: email,
      ConfirmationCode: confirmationCode,
    });
    return this.cognitoClient.send(command);
  }
}
