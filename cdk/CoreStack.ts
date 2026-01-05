import { type PackedLayer } from '@bifravst/aws-cdk-lambda-helpers/layer'
import { type App, Stack } from 'aws-cdk-lib'
import { BaseLayerVersion } from './BaseLayerVersion.ts'
import { Core } from './Core.ts'
import { type CoreLambdas } from './lambdas.ts'
import { CORE_STACK_NAME } from './stackNames.ts'

export class CoreStack extends Stack {
	constructor(
		parent: App,
		{
			lambdaSources,
			baseLayerSource,
		}: {
			lambdaSources: CoreLambdas
			baseLayerSource: PackedLayer
		},
	) {
		super(parent, CORE_STACK_NAME, {
			description: 'Provide visitor statistics for Toyenbadet',
		})

		const baseLayer = new BaseLayerVersion(this, baseLayerSource)

		new Core(this, {
			lambdaSources,
			baseLayer,
		})
	}
}
