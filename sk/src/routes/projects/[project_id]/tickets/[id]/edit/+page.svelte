<script lang="ts">
  import { goto } from "$app/navigation";
  import { authModel, save } from "$lib/pocketbase";
  import { alertOnFailure } from "$lib/pocketbase/ui";
  import type { PageData } from "./$types";
  export let data: PageData;
  async function submit(e: SubmitEvent) {
    data.item.project = data.project.id;
    alertOnFailure(async () => {
      await save("tickets", data.item);
      goto("../../..");
    });
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
