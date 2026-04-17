<template>
  <section class="home-hero">
    <div class="hero-shell">
      <div class="hero-copy">
        <h1 class="hero-title hero-animate hero-animate-1">
          Engineer looking to further my knowledge in everything tech!
        </h1>
        <p class="hero-summary hero-animate hero-animate-3">
          There are some simple web apps on this website that were built while learning different aspects of Vue.js and web development!
        </p>

        <div class="hero-actions hero-animate hero-animate-4">
          <v-btn
            class="cta-secondary"
            href="https://github.com/MatthewStonee"
            rel="noreferrer"
            size="large"
            rounded="pill"
            target="_blank"
            variant="outlined"
          >
            View GitHub
          </v-btn>
        </div>

        <ul class="proof-list hero-animate hero-animate-5">
          <li class="proof-item">
            <span class="proof-label">Role</span>
            <span class="proof-value">Senior Systems Engineer at CPE ST3</span>
          </li>
          <li class="proof-item">
            <span class="proof-label">Education</span>
            <span class="proof-value">B.S. Computer Science, UCF</span>
          </li>
          <li class="proof-item">
            <span class="proof-label">Base</span>
            <span class="proof-value">Florida</span>
          </li>
        </ul>
      </div>

      <figure class="hero-portrait hero-animate hero-animate-3">
        <div class="portrait-frame">
          <v-img
            :src="profileImage"
            alt="Portrait of Matthew Stone"
            class="portrait-image"
            cover
          />
        </div>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  position: relative;
  min-height: calc(100svh - var(--app-bar-height));
  padding: clamp(28px, 5vw, 56px) clamp(20px, 5vw, 64px) clamp(36px, 6vw, 72px);
  display: flex;
  align-items: center;
  overflow: clip;
}

.home-hero::before,
.home-hero::after {
  content: "";
  position: absolute;
  inset: auto;
  pointer-events: none;
  z-index: 0;
}

.home-hero::before {
  top: 8%;
  right: -10%;
  width: min(36vw, 460px);
  height: min(36vw, 460px);
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(124, 143, 184, 0.12) 0%, rgba(124, 143, 184, 0) 72%);
  filter: blur(18px);
}

.home-hero::after {
  bottom: -18%;
  left: -8%;
  width: min(26vw, 300px);
  height: min(26vw, 300px);
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(124, 143, 184, 0.14) 0%, rgba(124, 143, 184, 0) 74%);
  filter: blur(22px);
}

.hero-shell {
  position: relative;
  z-index: 1;
  width: min(1180px, 100%);
  margin: 0 auto;
  display: grid;
  gap: clamp(28px, 4vw, 72px);
  align-items: center;
}

.hero-copy {
  max-width: 620px;
}

.hero-title {
  margin: 0;
  color: white;
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(2.7rem, 7vw, 4.9rem);
  line-height: 0.98;
  letter-spacing: 0.015em;
  text-wrap: balance;
}

.hero-summary {
  margin: 20px 0 0;
  max-width: 38rem;
  color: rgba(255, 255, 255, 0.8);
  font-family: Prompt, sans-serif;
  font-size: clamp(0.98rem, 1.5vw, 1.08rem);
  line-height: 1.68;
}

.hero-actions {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cta-secondary {
  min-width: 150px;
  min-height: 46px;
  letter-spacing: 0.02em;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background-color 180ms ease,
    color 180ms ease,
    border-color 180ms ease;
  touch-action: manipulation;
}

.cta-secondary {
  color: var(--accent-color);
  border-color: var(--accent-color);
  font-family: Prompt, sans-serif;
  font-weight: 600;
}

.cta-secondary:hover {
  color: white;
  border-color: white;
  background-color: rgba(124, 143, 184, 0.1);
  transform: translateY(-2px);
}

.cta-secondary:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 4px;
}

.proof-list {
  margin: 34px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 14px;
}

.proof-item {
  padding-top: 14px;
  display: grid;
  gap: 6px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.proof-label {
  color: var(--accent-color);
  font-family: "Bebas Neue", sans-serif;
  font-size: 1rem;
  letter-spacing: 0.12em;
}

.proof-value {
  color: white;
  font-family: Prompt, sans-serif;
  font-size: 1rem;
  line-height: 1.5;
}

.hero-portrait {
  margin: 0;
  position: relative;
  justify-self: center;
  width: min(100%, 500px);
}

.portrait-frame {
  position: relative;
  aspect-ratio: 0.82;
  overflow: hidden;
  border-radius: 32px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 100%);
  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.08);
}

.portrait-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(9, 10, 14, 0) 48%, rgba(9, 10, 14, 0.34) 100%);
}

.portrait-image {
  width: 100%;
  height: 100%;
  transform: scale(1.03);
  animation: portraitFloat 7s ease-in-out infinite;
  will-change: transform;
}

.hero-animate {
  opacity: 0;
  transform: translateY(18px);
  animation: heroReveal 700ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.hero-animate-1 {
  animation-delay: 80ms;
}

.hero-animate-2 {
  animation-delay: 150ms;
}

.hero-animate-3 {
  animation-delay: 240ms;
}

.hero-animate-4 {
  animation-delay: 320ms;
}

.hero-animate-5 {
  animation-delay: 400ms;
}

@keyframes heroReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes portraitFloat {
  0%,
  100% {
    transform: scale(1.03) translateY(0);
  }

  50% {
    transform: scale(1.05) translateY(-10px);
  }
}

@media (min-width: 880px) {
  .hero-shell {
    grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.92fr);
  }

  .proof-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }
}

@media (max-width: 879px) {
  .home-hero {
    padding-top: 24px;
    align-items: start;
  }

  .hero-portrait {
    order: -1;
    width: min(100%, 420px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-animate,
  .portrait-image,
  .cta-primary,
  .cta-secondary {
    animation: none;
    transition: none;
    transform: none;
    opacity: 1;
  }
}
</style>

<script>
import profileImg from '../images/profile3.jpg'

export default {
  name: 'Home',

  created() {
    document.title = 'Matthew Stone | Home'
  },

  data() {
    return {
      profileImage: profileImg,
    }
  },
}
</script>
