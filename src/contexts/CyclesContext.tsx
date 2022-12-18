import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { differenceInSeconds } from 'date-fns'
import { cyclesReducer } from '../reducers/cycles/reducer'
import {
  ActionTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCyclesAsFinishedAction,
} from '../reducers/cycles/actions'
import id from 'date-fns/esm/locale/id/index.js'

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CyclesContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  minutes: string
  seconds: string

  createNewCycle: (data: NewCycleFormData) => void
  interruptCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextData)

interface CyclesProviderProps {
  children: ReactNode
}

export function CyclesProvider({ children }: CyclesProviderProps) {
  const [CyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJson = localStorage.getItem(
        '@ignite-timer:cyclesState-1.0.0',
      )

      if (storedStateAsJson) {
        return JSON.parse(storedStateAsJson)
      }
    },
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(CyclesState)
    localStorage.setItem('@ignite-timer:cyclesState-1.0.0', stateJSON)
  }, [CyclesState])

  const { cycles, activeCycleId } = CyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  function createNewCycle(data: NewCycleFormData) {
    const id = Math.random().toString().substring(2)

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currenctSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          dispatch(markCurrentCyclesAsFinishedAction())

          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  const minutesAmount = Math.floor(currenctSeconds / 60)
  const secondsAmount = currenctSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [minutes, seconds, activeCycle])

  function interruptCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        createNewCycle,
        interruptCycle,
        activeCycle,
        minutes,
        seconds,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
