import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Code, Function as LambdaFunction, Runtime} from 'aws-cdk-lib/aws-lambda'
import {join} from 'path';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { GenericTable } from './GenericTable';
export class ApiAwsServicelessStack extends Stack {
  
  private api = new RestApi(this, 'ApiAwsServiceless');
  private spaceTable = new GenericTable('ApiAwsServicelessTable', 'ApiAwsServicelessId', this)


  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const HelloLambda = new LambdaFunction(this, 'helloLambda', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
      handler: 'hello.main'
    });

    // hello api lambda integration:

    const helloLambdaIntegration = new LambdaIntegration(HelloLambda);
    const helloLambdaResource = this.api.root.addResource('hello');
    helloLambdaResource.addMethod('GET', helloLambdaIntegration);
  }
}
