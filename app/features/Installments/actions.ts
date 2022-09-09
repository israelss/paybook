import { InstallmentsApi } from '.'
import { redirect } from '@remix-run/node'

const removeInstallment = async (installmentId: string): Promise<Response | null> => {
  const clientRemoved = await InstallmentsApi.remove(installmentId)

  if (clientRemoved) return redirect('summary/clients')
  return null
}

export const processRequest = async (request: Request): Promise<Response | null> => {
  const formData = await request.formData()

  const action = formData.get('_action') as string
  const installmentId = formData.get('installmentId') as string

  switch (action) {
    case 'delete':
      return await removeInstallment(installmentId)
    case 'markAsPaid':
      await InstallmentsApi.markAsPaid(installmentId)
      return null
    default:
      return null
  }
}
