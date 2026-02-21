'use client'
import { MainHeroBannerBlock as MainHeroBannerBlockProps } from '@/payload-types'
import './style.css'
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

export const MainHeroBanner: React.FC<MainHeroBannerBlockProps> = ({
  name,
  staticText,
  description,
  buttonText,
  buttonLink,
  bgImage,
}) => {
  const words = ['Frontend', 'Backend', 'Fullstack', 'Web Apps', 'APIs', 'Mobile Apps']

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState(words[0])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Generate random gibberish
  const generateGibberish = (length: number) => {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+[]{}|;:,<>?/'
    let gibberish = ''
    for (let i = 0; i < length; i++) {
      gibberish += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return gibberish
  }

  const resolveGibberish = (word: string, callback: () => void) => {
    let gibberish = generateGibberish(word.length)
    setDisplayText(gibberish)

    let iterations = 0
    const maxIterations = 10

    intervalRef.current = setInterval(() => {
      iterations++

      gibberish = gibberish
        .split('')
        .map((char, index) => {
          if (Math.random() > 0.5 && iterations < maxIterations) {
            return generateGibberish(1)
          }
          return iterations >= maxIterations || Math.random() > 0.7 ? word.charAt(index) : char
        })
        .join('')

      setDisplayText(gibberish)

      if (gibberish === word) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        callback()
      }
    }, 100)
  }

  useEffect(() => {
    const nextWord = words[currentWordIndex]

    resolveGibberish(nextWord, () => {
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }, 1200)
    })

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentWordIndex])

  return (
    <div className="hero-section relative w-full h-screen" id="herosection">
      <div className="overlay">
        {bgImage && typeof bgImage !== 'string' && (
          <figure className="featured_img w-full h-full">
            <Image
              src={bgImage.url || ''}
              alt={bgImage.alt || 'feature_img'}
              width={1920}
              height={870}
            />
          </figure>
        )}
      </div>

      <div className="container w-full h-full flex justify-start items-center hero-section-content">
        <div className="hero-text flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="start-text">Start /&gt;</p>

            <h2 className="hero-heading font-bold">
              Hi, my name is <span className="highlightText">{name}</span>
            </h2>
          </div>

          <div className="typing-container flex flex-col gap-2">
            <h4 className="static-text">
              {staticText} <span className="dynamic-text">{displayText}</span>
            </h4>

            <p className="hero-description">{description}</p>
          </div>
        </div>

        <div className="button-container">
          <a className="hero-button" href={buttonLink}>
            <span>{buttonText}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
