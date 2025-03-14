// auth.service.ts
import { Inject, Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { AwsConfig } from 'src/Services/AWS/aws.config';
import { CognitoJwtVerifier, JwtVerifier } from 'aws-jwt-verify';

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

  async verifyToken(token: string) {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: this.awsConfig.cognitoUserPoolId,
      clientId: this.awsConfig.cognitoClientId,
      tokenUse: this.awsConfig.tokenUse as 'id' | 'access',
    });

    const payload = await verifier.verify(token);
    console.log('Token is valid. Payload:', payload);
    return {
      user_id: payload?.['custom:id'],
    };
  }
}
