import { Type } from '@sinclair/typebox'

export const VisitorDataSchema = Type.Object(
	{
		datelong: Type.Integer({ minimum: 0, examples: [1767648229655] }),
		visitorsIn: Type.Integer({ minimum: 0, examples: [1005] }),
		visitorsOut: Type.Integer({ minimum: 0, examples: [954] }),
		capacityStatus: Type.String({ minLength: 1, examples: ['good'] }),
	},
	{ title: 'VisitorDataSchema' },
)
