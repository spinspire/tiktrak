<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import { alerts } from "$lib/components/Alerts.svelte";
  import FileInput from "$lib/components/FileInput.svelte";
  import { client, save } from "$lib/pocketbase";
  import { alertOnFailure } from "$lib/pocketbase/ui";
  import Editor from "../tickets/[id]/edit/Editor.svelte";
  import type { PageData } from "./$types";
  import UserPicker from "./UserPicker.svelte";
  export let data: PageData;
  const back = "..";
  let files: FileList;
  let { users, config } = data.project; // detach from data to reduce re-fetches
  async function submit(e: SubmitEvent) {
    alertOnFailure(async () => {
      data.project = { ...data.project, users, config };
      if (files && files.length > 0) {
        const [file] = files;
        data.project.logo = file;
      }
      await save("projects", data.project);
      await invalidateAll();
      goto(back);
    });
  }
  function toggleAssignee(uid: string) {
    if (uid === config.assignee) {
      config.assignee = undefined;
    } else {
      config.assignee = uid;
    }
  }
</script>

<form on:submit|preventDefault={submit} class="flex-vertical">
  <input
    bind:value={data.project.title}
    required
    name="title"
    placeholder="project title"
    title="project title"
  />
  {#if files && files.length > 0}
    <img class="thumb" src={URL.createObjectURL(files[0])} alt="project logo" />
  {:else if data.project.logo}
    {#await client.files.getUrl( data.project, data.project.logo, { thumb: "100x100" } ) then logo}
      <div class="flex">
        <img src={logo} alt="project logo" />
        <button
          type="button"
          title="remove"
          on:click={() => (data.project.logo = "")}>&times;</button
        >
      </div>
    {/await}
  {/if}
  <FileInput bind:files multiple={false} accept="image/*">
    Project logo: drag/drop file or click.
  </FileInput>
  <Editor
    bind:value={data.project.description}
    preview={false}
    name="description"
    placeholder="project description"
    rows="10"
    title="project description"
  />

  <div>
    <h4>Project Users</h4>
    <UserPicker bind:uids={users} />
    <div class="users">
      {#each users as uid}
        {#await client.collection("users").getOne(uid) then user}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span
            class:assignee={uid === config.assignee}
            class="user"
            on:click={(e) => e.ctrlKey && toggleAssignee(uid)}
            >{user.name || user.username}</span
          >
        {/await}
      {:else}
        <span>No users selected</span>
      {/each}
    </div>
    <small>
      <kbd>Ctrl-Click</kbd> to toggle default assignee for the project.
    </small>
  </div>
  <div class="actions">
    <button type="submit">Save</button>
    <a href={back}><button type="button">Cancel</button></a>
  </div>
</form>

<style lang="scss">
  img.thumb {
    max-height: 100px;
    max-width: 100px;
  }
  .flex {
    button {
      margin: 0;
      padding: 0;
      border-radius: 50%;
      width: 1.5em;
      height: 1.5em;
    }
  }
  .users {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    .user {
      border: var(--primary-button-dark) solid 1px;
      border-radius: 999px;
      padding: 0.25em 0.5em;
      &.assignee {
        background-color: var(--primary-button-dark);
      }
    }
  }
</style>
