'use client'
import React from 'react'
import { usePBProgress } from '../index'

export function ProgressBar(): React.ReactElement {
  const { progress, isLoading } = usePBProgress()

  return (
    <div
      style={{
        width: `${progress * 100}%`,
        top: 0,
        height: '4px',
        position: 'fixed',
        left: 0,
        zIndex: 9999,
        overflow: 'hidden',
        backgroundColor: '#FF91A4',
        transition: 'width 200ms ease-in-out',
        visibility: isLoading ? 'visible' : 'hidden',
      }}
    />
  )
}
