import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

const AnimatedText = ({ text, className, style }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.5'],
  })

  const words = text.split(' ')

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1])
        return (
          <motion.span key={i} style={{ opacity }} className="inline-block mr-[0.3em]">
            {word}
          </motion.span>
        )
      })}
    </p>
  )
}

export default AnimatedText
