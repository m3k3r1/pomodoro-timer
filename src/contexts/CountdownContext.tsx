import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  useState,
  ReactNode,
  useReducer,
  useEffect,
} from 'react'
import {
  countdownFinished,
  countdownStarted,
  countdownStopped,
} from '../reducers/actions'
import { countdownReducer } from '../reducers/countdown'

export interface Countdown {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stopDate?: Date
  finishedDate?: Date
}

export interface StartCountdownData {
  task: string
  minutesAmount: number
}

export interface CountdownContextData {
  countdowns: Countdown[]
  activeCountdown: Countdown | undefined
  activeCountdownId: string | null
  countdownSecondsPassed: number
  finishCurrentCountdown: () => void
  updateSecondsPassed: (seconds: number) => void
  startCountdown: (data: StartCountdownData) => void
  stopCountdown: () => void
}

export const CountdownContext = createContext({} as CountdownContextData)

interface CountdownContextProviderProps {
  children: ReactNode
}

export function CountdownContextProvider({
  children,
}: CountdownContextProviderProps) {
  const [countdownsState, dispatch] = useReducer(
    countdownReducer,
    {
      countdowns: [],
      activeCountdownId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@pomodoro:cycles-state-1.0.0',
      )
      if (storedStateAsJSON) {
        const storedState = JSON.parse(storedStateAsJSON)
        return storedState
      }
    },
  )

  const { countdowns, activeCountdownId } = countdownsState
  const activeCountdown = countdowns.find(
    (countdown) => countdown.id === activeCountdownId,
  )

  const [countdownSecondsPassed, setCountdownSecondsPassed] = useState(() => {
    if (activeCountdown) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCountdown.startDate),
      )
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(countdownsState)

    localStorage.setItem('@pomodoro:cycles-state-1.0.0', stateJSON)
  }, [countdownsState])

  function updateSecondsPassed(seconds: number) {
    setCountdownSecondsPassed(seconds)
  }

  function finishCurrentCountdown() {
    dispatch(countdownFinished())
  }

  function startCountdown(data: StartCountdownData) {
    const newCountdown: Countdown = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(countdownStarted(newCountdown))
    setCountdownSecondsPassed(0)
  }

  function stopCountdown() {
    dispatch(countdownStopped())
  }
  return (
    <CountdownContext.Provider
      value={{
        countdowns,
        activeCountdown,
        activeCountdownId,
        countdownSecondsPassed,
        finishCurrentCountdown,
        updateSecondsPassed,
        startCountdown,
        stopCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
