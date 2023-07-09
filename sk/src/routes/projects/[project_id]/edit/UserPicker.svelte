<script lang="ts">
  import Dialog from "$lib/components/Dialog.svelte";
  import { watch } from "$lib/pocketbase";
  import Paginator from "$lib/pocketbase/Paginator.svelte";
  export let uids: string[];
  const users = watch("users");
</script>

<Dialog>
  <button type="button" slot="trigger">Select Users</button>
  <Paginator store={users} />
  <table>
    <tbody>
      {#each $users.items as user}
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
  <Paginator store={users} />
</Dialog>
