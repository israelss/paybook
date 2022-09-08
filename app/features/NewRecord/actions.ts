import { ClientsApi } from '../Clients'
import { DebtsApi, DebtsUtils } from '../Debts'
import { formAction } from 'remix-forms'
import { makeDomainFunction } from 'remix-domains'
import { NewRecordSchemas } from '.'

const mutation = makeDomainFunction(NewRecordSchemas.newRecordSchema)(async (values) => {
  const clientId = await ClientsApi.getClientIdByName(values.clientName)
  const installments = DebtsUtils.findInstallmentsValues(values.debtValue, values.installments)
  const installmentsData = DebtsUtils.makeInstallmentsData(values.dueDate, clientId, installments)

  await DebtsApi.add(installmentsData)

  return values
})

export const processRequest = async (request: Request): Promise<Response> => {
  return await formAction({
    request,
    schema: NewRecordSchemas.newRecordSchema,
    mutation
  })
}
