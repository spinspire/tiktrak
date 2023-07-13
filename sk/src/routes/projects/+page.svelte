<script lang="ts">
  import { base } from "$app/paths";
  import { metadata } from "$lib/app/stores";
  import LoginGuard from "$lib/components/LoginGuard.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  $metadata.title = "Projects";
  // debugging project structure
  // console.log("The list of projects:", data.projects);
</script>

<LoginGuard admin={true}>
  <a href="./new/edit/"><button type="button">new project</button></a>
</LoginGuard>

{#each data.projects as item}
  <div class="row">
    <div class="col-logo">
      {#if item.logo}
        <img src={item.logo} alt="Logo" />
      {:else}
        <img src={`${base}/generic-project-icon.svg`} alt="Generic Icon" />
      {/if}
    </div>
    <div class="col">
      <h2><a href={`${base}/projects/${item.id}`}>{item.title}</a></h2>
    </div>
    <div class="col">
      <span>status here</span>
    </div>
    <div class="col">date updated</div>
  </div>
{:else}
  <p>No projects found. Ask the administrator to add you to a project.</p>
{/each}

<style lang="scss">
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    -moz-border-radius: 0.5rem;
    -webkit-border-radius: 0.5rem;
    -khtml-border-radius: 0.5rem;
    border-radius: 0.5rem;
    background-color: var(--background-color-dark-level2);
    .col {
      margin: 0.2rem;
      flex-grow: 1;
    }
    .col-logo {
      margin-left: 0.2rem;
      margin-right: 2rem;
      flex-shrink: 0;
    }
    // @media (max-width: 480px) {
    //   .col {
    //     margin-right: 1rem; /* Adjust the margin-left for smaller screens */
    //   }
    // }
  }
  h2 {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-size: 1.6rem;
    text-transform: uppercase;
  }
</style>
