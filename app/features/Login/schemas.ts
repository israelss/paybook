import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'O email deve ser informado... ⚠️',
      invalid_type_error: 'O email deve ser válido... ❌'
    })
    .email({
      message: 'O email deve ser válido... 👀'
    }),
  password: z
    .string({
      required_error: 'A senha deve ser informada... ⚠️',
      invalid_type_error: 'A senha deve ser válida... ❌'
    })
    .min(6, {
      message: 'A senha deve ter pelo menos 6 caracteres... 👀'
    })
})
