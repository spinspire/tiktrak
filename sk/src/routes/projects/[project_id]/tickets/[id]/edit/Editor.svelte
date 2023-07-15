<script lang="ts">
  import { base } from "$app/paths";
  import SvelteMarkdown from "svelte-markdown";
  export let value: string; // editor visible by default?
  export let preview = true;
  export let edit = true;
  $: ({ value: _x, edit: _y, preview: _z, ...other_props } = $$props);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click>
  {#if edit}
    <small
      >You can use <a
        href="https://www.markdownguide.org/getting-started/"
        target="_blank"
        rel="noopener noreferrer">markdown format</a
      >
      and file/image copy/paste in this editor. See
      <a href={`${base}/`} target="_blank" rel="noopener noreferrer">help</a
      >.</small
    >
    <textarea
      bind:value
      placeholder="missing 'placeholder' attribute"
      title="missing 'title' attribute"
      rows="10"
      on:paste
      {...other_props}
    />
  {/if}
  {#if preview}
    <SvelteMarkdown source={value} options={{ sanitize: true }} />
  {/if}
</div>
