<script lang="ts">
  import { page } from "$app/stores";
  import { metadata } from "$lib/app/stores";
  import Delete from "$lib/components/Delete.svelte";
  import { client } from "$lib/pocketbase";
  import type { PageData } from "./$types";
  export let data: PageData;
  $: ({ item } = data);
  $: ({ id, title, description } = item);
  $: $metadata.title = title;
</script>

{#if $page.url.hash === "#delete"}
  <Delete table="projects" {id} />
{/if}

<img src={client.files.getUrl(item, item.logo, { thumb: "100x100" })} alt="" />
<pre>{description}</pre>
