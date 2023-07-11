<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import { client } from "$lib/pocketbase";
  import type { PageData } from "./$types";
  import List from "./tickets/List.svelte";
  export let data: PageData;
  $: $metadata.title = data.project.title;
</script>

<div class="flex">
  {#if data.project.logo}
    <img
      src={client.files.getUrl(data.project, data.project.logo, {
        thumb: "100x100",
      })}
      alt="project logo"
    />
  {/if}
  <pre>{data.project.description}</pre>
</div>

<a href="./edit/"><button type="button">edit project</button></a>
<a href="./tickets/new/edit"><button type="button">create new ticket</button></a
>
<List project_id={data.project.id} />

<style lang="scss">
  .flex {
    pre {
      padding: 0 1em;
    }
  }
</style>
