import { DebtsApi } from '.'
import { redirect } from '@remix-run/node'

const removeDebt = async (debtId: string): Promise<Response | null> => {
  const clientRemoved = await DebtsApi.remove(debtId)

  if (clientRemoved) return redirect('summary/clients')
  return null
}

export const processRequest = async (request: Request): Promise<Response | null> => {
  const formData = await request.formData()

  const action = formData.get('_action') as string
  const debtId = formData.get('debtId') as string

  switch (action) {
    case 'delete':
      return await removeDebt(debtId)
    case 'markAsPaid':
      await DebtsApi.markAsPaid(debtId)
      return null
    default:
      return null
  }
}
