<template>
  <section class="not-found">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="not-found-card" rounded="xl" elevation="12">
            <p class="eyebrow">404</p>
            <h1>Page not found</h1>
            <p class="copy">
              The page you tried to open does not exist or may have moved. You can head back home or jump into one of the projects from the site navigation.
            </p>

            <div class="actions">
              <v-btn color="primary" rounded="pill" size="large" to="/">
                Back home
              </v-btn>
              <v-btn rounded="pill" size="large" to="/about" variant="outlined">
                About Matthew
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped>
.not-found {
  min-height: calc(100svh - var(--app-bar-height));
  padding: 32px 20px;
  display: flex;
  align-items: center;
}

.not-found-card {
  padding: clamp(28px, 5vw, 44px);
  background:
    linear-gradient(160deg, rgba(124, 143, 184, 0.12), rgba(124, 143, 184, 0.02));
  border: 1px solid var(--surface-border);
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--accent-color);
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.15rem;
  letter-spacing: 0.18em;
}

h1 {
  margin: 0;
  color: var(--page-foreground);
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(2.4rem, 7vw, 4.4rem);
  line-height: 0.94;
}

.copy {
  margin: 18px 0 0;
  color: var(--page-muted);
  font-family: Prompt, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
}

.actions {
  margin-top: 26px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
