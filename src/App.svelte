<script lang="ts">
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import Result from './routes/Result.svelte';
  import Guide from './routes/Guide.svelte';

  const routes = {
    '/': Home,
    '/result': Result,
    '/guide': Guide,
    '*': Home
  };
</script>

<div class="app">
  <main>
    <Router {routes} />
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  main {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    padding: 1.5rem 1.25rem 3rem;
    flex: 1;
  }
  @media (min-width: 768px) {
    main {
      max-width: 640px;
      padding: 2.5rem 2rem 4rem;
    }
  }
</style>
