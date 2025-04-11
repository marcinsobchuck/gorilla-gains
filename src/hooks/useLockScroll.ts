import { useEffect, useRef, useState } from "react"

type UseScrollLockOptions = {
  autoLock?: boolean
  lockTarget?: HTMLElement | string
}

type UseScrollLockReturn = {
  isLocked: boolean
  lock: () => void
  unlock: () => void
}

type OriginalStyle = {
  overflow: CSSStyleDeclaration["overflow"]
}

export function useScrollLock(options: UseScrollLockOptions = {}): UseScrollLockReturn {
  const { autoLock = true, lockTarget } = options
  const [isLocked, setIsLocked] = useState(false)
  const target = useRef<HTMLElement | null>(null)
  const originalStyle = useRef<OriginalStyle | null>(null)

  const lock = () => {
    if (target.current) {
      const { overflow } = target.current.style

      originalStyle.current = { overflow }

      target.current.style.overflow = "hidden"

      setIsLocked(true)
    }
  }

  const unlock = () => {
    if (target.current && originalStyle.current) {
      target.current.style.overflow = originalStyle.current.overflow
    }

    setIsLocked(false)
  }

  useEffect(() => {
    if (lockTarget) {
      target.current =
        typeof lockTarget === "string" ? document.querySelector(lockTarget) : lockTarget
    }

    if (!target.current) {
      target.current = document.body
    }

    if (autoLock) {
      lock()
    }

    return () => {
      unlock()
    }
  }, [autoLock, lockTarget])

  return { isLocked, lock, unlock }
}
