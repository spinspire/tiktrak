<script lang="ts">
  import { goto } from "$app/navigation";
  import FileInput from "$lib/components/FileInput.svelte";
  import { authModel, client, save } from "$lib/pocketbase";
  import type { AttachmentsRecord } from "$lib/pocketbase/generated-types";
  import { alertOnFailure } from "$lib/pocketbase/ui";
  import type { PageData } from "./$types";
  export let data: PageData;
  $: ({ comments, attachments } = data);
  async function submit(e: SubmitEvent) {
    data.item.project = data.project.id;
    alertOnFailure(async () => {
      await save("tickets", data.item);
      goto("../../..");
    });
  }
  const COMMENT = { body: "", user: $authModel?.id, ticket: data.item.id };
  let comment = { ...COMMENT };
  async function submitComment() {
    await save("comments", comment);
    comment = { ...COMMENT };
  }
  let files: FileList;
  async function upload() {
    for (const file of files) {
      let attachment: AttachmentsRecord = {
        ticket: data.item.id,
        user: $authModel?.id,
        file,
        label: file.name,
      };
      // purposely assigning await return value to an unused value, otherwise the loop does not wait
      // and runs them all in parallel causing "auto-cancellation" errors
      const record = await save("attachments", attachment);
    }
  }
</script>

<form on:submit|preventDefault={submit}>
  <select bind:value={data.item.type} required name="type" title="ticket type">
    <option />
    <option>task</option>
    <option>question</option>
    <option>bug</option>
    <option>feature</option>
  </select>
  <input
    bind:value={data.item.title}
    required
    name="title"
    placeholder="title"
    title="ticket title"
  />
  <textarea
    bind:value={data.item.description}
    name="description"
    placeholder="description"
    rows="10"
    title="ticket description"
  />
  <button type="submit">Save</button>
</form>

{#if data.item.id}
  <table>
    <tbody>
      {#each $attachments.items as attachment}
        <tr>
          <td>
            {#await client.files.getUrl(attachment, attachment.file) then url}
              <a href={url} target="_blank" rel="noreferrer">
                {attachment.label}
              </a>
            {/await}
          </td>
          <td
            >{attachment.expand.user.name ||
              attachment.expand.user.username}</td
          >
          <td>{attachment.updated}</td>
        </tr>
      {:else}
        <tr>
          <td>No attachments found.</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <FileInput bind:files on:change={upload}
    >Click or drag/drop files to add attachments.</FileInput
  >
  {#each $comments.items as comment}
    <div class="comment">
      <pre class="author">{comment.expand.user.name ||
          comment.expand.user.username} on {comment.updated}</pre>
      <pre class="body">{comment.body}</pre>
    </div>
  {/each}
  <form on:submit|preventDefault={submitComment}>
    <h4>New Comment</h4>
    <textarea
      bind:value={comment.body}
      required
      name="body"
      placeholder="comment body"
      rows="5"
      title="comment body"
    />
    <button type="submit">Add Comment</button>
  </form>
{/if}

<style lang="scss">
  .comment {
    margin: 0.5em 0;
    padding: 0 1em;
    border: solid gray 1px;
    border-radius: 6px;
    .author {
      border-bottom: dashed gray 1px;
      font-style: italic;
    }
  }
</style>
