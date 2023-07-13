<script context="module">
  import "../app.scss";
  import { beforeNavigate } from "$app/navigation";
  import { base } from "$app/paths";
  import { metadata } from "$lib/app/stores";
  import Alerts from "$lib/components/Alerts.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import { site, sponsor } from "$lib/config";
</script>

<script lang="ts">
  import LoginBadge from "$lib/components/LoginBadge.svelte";
  import LoginGuard from "$lib/components/LoginGuard.svelte";

  $: title = $metadata.title ? $metadata.title + " | " + site.name : site.name;
  $: description = $metadata.description ?? site.description;
  $: headline = $metadata.headline ?? $metadata.title;
  // reset metadata on navigation so that the new page inherits nothing from the old page
  beforeNavigate(() => {
    $metadata = {};
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>
<header>
  <a href={`${base}/`} class="logo">
    <img class="desktop-logo" src={`${base}/logo.svg`} alt="application logo" />
    <img class="mobile-logo" src={`${base}/icon.svg`} alt="application logo" />
  </a>
  <Nav />
  <LoginBadge />
</header>
<div class="main-wrapper">
  <!-- headlines outside of main block -->
  <div class="headline-wrapper">
    <div class="overview-title">
      {#if headline}
        <h1>{headline}</h1>
      {:else}
        <h1>Overview</h1>
      {/if}
    </div>
    <div class="status-alerts">
      <Alerts />
    </div>
  </div>
  <!-- main info display -->
  <main>
    <LoginGuard>
      <slot />
      <blockquote slot="login">Please sign-in.</blockquote>
    </LoginGuard>
  </main>
</div>
<footer>
  <div>
    <em>{site.name}</em> is an
    <a href={site.source_url} target="_blank" rel="noreferrer"
      >Open Source project</a
    >
    sponsored by
    <a href={sponsor.url} target="_blank" rel="noreferrer">{sponsor.name}</a>.
  </div>
</footer>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid var(--elements-color-dark);
    height: 5rem;
    img {
      vertical-align: middle !important;
    }
    .logo {
      img {
        width: 100%; /* Set the logo width to 100% of its container */
        height: auto; /* Allow the logo height to adjust proportionally */
      }
    }
    .desktop-logo {
      display: block;
    }
    .mobile-logo {
      display: none;
    }
    @media (max-width: 480px) {
      .desktop-logo {
        display: none;
      }
      .mobile-logo {
        display: block;
      }
    }
  }
  .headline-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    h1 {
      font-weight: 300;
      letter-spacing: 1px;
      white-space: nowrap;
    }
    .status-alerts {
      padding-bottom: 6px;
    }
  }

  main {
    padding: 20px;
    background-color: var(--background-color-dark-level1);
    -moz-border-radius: 0.2rem;
    -webkit-border-radius: 0.2rem;
    -khtml-border-radius: 0.2rem;
    border-radius: 0.2rem;
  }
  footer {
    border-top: 1px solid var(--elements-color-dark);
  }
</style>
