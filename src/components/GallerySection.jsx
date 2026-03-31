import { useEffect, useState } from 'react'
import { beforeAfterPhotos, beforeAfterVideos } from '../data/content'
import LazyImage from './LazyImage'

function getMediaUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${import.meta.env.BASE_URL}${path}`
}

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState(null)

  const currentGalleryItem = activeImage !== null ? beforeAfterPhotos[activeImage.itemIndex] : null
  const currentGalleryImages = currentGalleryItem
    ? [
        {
          src: getMediaUrl(currentGalleryItem.beforeImage),
          alt: `Antes - ${currentGalleryItem.title}`,
          label: 'Antes',
        },
        {
          src: getMediaUrl(currentGalleryItem.afterImage),
          alt: `Depois - ${currentGalleryItem.title}`,
          label: 'Depois',
        },
      ]
    : []
  const currentLightboxImage = activeImage !== null ? currentGalleryImages[activeImage.imageIndex] : null

  function openImage(itemIndex, imageIndex) {
    setActiveImage({ itemIndex, imageIndex })
  }

  function changeImage(direction) {
    if (activeImage === null) return

    const totalImages = currentGalleryImages.length
    const nextIndex = (activeImage.imageIndex + direction + totalImages) % totalImages
    setActiveImage({ ...activeImage, imageIndex: nextIndex })
  }

  useEffect(() => {
    if (activeImage === null) return undefined

    function handleKeyDown(event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        changeImage(-1)
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        changeImage(1)
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        setActiveImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImage, currentGalleryImages.length])

  return (
    <section className="section" id="galeria">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Galeria</p>
          <h2 className="gallery-title-inline">Antes e depois em fotos e vídeo.</h2>
          <p>Resultados reais para mostrar a diferença antes e após a higienização.</p>
        </div>

        <div className="gallery-grid">
          {beforeAfterPhotos.map((item, itemIndex) => (
            <article key={item.title} className="gallery-card card-glow">
              <div className="gallery-head">
                <strong>{item.title}</strong>
              </div>

              <div className="before-after-grid">
                <figure>
                  <button
                    type="button"
                    className="gallery-image-button"
                    onClick={() => openImage(itemIndex, 0)}
                    aria-label={`Abrir imagem antes de ${item.title}`}
                  >
                    <LazyImage src={getMediaUrl(item.beforeImage)} alt={`Antes - ${item.title}`} />
                  </button>
                  <figcaption>Antes</figcaption>
                </figure>
                <figure>
                  <button
                    type="button"
                    className="gallery-image-button"
                    onClick={() => openImage(itemIndex, 1)}
                    aria-label={`Abrir imagem depois de ${item.title}`}
                  >
                    <LazyImage src={getMediaUrl(item.afterImage)} alt={`Depois - ${item.title}`} />
                  </button>
                  <figcaption>Depois</figcaption>
                </figure>
              </div>
            </article>
          ))}
        </div>

        <div className="gallery-videos-grid">
          {beforeAfterVideos.map((video) => (
            <article key={video.title} className="gallery-video-card card-glow">
              <div className="gallery-head">
                <strong>{video.title}</strong>
              </div>

              <video controls playsInline preload="metadata" poster={getMediaUrl(video.poster)} src={getMediaUrl(video.videoUrl)}>
                O teu browser não conseguiu carregar este vídeo.
              </video>
            </article>
          ))}
        </div>

        {activeImage && currentLightboxImage && currentGalleryItem ? (
          <div className="gallery-lightbox" role="dialog" aria-modal="true" onClick={() => setActiveImage(null)}>
            <div className="gallery-lightbox-inner" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                className="gallery-lightbox-close"
                onClick={() => setActiveImage(null)}
                aria-label="Fechar imagem"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="gallery-lightbox-close-icon">
                  <path
                    d="M5.5 5.5L14.5 14.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14.5 5.5L5.5 14.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-nav-prev"
                onClick={() => changeImage(-1)}
                aria-label="Ver imagem anterior"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="gallery-lightbox-nav-icon">
                  <path
                    d="M11.75 4.5L6.25 10L11.75 15.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="gallery-lightbox-frame">
                <div className="gallery-lightbox-meta">
                  <strong>{currentGalleryItem.title}</strong>
                  <span>{currentLightboxImage.label}</span>
                </div>
                <img className="gallery-lightbox-image" src={currentLightboxImage.src} alt={currentLightboxImage.alt} />
              </div>
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-nav-next"
                onClick={() => changeImage(1)}
                aria-label="Ver imagem seguinte"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="gallery-lightbox-nav-icon">
                  <path
                    d="M8.25 4.5L13.75 10L8.25 15.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
