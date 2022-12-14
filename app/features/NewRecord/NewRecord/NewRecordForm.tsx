import { clampMax, inputClasses, labelClasses, normalizeValue } from '~/utils'
import { Form } from 'remix-forms'
import { newRecordSchema } from '../schemas'
import { setCaretAtEnd } from '../utils'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import endOfToday from 'date-fns/endOfToday'
import formatISO from 'date-fns/formatISO'
import ReactDatePicker from 'react-datepicker'

const today = endOfToday()

const NewRecordForm = (): JSX.Element => {
  const { userId } = useLoaderData<{ userId: string }>()
  const [installmentValue, setInstallmentValue] = useState<string>('')
  const [dueDate, setDueDate] = useState<Date>(today)
  const [installments, setInstallments] = useState<number>(1)

  return (
    <Form
      className='flex flex-col gap-2'
      schema={newRecordSchema}
    >
      {({ Field, Errors, Button, register, reset }) => (
        <>
          <Field name='userId' type='hidden' value={userId} />
          <Field
            name='clientName'
            label='Cliente'
            placeholder='Nome do cliente'
            type='text'
            className='form-control'
          >
            {({ label, SmartInput, Errors, errors }) => {
              return (
                <>
                  <label className='label'>
                    <span className={labelClasses(errors)}>
                      {label}
                    </span>
                  </label>
                  <SmartInput className={inputClasses(errors)} />
                  <Errors className='px-1 mt-1 text-xs text-error' />
                </>
              )
            }}
          </Field>
          <div className='grid grid-cols-2 gap-2'>
            <Field
              name='value'
              label='Valor a ser pago'
              className='form-control'
              placeholder='R$ 0,00'
              inputMode='numeric'
            >
              {({ label, Errors, errors }) => {
                return (
                  <>
                    <label className='label'>
                      <span className={labelClasses(errors)}>
                        {label}
                      </span>
                    </label>
                    <input
                      {...register('value')}
                      className={inputClasses(errors, 'text-end')}
                      onClick={setCaretAtEnd}
                      onFocus={setCaretAtEnd}
                      onInput={({ currentTarget }) => {
                        setInstallmentValue(normalizeValue(currentTarget.value))
                      }}
                      value={installmentValue}
                    />
                    <Errors className='px-1 mt-1 text-xs text-error' />
                  </>
                )
              }}
            </Field>
            <Field
              name='dueDate'
              label='Data do pagamento'
              className='form-control'
              type='date'
            >
              {({ label, Errors, errors, ref }) => {
                return (
                  <>
                    <label className='label'>
                      <span className={labelClasses(errors)}>
                        {label}
                      </span>
                    </label>
                    <input
                      {...register('dueDate')}
                      defaultValue={undefined}
                      type='hidden'
                      value={formatISO(dueDate, { representation: 'date' })}
                    />
                    <ReactDatePicker
                      className={inputClasses(errors, 'text-center')}
                      dateFormat='dd/MM/yyyy'
                      fixedHeight
                      locale='pt-BR'
                      minDate={today}
                      onChange={(newDate) => { setDueDate(newDate ?? today) }}
                      onSelect={(newDate) => { setDueDate(newDate ?? today) }}
                      selected={dueDate}
                      todayButton='Hoje'
                      withPortal
                    />
                    <Errors className='px-1 mt-1 text-xs text-error' />
                  </>
                )
              }}
            </Field>
          </div>
          <Field
            name='installments'
            label='Dividir em'
            className='flex-row justify-center form-control'
            type='number'
          >
            {({ label, Errors, Input, errors }) => {
              return (
                <>
                  <label className='label'>
                    <span className={`${labelClasses(errors)} text-info`}>
                      {label}
                    </span>
                  </label>
                  <Input
                    {...register('installments')}
                    className={`${inputClasses(errors, 'text-center')} max-w-[6ch] mx-2 flex-shrink`}
                    min={1}
                    onInput={({ currentTarget }) => {
                      setInstallments(clampMax(Number.parseInt(currentTarget.value), 999))
                    }}
                    value={installments}
                    defaultValue={undefined}
                  />
                  <label className='label'>
                    <span className={`${labelClasses(errors)} text-info`}>
                      parcelas
                    </span>
                  </label>
                  <Errors className='px-1 mt-1 text-xs text-error' />
                </>
              )
            }}
          </Field>
          <Errors className='px-1 mt-1 text-xs text-error' />
          <Button className='btn btn-sm btn-success'>
            Incluir registro
          </Button>
          <button
            className='btn btn-sm btn-warning btn-outline'
            onClick={() => {
              setInstallmentValue('')
              setDueDate(today)
              reset()
            }}
            type='reset'
          >
            Limpar
          </button>
        </>
      )}
    </Form>
  )
}

export default NewRecordForm
