<template>
  <v-container class="about-page py-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="9">
        <v-card class="about-hero" elevation="10" rounded="xl">
          <v-card-text class="pa-6 pa-md-8">
            <p class="eyebrow mb-3">About Matthew Stone</p>
            <h1 class="about-title mb-4">Engineer, builder, and lifelong learner</h1>
            <p class="about-summary mb-0">
              I am a Senior Systems Engineer at CPE ST3 with a B.S. Computer Science, UCF.
              My background is rooted in solving technical
              problems, learning new systems quickly, and building practical
              tools that make day-to-day work smoother.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-6">
      <v-col cols="12" md="5" lg="4">
        <v-card class="about-panel h-100" elevation="8" rounded="xl">
          <v-card-title class="panel-title">What I focus on</v-card-title>
          <v-card-text class="panel-copy">
            I enjoy working across web development, software engineering, and
            infrastructure-minded problem solving. A lot of this site reflects
            that mindset: build something useful, learn from it, and keep
            improving the next version.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="5" lg="4">
        <v-card class="about-panel h-100" elevation="8" rounded="xl">
          <v-card-title class="panel-title">Why this site exists</v-card-title>
          <v-card-text class="panel-copy">
            This site is home to side projects that helped me explore Vue,
            APIs, UI work, and small product ideas. It is a place to share what
            I am building while continuing to grow as an engineer.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.about-page {
  color: var(--page-foreground);
}

.about-hero,
.about-panel {
  border: 1px solid var(--surface-border);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
  backdrop-filter: blur(12px);
}

.eyebrow {
  color: var(--accent-color);
  font-family: "Bebas Neue", sans-serif;
  font-size: 1rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.about-title {
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(2.4rem, 6vw, 4rem);
  line-height: 0.98;
  letter-spacing: 0.02em;
}

.about-summary,
.panel-copy {
  color: var(--page-muted);
  font-family: Prompt, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
}

.panel-title {
  color: var(--page-foreground);
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.45rem;
  letter-spacing: 0.04em;
}
</style>
