import { useState } from 'react'
import { beforeAfterPhotos, beforeAfterVideos } from '../data/content'

function getMediaUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${import.meta.env.BASE_URL}${path}`
}

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState(null)

  return (
    <section className="section" id="galeria">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Galeria</p>
          <h2 className="gallery-title-inline">Antes e depois em fotos e vídeo.</h2>
          <p>Resultados reais para mostrar a diferença antes e após a higienização.</p>
        </div>

        <div className="gallery-grid">
          {beforeAfterPhotos.map((item) => (
            <article key={item.title} className="gallery-card card-glow">
              <div className="gallery-head">
                <strong>{item.title}</strong>
                <span>{item.category}</span>
              </div>

              <div className="before-after-grid">
                <figure>
                  <button
                    type="button"
                    className="gallery-image-button"
                    onClick={() =>
                      setActiveImage({
                        src: getMediaUrl(item.beforeImage),
                        alt: `Antes - ${item.title}`,
                      })
                    }
                    aria-label={`Abrir imagem antes de ${item.title}`}
                  >
                    <img src={getMediaUrl(item.beforeImage)} alt={`Antes - ${item.title}`} loading="lazy" />
                  </button>
                  <figcaption>Antes</figcaption>
                </figure>
                <figure>
                  <button
                    type="button"
                    className="gallery-image-button"
                    onClick={() =>
                      setActiveImage({
                        src: getMediaUrl(item.afterImage),
                        alt: `Depois - ${item.title}`,
                      })
                    }
                    aria-label={`Abrir imagem depois de ${item.title}`}
                  >
                    <img src={getMediaUrl(item.afterImage)} alt={`Depois - ${item.title}`} loading="lazy" />
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
                <span>{video.category}</span>
              </div>

              <video controls playsInline preload="metadata" poster={getMediaUrl(video.poster)}>
                <source src={getMediaUrl(video.videoUrl)} type="video/mp4" />
              </video>
            </article>
          ))}
        </div>

        {activeImage ? (
          <div className="gallery-lightbox" role="dialog" aria-modal="true" onClick={() => setActiveImage(null)}>
            <div className="gallery-lightbox-inner" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                className="gallery-lightbox-close"
                onClick={() => setActiveImage(null)}
                aria-label="Fechar imagem"
              >
                ×
              </button>
              <img className="gallery-lightbox-image" src={activeImage.src} alt={activeImage.alt} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
