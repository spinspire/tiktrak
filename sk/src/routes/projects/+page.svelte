<script lang="ts">
  import { base } from "$app/paths";
  import { metadata } from "$lib/app/stores";
  import type { PageData } from "./$types";
  export let data: PageData;

  $metadata.title = "Projects";
</script>

{#each data.projects as item}
  <p><a href={`${base}/projects/${item.id}`}>{item.title}</a></p>
{:else}
  <p>No projects found. Create some.</p>
{/each}
