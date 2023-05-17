import * as cdk from "aws-cdk-lib";
import * as ssm from 'aws-cdk-lib/aws-ssm'
import { Construct } from "constructs";
import { string } from "/opt/nodejs/yup-utils";


export class Parameter extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const tableName = new cdk.CfnParameter(this, 'tableName', {
    //   type: 'String',
    //   description: 'The name of the Dynamodb table',
    // });

    new ssm.StringParameter(this, 'Parameter', {
      allowedPattern: '.*',
      description: 'shlbot opensearch sharebot',
      parameterName: 'FooParameter',
      stringValue: 'Foo',
      tier: ssm.ParameterTier.STANDARD,
    });

    const stringValue = ssm.StringParameter.valueFromLookup(this, '/shl/sharebot/120');
    console.log('string ', stringValue)

    // const stringValuea = ssm.StringParameter.fromStringParameterAttributes(this, id, {
    //   parameterName: 'FooParameter',
    //   // 'version' can be specified but is optional.
    // }).stringValue;


    // new cdk.CfnOutput(this, `${this.node.id}-ssm`, {
    //   value: stringValue,
    //   exportName: `${this.node.id}-ssm`,
    // });

    new cdk.CfnOutput(this, `${this.node.id}-ssma`, {
      value: stringValue,
      exportName: `${this.node.id}-ssma`,
    });

    


    
  }
}