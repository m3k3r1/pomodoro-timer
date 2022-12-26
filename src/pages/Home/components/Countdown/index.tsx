import { CountdownContainer, Separator } from './styles'
import { useContext, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CountdownContext } from '../../../../contexts/CountdownContext'

export function Countdown() {
  const {
    activeCountdown,
    activeCountdownId,
    finishCurrentCountdown,
    countdownSecondsPassed,
    updateSecondsPassed,
  } = useContext(CountdownContext)

  const activeCountdownTotalSeconds = activeCountdown
    ? activeCountdown.minutesAmount * 60
    : 0
  const activeCountdownCurrentSeconds = activeCountdown
    ? activeCountdownTotalSeconds - countdownSecondsPassed
    : 0

  const activeCountdownMinutes = Math.floor(activeCountdownCurrentSeconds / 60)
  const activeCountdownseconds = activeCountdownCurrentSeconds % 60

  const minutes = String(activeCountdownMinutes).padStart(2, '0')
  const seconds = String(activeCountdownseconds).padStart(2, '0')

  useEffect(() => {
    if (activeCountdown) {
      document.title = `${minutes}:${seconds} - ${activeCountdown.task}`
    }
  }, [minutes, seconds, activeCountdown])
  useEffect(() => {
    let interval: number

    if (activeCountdown) {
      interval = setInterval(() => {
        const secondsPassed = differenceInSeconds(
          new Date(),
          new Date(activeCountdown.startDate),
        )

        if (secondsPassed >= activeCountdownTotalSeconds) {
          finishCurrentCountdown()
          updateSecondsPassed(activeCountdownTotalSeconds)
          clearInterval(interval)
        } else {
          updateSecondsPassed(secondsPassed)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCountdown,
    activeCountdownTotalSeconds,
    activeCountdownId,
    finishCurrentCountdown,
    updateSecondsPassed,
  ])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator> : </Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
