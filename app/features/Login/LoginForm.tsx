import React from 'react'
import { Form } from 'remix-forms'
import { inputClasses, labelClasses } from '~/utils'
import { loginSchema } from './schemas'

const LoginForm = (): JSX.Element => {
  return (
    <Form className='flex flex-col gap-2' schema={loginSchema}>
      {({ Field, Errors, Button }) => (
        <>
          <Field
            className='form-control'
            label='Email'
            name='email'
            placeholder='seu@email.com'
            type='email'
          >
            {({ label, Input, Errors, errors }) => {
              return (
                <>
                  <label className='label'>
                    <span className={labelClasses(errors)}>
                      {label}
                    </span>
                  </label>
                  <Input className={inputClasses(errors)} autoComplete='email' />
                  <Errors className='px-1 mt-1 text-xs text-error' />
                </>
              )
            }}
          </Field>
          <Field
            className='form-control'
            label='Senha'
            name='password'
            type='password'
          >
            {({ label, Input, Errors, errors }) => {
              return (
                <>
                  <label className='label'>
                    <span className={labelClasses(errors)}>
                      {label}
                    </span>
                  </label>
                  <Input className={inputClasses(errors)} autoComplete='current-password' />
                  <Errors className='px-1 mt-1 text-xs text-error' />
                </>
              )
            }}
          </Field>
          <Errors className='px-1 mt-1 text-xs text-error' />
          <Button className='btn btn-sm btn-success'>
            Login / Cadastro
          </Button>
        </>
      )}
    </Form>
  )
}

export default LoginForm
