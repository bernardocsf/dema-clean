import { beforeAfterPhotos, beforeAfterVideos } from '../data/content'

function getMediaUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${import.meta.env.BASE_URL}${path}`
}

export default function GallerySection() {
  return (
    <section className="section" id="galeria">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Galeria</p>
          <h2>Antes e depois em fotos e vídeo.</h2>
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
                  <img src={getMediaUrl(item.beforeImage)} alt={`Antes - ${item.title}`} loading="lazy" />
                  <figcaption>Antes</figcaption>
                </figure>
                <figure>
                  <img src={getMediaUrl(item.afterImage)} alt={`Depois - ${item.title}`} loading="lazy" />
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
      </div>
    </section>
  )
}
