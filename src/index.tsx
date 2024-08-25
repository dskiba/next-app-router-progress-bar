'use client'
import type {
  ReactNode,
} from 'react'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface PBTransitionProvider {
  start: () => void
  stop: () => void
}
const PBTransitionCtx = createContext<PBTransitionProvider | null>(
  null,
)

interface PBProgressProvider {
  progress: number
  isLoading: boolean
}
const PBProgressCtx = createContext<PBProgressProvider | null>(null)

const STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  COMPLETING: 'COMPLETING',
} as const
type Status = typeof STATUS[keyof typeof STATUS]

const DEFAULT_TIMEOUT = 200

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t)
}

function defaultUpdateProgress(currentProgress: number, easingFunction = easeOutExpo, maxProgress: number = 0.95): number {
  if (currentProgress >= maxProgress) {
    return maxProgress
  }

  const remainingProgress = maxProgress - currentProgress
  const increment = Math.min(remainingProgress, 0.1)
  const t = increment / remainingProgress
  const easedIncrement = easingFunction(t) * increment
  const newProgress = currentProgress + easedIncrement
  return Math.min(newProgress, maxProgress)
}

interface ProviderProps {
  updateProgress?: (progress: number) => number
  timeout?: number
  children: ReactNode
}
type ProgressInternal = (params: Omit<ProviderProps, 'children'>) => {
  loading: boolean
  start: () => void
  stop: () => void
  progress: number
}

const useProgressInternal: ProgressInternal = ({ updateProgress = defaultUpdateProgress, timeout = DEFAULT_TIMEOUT }) => {
  const [status, setStatus] = useState<Status>(STATUS.IDLE)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (status === STATUS.COMPLETING) {
      setProgress(1)
      timer = setTimeout(() => {
        setStatus(STATUS.IDLE)
        setProgress(0)
      }, timeout)
    }
    return () => clearTimeout(timer)
  }, [status])

  const handleStart = useCallback(() => {
    setStatus(STATUS.LOADING)
  }, [])

  const handleComplete = useCallback(() => {
    setStatus(STATUS.COMPLETING)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout

    const updater = (): void => {
      setProgress(oldProgress => updateProgress(oldProgress))
    }

    if (status === STATUS.LOADING) {
      timer = setInterval(updater, timeout)
    }

    return () => {
      clearInterval(timer)
    }
  }, [status])

  return { loading: status === STATUS.LOADING || status === STATUS.COMPLETING, start: handleStart, stop: handleComplete, progress }
}

export function PBProvider(props: ProviderProps): React.ReactNode {
  const progress = useProgressInternal({ timeout: props.timeout, updateProgress: props.updateProgress })
  const transitionValue = useMemo(() => ({ start: progress.start, stop: progress.stop }), [progress.start, progress.stop])
  const progressValue = useMemo(() => ({ progress: progress.progress, isLoading: progress.loading }), [progress.progress, progress.loading])
  return (
    <PBTransitionCtx.Provider value={transitionValue}>
      <PBProgressCtx.Provider value={progressValue}>
        {props.children}
      </PBProgressCtx.Provider>
    </PBTransitionCtx.Provider>
  )
}

export function usePBTransition(): PBTransitionProvider {
  const ctx = useContext(PBTransitionCtx)
  if (!ctx) {
    throw new Error('PBTransition not found. Make sure to use `PBProvider` before using the progress bar.')
  }
  return ctx
}

export function usePBProgress(): PBProgressProvider {
  const ctx = useContext(PBProgressCtx)
  if (!ctx) {
    throw new Error('PBProgress not found. Make sure to use `PBProvider` before using the progress bar.')
  }
  return ctx
}
