// Hook adapted from https://usehooks.com/useWindowSize/
import { useCallback, useEffect, useState } from 'react'

const MOBILE_THRESHOLD = 768

export const useMobileQuery = (): boolean | undefined => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>()
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const handleResize = useCallback((): void => {
    if (window.innerWidth <= MOBILE_THRESHOLD) return setIsMobile(true)
    return setIsMobile(false)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return isMobile
}
