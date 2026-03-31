import { useEffect, useRef, useState } from 'react'

const PLACEHOLDER_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

export default function LazyImage({ src, alt, className, rootMargin = '200px 0px', ...props }) {
  const imageRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = imageRef.current
    if (!node || shouldLoad) return undefined

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShouldLoad(true)
        observer.disconnect()
      },
      { rootMargin }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [rootMargin, shouldLoad])

  return (
    <img
      ref={imageRef}
      src={shouldLoad ? src : PLACEHOLDER_IMAGE}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
}
