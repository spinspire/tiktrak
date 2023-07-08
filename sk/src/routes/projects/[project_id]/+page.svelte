<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import { client } from "$lib/pocketbase";
  import type { PageData } from "./$types";
  import List from "./tickets/List.svelte";
  export let data: PageData;
  $: ({ project } = data);
  $: $metadata.title = data.project.title;
</script>

<div class="flex">
  <img
    src={client.files.getUrl(data.project, project.logo, { thumb: "100x100" })}
    alt=""
  />
  <pre>{project.description}</pre>
</div>

<a href="./tickets/new/edit"><button type="button">create new ticket</button></a
>
<List project_id={project.id} />

<style lang="scss">
  .flex {
    display: flex;
    pre {
      padding: 0 1em;
    }
  }
</style>
