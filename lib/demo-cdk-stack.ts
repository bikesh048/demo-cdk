import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DemoCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 Create ACM Permission Policy
    const describeAcmCertificates = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          resources: ["arn:aws:acm:*:*:certificate/*"],
          actions: ["acm:DescribeCertificate"],
        }),
      ],
    });

    // 👇 Create Role
    const role = new iam.Role(this, "example-iam-role", {
      assumedBy: new iam.ServicePrincipal("apigateway.amazonaws.com"),
      description: "An example IAM role in AWS CDK",
      inlinePolicies: {
        DescribeACMCerts: describeAcmCertificates,
      },
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "AmazonAPIGatewayInvokeFullAccess"
        ),
      ],
    });

    new iam.Role(this, "Role", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      description: "shlbot role opensearch",
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaVPCAccessExecutionRole"
        ),
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });
  }
}
