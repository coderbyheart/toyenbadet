import { ContinuousDeployment } from "@bifravst/ci"
import { type App, Stack } from "aws-cdk-lib"
import { CD_STACK_NAME } from "./stackNames.ts"

/**
 * Sets up the backend resources for continuous deployment
 */
export class CDStack extends Stack {
  constructor(
    parent: App,
    {
      repository,
      gitHubOICDProviderArn,
    }: {
      gitHubOICDProviderArn: string
      repository: { owner: string; repo: string }
    },
  ) {
    super(parent, CD_STACK_NAME, {
      description: "Sets up the backend resources for continuous deployment",
    })

    // Continuous Deployment
    new ContinuousDeployment(this, {
      repository,
      gitHubOICDProviderArn,
    })
  }
}
