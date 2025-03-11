"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

type ToastProps = {
  id?: string | number
  title?: string
  description?: string
  action?: React.ReactNode
  duration?: number
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([])
  const toastTimeoutsRef = useRef<Map<string | number, NodeJS.Timeout>>(new Map())

  useEffect(() => {
    return () => {
      toastTimeoutsRef.current.forEach((timeout) => {
        clearTimeout(timeout)
      })
      toastTimeoutsRef.current.clear()
    }
  }, [])

  function toast({ ...props }: ToastProps) {
    const id = props.id || Date.now()
    const newToast = { ...props, id }

    setToasts((prevToasts) => [...prevToasts, newToast])

    if (props.duration !== Number.POSITIVE_INFINITY) {
      const timeout = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
        toastTimeoutsRef.current.delete(id)
      }, props.duration || 3000)

      toastTimeoutsRef.current.set(id, timeout)
    }

    return {
      id,
      dismiss: () => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
        if (toastTimeoutsRef.current.has(id)) {
          clearTimeout(toastTimeoutsRef.current.get(id))
          toastTimeoutsRef.current.delete(id)
        }
      },
      update: (props: ToastProps) => {
        setToasts((prevToasts) => prevToasts.map((t) => (t.id === id ? { ...t, ...props } : t)))
      },
    }
  }

  return {
    toast,
    toasts,
    dismiss: (toastId?: string | number) => {
      setToasts((prevToasts) => (toastId ? prevToasts.filter((t) => t.id !== toastId) : []))

      if (toastId && toastTimeoutsRef.current.has(toastId)) {
        clearTimeout(toastTimeoutsRef.current.get(toastId))
        toastTimeoutsRef.current.delete(toastId)
      } else if (!toastId) {
        toastTimeoutsRef.current.forEach((timeout) => {
          clearTimeout(timeout)
        })
        toastTimeoutsRef.current.clear()
      }
    },
  }
}

export type { ToastProps }

