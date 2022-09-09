import { ClientsApi } from '../Clients'
import { InstallmentsApi, InstallmentsUtils } from '../Installments'
import { formAction } from 'remix-forms'
import { makeDomainFunction } from 'remix-domains'
import { NewRecordSchemas } from '.'

const mutation = makeDomainFunction(NewRecordSchemas.newRecordSchema)(async (values) => {
  const clientId = await ClientsApi.getClientIdByName(values.clientName)
  const installments = InstallmentsUtils.findInstallmentsValues(values.installmentValue, values.installments)
  const installmentsData = InstallmentsUtils.makeInstallmentsData(values.dueDate, clientId, installments)

  await InstallmentsApi.add(installmentsData)

  return values
})

export const processRequest = async (request: Request): Promise<Response> => {
  return await formAction({
    request,
    schema: NewRecordSchemas.newRecordSchema,
    mutation
  })
}
