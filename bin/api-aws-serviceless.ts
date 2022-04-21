#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiAwsServicelessStack } from '../lib/api-aws-serviceless-stack';

const app = new cdk.App();
new ApiAwsServicelessStack(app, 'ApiAwsServicelessStack', {});