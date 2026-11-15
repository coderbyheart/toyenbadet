import { packLambdaFromPath, type PackedLambda } from "@bifravst/aws-cdk-lambda-helpers"
import { CORE_STACK_NAME } from "./stackNames.ts"

export type CoreLambdas = {
  fetchVisitors: PackedLambda
}

export const packLambdas = async (): Promise<CoreLambdas> => ({
  fetchVisitors: await packLambdaFromPath({
    id: `${CORE_STACK_NAME}-fetchVisitors`,
    sourceFilePath: "lambda/fetch-visitors.ts",
  }),
})
