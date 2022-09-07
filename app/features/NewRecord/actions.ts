import { DebtsApi } from '../Debts'
import { formAction } from 'remix-forms'
import { makeDomainFunction } from 'remix-domains'
import { NewRecordSchemas } from '.'

const mutation = makeDomainFunction(NewRecordSchemas.newRecordSchema)(async (values) => {
  await DebtsApi.add(values)
  return values
})

export const processRequest = async (request: Request): Promise<Response> => {
  return await formAction({
    request,
    schema: NewRecordSchemas.newRecordSchema,
    mutation
  })
}
