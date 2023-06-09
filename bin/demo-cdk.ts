#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DemoCdkStack } from "../lib/demo-cdk-stack";
import { CdkStarterStack } from "../lib/cdk-starter-stack";
import { Parameter } from "../lib/ssm-stack";
import { CdkWorkshopStack } from "../lib/cdk-workshop-stack";
import { EcrAsset } from "../lib/ecr";

const app = new cdk.App();
// new DemoCdkStack(app, 'DemoCdkStack', {
//   /* If you don't specify 'env', this stack will be environment-agnostic.
//    * Account/Region-dependent features and context lookups will not work,
//    * but a single synthesized template can be deployed anywhere. */

//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//   env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-2' },

//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */
//   // env: { account: '123456789012', region: 'us-east-1' },

//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });

// new CdkStarterStack(app, 'DemoLL', {
//   env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-2' },
// })

// new Parameter(app, "Parameter", {
//   env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-2" },
// });

// new CdkWorkshopStack(app, "HitCounterStack", {
//   env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-2" },
// });

new EcrAsset(app, "ecr", {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-2" },
});
