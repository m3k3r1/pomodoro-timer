import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { NewCountdownForm } from './components/NewCountdownForm'
import { Countdown as CountdownComponent } from './components/Countdown'
import { CountdownContext } from '../../contexts/CountdownContext'
import { useContext } from 'react'

const countdownValidationSchema = zod.object({
  task: zod.string().min(1, 'Insert task'),
  minutesAmount: zod
    .number()
    .min(1, 'The cycle needs to last at least 5 minutes')
    .max(60, 'The cycle can not last more than 60 minutes'),
})

type CountdownFormData = zod.infer<typeof countdownValidationSchema>

export function Home() {
  const { activeCountdown, startCountdown, stopCountdown } =
    useContext(CountdownContext)
  const newCountdownForm = useForm<CountdownFormData>({
    resolver: zodResolver(countdownValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCountdownForm
  const isSubmitDisabled = !watch('task')

  function handleStartCountdown(data: CountdownFormData) {
    startCountdown(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleStartCountdown)} action="">
        <FormProvider {...newCountdownForm}>
          <NewCountdownForm />
        </FormProvider>
        <CountdownComponent />

        {activeCountdown ? (
          <StopCountdownButton type="button" onClick={stopCountdown}>
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
