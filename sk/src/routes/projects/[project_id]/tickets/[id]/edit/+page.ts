import { client } from "$lib/pocketbase";
import type { TicketsResponse } from "$lib/pocketbase/generated-types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async function ({ params: { id } }) {
  const item: TicketsResponse =
    id === "new"
      ? ({} as TicketsResponse)
      : await client.collection("tickets").getOne<TicketsResponse>(id);

  return {
    item,
  };
};
