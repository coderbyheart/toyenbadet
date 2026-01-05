import { MetricUnit, Metrics } from '@aws-lambda-powertools/metrics'
import { logMetrics } from '@aws-lambda-powertools/metrics/middleware'
import middy from '@middy/core'
import { Value } from '@sinclair/typebox/value'
import { VisitorDataSchema } from '../web.datanova.com/VisitorDataSchema.ts'

const metrics = new Metrics({
	namespace: 'toyenbadet',
	serviceName: 'visitors',
})

export const handler = middy<void, void>()
	.use(logMetrics(metrics))
	.handler(async (event, context) => {
		const res = await fetch(
			'https://web.datanova.com/OslobadeneERPTicketMonitor?handler=VisitorData&shopNo=12',
		)

		if (!res.ok)
			throw new Error(
				`Failed to fetch visitor stats: ${res.status} ${res.statusText}`,
			)

		const body = await res.json()
		console.log(JSON.stringify(body, null, 2))
		if (!Value.Check(VisitorDataSchema, body))
			throw new Error('Invalid visitor stats data')
		const data = Value.Decode(VisitorDataSchema, body)
		const occupancy = data.visitorsIn - data.visitorsOut
		console.log('occupancy', occupancy)
		metrics.addMetric('occupancy', MetricUnit.Count, occupancy)
	})
