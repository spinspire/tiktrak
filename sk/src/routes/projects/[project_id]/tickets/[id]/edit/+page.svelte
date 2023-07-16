<script lang="ts">
  import { goto } from "$app/navigation";
  import FileInput from "$lib/components/FileInput.svelte";
  import { authModel, client, save } from "$lib/pocketbase";
  import type { AttachmentsRecord } from "$lib/pocketbase/generated-types";
  import { alertOnFailure } from "$lib/pocketbase/ui";
  import Markdown from "svelte-markdown";
  import type { PageData } from "./$types";
  import LoginGuard from "$lib/components/LoginGuard.svelte";
  import { alerts } from "$lib/components/Alerts.svelte";
  import { metadata } from "$lib/app/stores";
  import Editor from "./Editor.svelte";
  export let data: PageData;
  const back = "../../..";
  let descriptionEdit = !data.item.description;
  const { comments, attachments } = data;
  async function submit(op: string | SubmitEvent) {
    data.item.project = data.project.id;
    alertOnFailure(async () => {
      if (op === "delete") {
        if (confirm("Are you sure you want delete this record PERMANENTLY?")) {
          await client.collection("tickets").delete(data.item.id);
          alerts.warning("Record deleted.", 5000);
        } else {
          return;
        }
      } else {
        await save("tickets", data.item);
      }
      goto(back);
    });
  }
  const COMMENT = { body: "", user: $authModel?.id, ticket: data.item.id };
  let comment = { ...COMMENT };
  async function submitComment() {
    await save("comments", comment);
    comment = { ...COMMENT };
  }
  let files: FileList;
  async function upload(event: Event | FileList) {
    let records: AttachmentsRecord[] = [];
    // did we get a FileList or an Event as argument?
    const _files = event instanceof FileList ? event : files;
    for (const file of _files) {
      let attachment: AttachmentsRecord = {
        ticket: data.item.id,
        user: $authModel?.id,
        file,
        label: file.name,
      };
      // purposely assigning and awaiting, otherwise the loop does not wait
      // and runs them all in parallel causing "auto-cancellation" errors
      records.push(await save("attachments", attachment)); // collect records
    }
    return records;
  }

  // intercepts "paste" event, uploads files, inserts them into the event target textarea
  async function insertOnPaste(e: ClipboardEvent) {
    if (e.clipboardData?.files && e.clipboardData.files.length > 0) {
      e.stopPropagation(); // don't let other handlers run, or else double upload could happen
      e.preventDefault(); // don't allow default text insertion into the textarea
      const input = e.target as HTMLTextAreaElement;
      const { value, selectionStart } = input;
      const files = e.clipboardData.files;
      const records = await upload(files);
      const inserts = records
        .map(function (record, i) {
          const url = client.files.getUrl(record, record.file);
          const { pathname } = new URL(url);
          const prefix = files[i].type.startsWith("image/") ? "!" : "";
          return `${prefix}[${record.label}](${pathname})`;
        })
        .join(", ");
      const head = value.slice(0, selectionStart);
      const tail = value.slice(selectionStart);
      input.value = head + inserts + tail;
      // without this, Svelte won't notice the change
      input.dispatchEvent(new Event("input"));
    }
  }
  $: $metadata.title = `${data.item.id ? "Edit" : "New"} Ticket: ${
    data.item.title
  }`;
</script>

<form on:submit|preventDefault={submit} class="flex-vertical">
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
      <option value={undefined} />
      {#each data.project.expand?.users || [] as user}
        <option value={user.id}>{user.name || user.username}</option>
      {/each}
    </select>
    {#if data.item.id}
      <p>
        Created by <em>{data.item.expand?.creator?.name || "-"}</em> at {new Date(
          data.item.created
        ).toLocaleString()}
      </p>
    {/if}
  </div>
  <div class="flex">
    <input
      bind:value={data.item.title}
      required
      name="title"
      placeholder="title"
      title="ticket title"
    />
    {#if data.item.id}
      <LoginGuard admin={true}>
        <button
          type="button"
          on:click={() => submit("delete")}
          title="permanently deletes this record">Delete</button
        ></LoginGuard
      >
    {/if}
  </div>
  <div title="ticket description (click to edit)">
    <Editor
      edit={descriptionEdit}
      name="description"
      placeholder="ticket description"
      title="ticket description"
      bind:value={data.item.description}
      on:paste={insertOnPaste}
      on:click={() => (descriptionEdit = true)}
    />
  </div>
  <div class="actions">
    <button type="submit">Save</button>
    <a href={back}><button type="button">Cancel</button></a>
  </div>
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
    <Editor
      name="body"
      placeholder="comment body"
      title="comment body"
      bind:value={comment.body}
      on:paste={insertOnPaste}
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
