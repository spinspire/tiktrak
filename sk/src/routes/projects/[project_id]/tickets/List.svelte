<script lang="ts">
  import { watch } from "$lib/pocketbase";
  import Paginator from "$lib/pocketbase/Paginator.svelte";
  import type { TicketsResponse } from "$lib/pocketbase/generated-types";
  export let project_id: string;
  $: store = watch<TicketsResponse>("tickets", {
    filter: `project="${project_id}"`,
    sort: "-updated",
    expand: "creator",
  });
</script>

<h4>Tickets</h4>
<Paginator {store} />

<table>
  <thead>
    <tr>
      <th>type</th>
      <th>title</th>
      <th>status</th>
      <th>creator</th>
      <th>updated</th>
    </tr>
  </thead>
  <tbody>
    {#each $store.items as item}
      <tr>
        <td>{item.type}</td>
        <td> <a href={`./tickets/${item.id}/edit`}> {item.title}</a></td>
        <td>{item.status || "-"}</td>
        <td>{item.expand?.creator?.name || "-"}</td>
        <td>{new Date(item.updated).toLocaleString()}</td>
      </tr>
    {:else}
      <tr>
        <td colspan="3">No records found.</td>
      </tr>
    {/each}
  </tbody>
</table>

<Paginator {store} />
