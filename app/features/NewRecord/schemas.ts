import { extractFromCurrency } from '~/utils'
import { z } from 'zod'

export const newRecordSchema = z.object({
  userId: z.string(),
  dueDate: z
    .date({
      required_error: 'A data deve ser selecionada... ⚠️',
      invalid_type_error: 'A data deve ser uma data válida... ❌'
    }),
  installments: z
    .number({
      required_error: 'O número de parcelas deve ser definido... ⚠️',
      invalid_type_error: 'O número de parcelas deve ser um número... ❌'
    })
    .min(1, {
      message: 'O número de parcelas deve ser pelo menos 1 👀'
    })
    .default(1),
  clientName: z
    .string({
      required_error: 'O nome do cliente deve ser preenchido... ⚠️',
      invalid_type_error: 'O nome do cliente deve ser uma string válida ❌'
    })
    .min(1, {
      message: 'O nome do cliente deve ter pelo menos 1 letra 👀'
    }),
  value: z
    .string({
      required_error: 'O valor deve ser preenchido... ⚠️'
    })
    .superRefine((val, ctx) => {
      if (isNaN(extractFromCurrency(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          message: 'O valor deve ser um número... ❌',
          expected: 'number',
          received: 'nan'
        })
      }

      if (extractFromCurrency(val) < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          message: 'O valor não pode ser menor que 0,01 👀',
          inclusive: true,
          minimum: 1,
          type: 'number'
        })
      }

      if (extractFromCurrency(val) > 99999999) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          message: 'O valor não pode ser maior que 999.999,99 👀',
          inclusive: true,
          maximum: 99999999,
          type: 'number'
        })
      }
    })
})
