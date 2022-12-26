/* eslint-disable no-unused-vars */

import { Countdown } from '../contexts/CountdownContext'

export enum ActionTypes {
  COUNTDOWN_STARTED = 'COUNTDOWN_STARTED',
  COUNTDOWN_STOPPED = 'COUNTDOWN_STOPPED',
  COUNTDOWN_FINISHED = 'COUNTDOWN_FINISHED',
}

export function countdownStarted(newCountdown: Countdown) {
  return { type: ActionTypes.COUNTDOWN_STARTED, payload: newCountdown }
}

export function countdownStopped() {
  return { type: ActionTypes.COUNTDOWN_STOPPED }
}

export function countdownFinished() {
  return { type: ActionTypes.COUNTDOWN_FINISHED }
}
