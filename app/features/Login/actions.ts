import { formAction } from 'remix-forms'
import { loginSchema } from './schemas'
import { makeDomainFunction } from 'remix-domains'
import { UserApi } from '../User'
import bcrypt from 'bcryptjs'

const mutation = makeDomainFunction(loginSchema)(async (values) => {
  const user = await UserApi.find({ email: values.email })
  if (user === null) {
    const passwordHash = await bcrypt.hash(values.password, 8)
    const newUser = await UserApi.create({
      email: values.email,
      passwordHash
    })
    return newUser
  }

  const isValidPassword = await bcrypt.compare(values.password, user.passwordHash)

  if (!isValidPassword) throw new Error('Senha ou email incorretos')

  return user
})

export const processRequest = async (request: Request): Promise<Response> => {
  return await formAction({
    request,
    schema: loginSchema,
    mutation
  })
}
