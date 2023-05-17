import * as cdk from "@aws-cdk/core";
import * as _lambda from "@aws-cdk/aws-lambda-python";


export class DemoLayers extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new _lambda.PythonLayerVersion(this, 'aws4authlayer', {
        entry: 'src/layers/aws4auth'
      })
   
  }
}