import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CountdownContext } from '../../../../contexts/CountdownContext'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export function NewCountdownForm() {
  const { activeCountdown } = useContext(CountdownContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">I am working on</label>
      <TaskInput
        id="task"
        disabled={!!activeCountdown}
        placeholder="Insert your task"
        {...register('task')}
      />
      <label htmlFor="minutesAmount">during</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCountdown}
        placeholder="00"
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutes.</span>
    </FormContainer>
  )
}
