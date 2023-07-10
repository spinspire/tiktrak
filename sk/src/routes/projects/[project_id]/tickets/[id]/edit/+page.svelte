<script lang="ts">
  import { goto } from "$app/navigation";
  import FileInput from "$lib/components/FileInput.svelte";
  import { authModel, client, save } from "$lib/pocketbase";
  import type { AttachmentsRecord } from "$lib/pocketbase/generated-types";
  import { alertOnFailure } from "$lib/pocketbase/ui";
  import Markdown from "svelte-markdown";
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
  <div class="flex">
    <select
      bind:value={data.item.type}
      required
      name="type"
      title="ticket type"
    >
      <option />
      <option>task</option>
      <option>question</option>
      <option>bug</option>
      <option>feature</option>
    </select>
    <select bind:value={data.item.status} name="status" title="ticket status">
      <option />
      <option>created</option>
      <option>ready</option>
      <option>on-hold</option>
      <option>in-progress</option>
      <option>completed</option>
    </select>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <select
      bind:value={data.item.assignee}
      name="assignee"
      title="ticket assigned to"
    >
      <option />
      {#each data.project.expand?.users || [] as user}
        <option value={user.id}>{user.name || user.username}</option>
      {/each}
    </select>
    <p>
      Created by <em>{data.item.expand?.creator?.name || "-"}</em> at {new Date(
        data.item.created
      ).toLocaleString()}
    </p>
  </div>
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
  <h4>File Attachments</h4>
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
          <p>None so far.</p>
        </tr>
      {/each}
    </tbody>
  </table>
  <FileInput bind:files on:change={upload} pasteFile={true}
    >Click here / drag-drop files / copy-paste images to add attachments.</FileInput
  >
  <h4>User Comments</h4>
  {#each $comments.items as comment}
    <div class="comment">
      <pre class="author">{comment.expand.user.name ||
          comment.expand.user.username} on {new Date(
          comment.updated
        ).toLocaleString()}</pre>
      <div class="body">
        <!-- TODO: "sanitze" option is deprecated; replace with "real" sanitization -->
        <!-- see https://marked.js.org/using_advanced#options -->
        <Markdown source={comment.body} options={{ sanitize: true }} />
      </div>
    </div>
  {:else}
    <p>None so far.</p>
  {/each}
  <form on:submit|preventDefault={submitComment}>
    <h4>New Comment</h4>
    <div class="comment">
      <div class="body">
        <Markdown source={comment.body} options={{ sanitize: true }} />
      </div>
    </div>
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
