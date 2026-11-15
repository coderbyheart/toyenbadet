import { PackedLambdaFn } from "@bifravst/aws-cdk-lambda-helpers/cdk"
import { Duration } from "aws-cdk-lib"
import { Rule, Schedule } from "aws-cdk-lib/aws-events"
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets"
import { Construct } from "constructs"
import type { BaseLayerVersion } from "./BaseLayerVersion.ts"
import { type CoreLambdas } from "./lambdas.ts"

export class Core extends Construct {
  public readonly fetchVisitorsFn: PackedLambdaFn
  constructor(
    scope: Construct,
    {
      lambdaSources,
      baseLayer,
    }: {
      lambdaSources: CoreLambdas
      baseLayer: BaseLayerVersion
    },
  ) {
    super(scope, Core.name)

    this.fetchVisitorsFn = new PackedLambdaFn(this, "fetchVisitors", lambdaSources.fetchVisitors, {
      description: "Fetches visitor statistics",
      layers: [baseLayer.layerVersion],
      timeout: Duration.seconds(10),
    })

    new Rule(this, "fetchVisitorsSchedule", {
      schedule: Schedule.rate(Duration.minutes(5)),
      targets: [new LambdaFunction(this.fetchVisitorsFn.fn)],
    })
  }
}
