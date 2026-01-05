import { Value } from '@sinclair/typebox/value'
import assert from 'node:assert'
import { describe, it } from 'node:test'
import { VisitorDataSchema } from './VisitorDataSchema.ts'

void describe('VisitorDataSchema', () => {
	void it('should validate a response', () => {
		const visitorData = Value.Encode(VisitorDataSchema, {
			datelong: 1767648229655,
			visitorsIn: 1005,
			visitorsOut: 954,
			yearVisitors: 0,
			capacityStatus: 'good',
			totalRecords: 0,
			totalFilteredRecords: 0,
		})
		assert.ok(
			Value.Check(VisitorDataSchema, visitorData),
			'VisitorData should be valid',
		)
	})
})
