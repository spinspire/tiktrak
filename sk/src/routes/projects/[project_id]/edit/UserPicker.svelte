<script lang="ts">
  import Dialog from "$lib/components/Dialog.svelte";
  import { client } from "$lib/pocketbase";
  import type { UsersResponse } from "$lib/pocketbase/generated-types";
  export let uids: string[];
  export let choices: UsersResponse[] | undefined;
  export let filter = "";
  async function load() {
    if (choices === undefined) {
      choices = await client
        .collection("users")
        .getFullList<UsersResponse>({ filter });
    }
  }
</script>

<Dialog>
  <button on:click={load} type="button" slot="trigger">Select Users</button>
  <div class="wrapper">
    <h4>Select Users</h4>
    <table>
      <tbody>
        {#each choices ?? [] as user}
          <tr>
            <td>
              <label>
                <input
                  type="checkbox"
                  name="uids"
                  bind:group={uids}
                  value={user.id}
                />
                {user.name || user.username}
              </label>
            </td>
          </tr>
        {:else}
          <tr>
            <td>No users found.</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</Dialog>

<style>
  .wrapper {
    max-width: 30em;
  }
</style>
