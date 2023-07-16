<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import LoginGuard from "$lib/components/LoginGuard.svelte";
  import { client } from "$lib/pocketbase";
  import SvelteMarkdown from "svelte-markdown";
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
  <SvelteMarkdown
    source={data.project.description}
    options={{ sanitize: true }}
  />
</div>

<LoginGuard admin={true}>
  <a href="./edit/"><button type="button">edit project</button></a>
</LoginGuard>
<LoginGuard admin={false}>
  <a href="./tickets/new/edit"
    ><button type="button">create new ticket</button></a
  >
</LoginGuard>
<List project={data.project} />

<style lang="scss">
  .flex {
    align-items: start;
    margin-block-end: 1em;
    gap: 1em;
    pre {
      margin: 0;
    }
  }
</style>
