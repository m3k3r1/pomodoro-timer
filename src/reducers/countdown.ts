import { produce } from 'immer'
import { Countdown } from '../contexts/CountdownContext'
import { ActionTypes } from './actions'

interface CountdownState {
  countdowns: Countdown[]
  activeCountdownId: string | null
}

export function countdownReducer(state: CountdownState, action: any) {
  switch (action.type) {
    case ActionTypes.COUNTDOWN_STARTED:
      return produce(state, (draft) => {
        draft.countdowns.push(action.payload)
        draft.activeCountdownId = action.payload.id
      })

    case ActionTypes.COUNTDOWN_STOPPED: {
      const currectCountdownIndex = state.countdowns.findIndex(
        (countdown) => countdown.id === state.activeCountdownId,
      )

      if (currectCountdownIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.countdowns[currectCountdownIndex].stopDate = new Date()
        draft.activeCountdownId = null
      })
    }

    case ActionTypes.COUNTDOWN_FINISHED: {
      const currectCountdownIndex = state.countdowns.findIndex(
        (countdown) => countdown.id === state.activeCountdownId,
      )

      if (currectCountdownIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.countdowns[currectCountdownIndex].finishedDate = new Date()
        draft.activeCountdownId = null
      })
    }
    default:
      return state
  }
}
