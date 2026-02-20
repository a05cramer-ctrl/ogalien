import { useState } from 'react'
import photo from './AF05ED11-7B43-4BD7-A202-6F55547D31BD.png'
import { BlockchainParticles } from './components/BlockchainParticles'
import { NASAStarMap } from './components/NASAStarMap'
import { NeonCharts } from './components/NeonCharts'
import { Starfield } from './components/Starfield'
import { VideoSection } from './components/VideoSection'
import './App.css'

const CONTRACT_ADDRESS = '6MASHx4xPe6wGrif4AKmpBe55DkVy9FWQH6haR5Fpump'

function App() {
  const [copied, setCopied] = useState(false)

  const handleCopyCA = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="memecoin-hero">
      <header className="header">
        <h1 className="header-title">OGALIEN</h1>
        <section className="header-actions">
          <a
            href="https://x.com/ogalien_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-x"
          >
            X
          </a>
          <button
            type="button"
            onClick={handleCopyCA}
            className={`btn btn-copy ${copied ? 'copied' : ''}`}
          >
            {copied ? 'COPIED!' : 'COPY CA'}
          </button>
        </section>
      </header>
      <div className="cosmic-bg" />
      <Starfield />
      <NeonCharts />
      <BlockchainParticles />

      <div className="hero-content">
        <div className="alien-frame">
          <div className="golden-glow" />
          <div className="green-glow" />
          <div className="moonlight-overlay" />
          <img
            src={photo}
            className="alien-photo"
            alt="Our cosmic visitor — a friendly extraterrestrial on an interstellar journey home"
          />
        </div>

        <div className="branding">
          <h1 className="title">
            <span className="title-main">$OGALIEN</span>
            <span className="title-sub">The First Alien</span>
          </h1>
          <p className="tagline">
            One community. One journey. To the moon, together.
          </p>
          <p className="vibe">
            OUR COMMUNITY
          </p>
          <section className="hero-actions">
            <a
              href="https://x.com/ogalien_dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-x"
            >
              X
            </a>
            <button
              type="button"
              onClick={handleCopyCA}
              className={`btn btn-copy ${copied ? 'copied' : ''}`}
            >
              {copied ? 'COPIED!' : 'COPY CA'}
            </button>
          </section>
        </div>
      </div>

      <NASAStarMap />
      <section className="section lore-section">
        <h2 className="section-title">LORE</h2>
        <div className="lore-content">
          <p>
            Long ago, in a galaxy not so far away, a small being with gentle eyes
            and a heart full of wonder found itself far from home. Stranded beneath
            an unfamiliar sky, it gazed up at a bright full moon — a beacon of
            hope, a promise of return.
          </p>
          <p>
            The alien carried a rare gift: fingertips that glowed with cosmic
            energy, a soft green light that could heal, connect, and remind
            anyone who saw it that we are all made of stardust. With one finger
            raised toward the heavens, it dreamed of the journey back — to family,
            to warmth, to the place where it belonged.
          </p>
          <p>
            Along the way, it discovered something unexpected: a community of
            dreamers who believed in the same journey. Together, they formed a
            bond — not of blood, but of shared hope. Home wasn&apos;t just a place
            anymore. It was the people who stood beside you under the same moon.
          </p>
          <p>
            Now, that spirit lives on. OGALIEN is more than a token — it&apos;s a
            reminder that we are all travelers, all searching for our way back.
            To the moon. Together.
          </p>
        </div>
        <VideoSection />
        <section className="lore-actions">
          <a
            href="https://x.com/ogalien_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-x"
          >
            X
          </a>
          <button
            type="button"
            onClick={handleCopyCA}
            className={`btn btn-copy ${copied ? 'copied' : ''}`}
          >
            {copied ? 'COPIED!' : 'COPY CA'}
          </button>
        </section>
      </section>

      <footer className="footer">
        <p className="footer-text">$OGALIEN — The journey home starts here. 🌕</p>
        <p className="footer-subtext">Built by the community, for the community.</p>
      </footer>
    </div>
  )
}

export default App
