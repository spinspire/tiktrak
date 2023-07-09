import { client, watch, type PageStore } from "$lib/pocketbase";
import type {
  CommentsResponse,
  TicketsResponse,
} from "$lib/pocketbase/generated-types";
import { readable, type Readable } from "svelte/store";
import type { PageLoad } from "./$types";

export const load: PageLoad = async function ({ params: { id } }) {
  const item: TicketsResponse =
    id === "new"
      ? ({} as TicketsResponse)
      : await client.collection("tickets").getOne<TicketsResponse>(id);
  const comments: PageStore<CommentsResponse> | undefined =
    id === "new"
      ? undefined
      : watch("comments", {
          filter: `ticket="${id}"`,
          expand: "user",
        });

  return {
    item,
    comments,
  };
};
