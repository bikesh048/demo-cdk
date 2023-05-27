import * as path from "path";
import * as cdk from "aws-cdk-lib";
import * as ecr from "aws-cdk-lib/aws-ecr";
import { Construct } from "constructs";
import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";

import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import * as servicediscovery from "aws-cdk-lib/aws-servicediscovery";
import * as ecrdeploy from "cdk-ecr-deployment";

export class EcrAsset extends cdk.Stack {
  public readonly image: DockerImageAsset;
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const repository = new ecr.Repository(this, "Repository", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteImages: true,
    });
    repository.addLifecycleRule({ maxImageCount: 10 });

    const asset = new DockerImageAsset(this, "QA", {
      directory: path.join(__dirname, "../src/container"),
    });

    new cdk.CfnOutput(this, `${this.node.id}-imageuri`, {
      value: asset.imageUri,
      exportName: `${this.node.id}-imageuri`,
    });

    new ecrdeploy.ECRDeployment(this, "DeployDockerImage", {
      src: new ecrdeploy.DockerImageName(asset.imageUri),
      dest: new ecrdeploy.DockerImageName(repository.repositoryUri),
    });

    new cdk.CfnOutput(this, `${this.node.id}-imageuri`, {
      value: repository.repositoryName,
      exportName: `${this.node.id}-imageuri`,
    });
  }
}
