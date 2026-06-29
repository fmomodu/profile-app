import { useState, useRef, useLayoutEffect } from 'react'

function useCardCount(dependency) {
  const sectionRef = useRef(null)
  const [cardCount, setCardCount] = useState(0)

  useLayoutEffect(() => {
    if (sectionRef.current) {
      setCardCount(sectionRef.current.children.length)
    }
  }, [dependency])

  return {
    sectionRef,
    cardCount
  }
}

export default useCardCount