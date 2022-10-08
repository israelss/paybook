import { ClientsApi } from '../Clients'
import { formAction } from 'remix-forms'
import { InstallmentsApi, InstallmentsUtils } from '../Installments'
import { makeDomainFunction } from 'remix-domains'
import { newRecordSchema } from './schemas'

const mutation = makeDomainFunction(newRecordSchema)(async (values) => {
  const clientId = await ClientsApi.getClientIdByName(values.clientName)

  const inputData = InstallmentsUtils.makeInputData({ data: values, clientId })

  await InstallmentsApi.add(inputData)

  return values
})

export const processRequest = async (request: Request): Promise<Response> => {
  return await formAction({
    request,
    schema: newRecordSchema,
    mutation
  })
}
