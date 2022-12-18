import { useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styled'
import { HandPalm, Play } from 'phosphor-react'

import { CyclesContext } from '../../contexts/CyclesContext'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

export function Home() {
  const { createNewCycle, interruptCycle, activeCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, reset, watch } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}

/*
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo deve ser maior ou igual a 5')
    .max(60, 'O ciclo deve ser menor ou igual a 60'),
})

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm({
  resolver: zodResolver(newCycleValidationSchema),
})
*/
