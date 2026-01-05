import type { PackedLayer } from '@bifravst/aws-cdk-lambda-helpers/layer'
import { App, type Environment } from 'aws-cdk-lib'
import { CDStack } from './CDStack.ts'
import { CoreStack } from './CoreStack.ts'
import type { CoreLambdas } from './lambdas.ts'

export class ProdApp extends App {
	constructor(args: {
		baseLayerSource: PackedLayer
		env: Environment
		repository: { owner: string; repo: string }
		gitHubOICDProviderArn: string
		version: string
		lambdaSources: CoreLambdas
	}) {
		super({
			context: {
				isTest: false,
				version: args.version,
			},
		})

		new CoreStack(this, {
			lambdaSources: args.lambdaSources,
			baseLayerSource: args.baseLayerSource,
		})

		// Continuous Deployment
		new CDStack(this, {
			repository: args.repository,
			gitHubOICDProviderArn: args.gitHubOICDProviderArn,
		})
	}
}
