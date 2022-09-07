import { Form } from 'remix-forms'
import { inputClasses, labelClasses, setCaretAtEnd } from '../utils'
import { newRecordSchema } from '../schemas'
import { normalizeValue } from '~/utils'
import { useState } from 'react'
import endOfToday from 'date-fns/endOfToday'
import formatISO from 'date-fns/formatISO'
import ReactDatePicker from 'react-datepicker'

const today = endOfToday()

const NewRecordForm = (): JSX.Element => {
  const [debtValue, setDebtValue] = useState<string>('')
  const [dueDate, setDueDate] = useState<Date>(today)

  return (
    <Form
      className='flex flex-col gap-2'
      schema={newRecordSchema}
    >
      {({ Field, Errors, Button, register, reset }) => (
        <>
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
              name='debtValue'
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
                      {...register('debtValue')}
                      className={inputClasses(errors, 'text-end')}
                      onClick={setCaretAtEnd}
                      onFocus={setCaretAtEnd}
                      onInput={({ currentTarget }) => {
                        setDebtValue(normalizeValue(currentTarget.value))
                      }}
                      value={debtValue}
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
          <Errors className='px-1 mt-1 text-xs text-error' />
          <Button className='btn btn-sm btn-success'>
            Incluir registro
          </Button>
          <button
            className='btn btn-sm btn-warning btn-outline'
            onClick={() => {
              setDebtValue('')
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
