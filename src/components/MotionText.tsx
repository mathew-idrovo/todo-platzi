'use client'

import { motion } from 'framer-motion'

interface MotionTextProps {
  text: string
  className?: string
  animation?: 'fadeIn' | 'typewriter' | 'wave' | 'bounce' | 'glitch'
  delay?: number
  duration?: number
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export function MotionText({
  text,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  tag = 'span',
}: MotionTextProps) {
  // Dividir el texto en letras individuales
  const letters = text.split('')

  // Configurar variantes de animación según el tipo
  const getAnimationVariants = () => {
    switch (animation) {
      case 'typewriter':
        return {
          hidden: { opacity: 0 },
          visible: (i: number) => ({
            opacity: 1,
            transition: { delay: delay + i * 0.05, duration: duration / 2 },
          }),
        }
      case 'wave':
        return {
          hidden: { y: '1.1em', opacity: 0 },
          visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
              delay: delay + i * 0.03,
              duration: duration,
              type: 'spring',
              damping: 10,
            },
          }),
        }
      case 'bounce':
        return {
          hidden: { scale: 0, opacity: 0 },
          visible: (i: number) => ({
            scale: 1,
            opacity: 1,
            transition: {
              delay: delay + i * 0.03,
              duration: duration,
              type: 'spring',
              stiffness: 200,
              damping: 10,
            },
          }),
        }
      case 'glitch':
        return {
          hidden: {
            opacity: 0,
            y: Math.random() * 40 - 20,
            x: Math.random() * 40 - 20,
            scale: Math.random() * 1 + 0.5,
            rotate: Math.random() * 30 - 15,
          },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotate: 0,
            transition: {
              delay: delay + i * 0.02,
              duration: duration,
              type: 'spring',
            },
          }),
        }
      default: // fadeIn
        return {
          hidden: { opacity: 0 },
          visible: (i: number) => ({
            opacity: 1,
            transition: { delay: delay + i * 0.03, duration: duration },
          }),
        }
    }
  }

  const variants = getAnimationVariants()

  // Renderizar el elemento según el tag especificado
  const renderContent = () => {
    return (
      <div className={`inline-block ${className}`}>
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={variants}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
    )
  }

  // Renderizar con el tag correcto
  switch (tag) {
    case 'h1':
      return <h1>{renderContent()}</h1>
    case 'h2':
      return <h2>{renderContent()}</h2>
    case 'h3':
      return <h3>{renderContent()}</h3>
    case 'h4':
      return <h4>{renderContent()}</h4>
    case 'p':
      return <p>{renderContent()}</p>
    default:
      return <span>{renderContent()}</span>
  }
}
