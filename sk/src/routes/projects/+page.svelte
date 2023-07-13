<script lang="ts">
  import { base } from "$app/paths";
  import { metadata } from "$lib/app/stores";
  import LoginGuard from "$lib/components/LoginGuard.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;

  $metadata.title = "Projects";
</script>

<LoginGuard adminOnly={true}>
  <a href="./new/edit/"><button type="button">new project</button></a>
</LoginGuard>
{#each data.projects as item}
  <p><a href={`${base}/projects/${item.id}`}>{item.title}</a></p>
{:else}
  <p>No projects found. Ask the administrator to add you to a project.</p>
{/each}
