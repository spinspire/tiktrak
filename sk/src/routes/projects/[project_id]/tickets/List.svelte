<script lang="ts">
  import Alerts from "$lib/components/Alerts.svelte";
  import { watch } from "$lib/pocketbase";
  import Paginator from "$lib/pocketbase/Paginator.svelte";
  import type {
    ProjectsResponse,
    TicketsResponse,
  } from "$lib/pocketbase/generated-types";
  export let project: ProjectsResponse;
  let filters: { [key: string]: string };
  let type: string | undefined = undefined;
  let status: string | undefined = undefined;
  let assignee: string | undefined = undefined;
  let creator: string | undefined = undefined;
  let title = "";
  let priority: "+" | "-" | undefined = undefined;
  let updated: "+" | "-" | undefined = "-";
  $: sorts = {
    priority,
    updated,
  };
  $: sort = Object.entries(sorts)
    .filter(([k, v]) => v !== undefined)
    .map(([k, v]) => v + k)
    .join(",");
  $: filters = {
    project: project.id,
    type,
    status,
    assignee,
    creator,
  };
  $: filter = Object.entries(filters)
    .filter(([k, v]) => v !== undefined)
    .map(([k, v]) => `${k}="${v}"`)
    .join(" && ");
  $: title_filter = title ? ` && title ~ "${title}"` : "";
  $: store = watch<TicketsResponse>(
    "tickets",
    {
      filter: filter + title_filter,
      sort,
      expand: "creator,assignee",
    },
    undefined, // page
    undefined, // perPage
    false // realtime
  );
  function collectExpand(items: any, key: string, accum: any[] = []) {
    if (!items) return;
    return items.reduce((accum, item) => {
      const record = item.expand[key];
      if (record && !accum.find(({ id }) => id === record.id)) {
        accum.push(record);
      }
      return accum;
    }, accum);
  }
  $: assignees = collectExpand($store.items, "assignee", assignees);
  $: creators = collectExpand($store.items, "creator", creators);
</script>

<h4>Tickets</h4>
<Paginator {store} />

<table>
  <thead>
    <tr>
      <th
        >type
        <select bind:value={type} title="filter by type">
          <option value={undefined} />
          {#each project.config.types as t}
            <option>{t}</option>
          {/each}
        </select>
      </th>
      <th
        >title
        <input
          title="filter by title"
          type="text"
          bind:value={title}
          placeholder="search string"
          style="width: 6em"
        />
      </th>
      <th
        >status
        <select bind:value={status} title="filter by status">
          <option value={undefined} />
          {#each project.config.statuses as t}
            <option>{t}</option>
          {/each}
        </select>
      </th>
      <th
        >priority
        <select bind:value={priority} title="sort by priority">
          <option value={undefined} />
          <option value="+">&uarr;</option>
          <option value="-">&darr;</option>
        </select>
      </th>
      <th>estimate<br />/budget</th>
      <th
        >assignee
        <select bind:value={assignee} title="filter by assignee">
          <option value={undefined} />
          {#each assignees as user}
            <option value={user.id}>{user.name || user.username}</option>
          {/each}
        </select>
      </th>
      <th
        >creator
        <select bind:value={creator} title="filter by creator">
          <option value={undefined} />
          {#each creators as user}
            <option value={user.id}>{user.name || user.username}</option>
          {/each}
        </select>
      </th>
      <th
        >updated
        <select bind:value={updated} title="sort by updated">
          <option value={undefined} />
          <option value="+">&uarr;</option>
          <option value="-">&darr;</option>
        </select>
      </th>
    </tr>
  </thead>
  <tbody>
    {#each $store.items as item}
      {@const updated = new Date(item.updated)}
      <tr>
        <td>{item.type}</td>
        <td> <a href={`./tickets/${item.id}/edit`}> {item.title}</a></td>
        <td>{item.status || "-"}</td>
        <td>{item.priority || "-"}</td>
        <td>{item.estimate || "-"}/{item.budget || "-"}</td>
        <td>{item.expand?.assignee?.name || "-"}</td>
        <td>{item.expand?.creator?.name || "-"}</td>
        <td title={updated.toLocaleString()}>{updated.toLocaleDateString()}</td>
      </tr>
    {:else}
      <tr>
        <td colspan="3">No records found.</td>
      </tr>
    {/each}
  </tbody>
</table>

<Paginator {store} />
