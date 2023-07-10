import { client, watch, type PageStore } from "$lib/pocketbase";
import type {
  AttachmentsResponse,
  CommentsResponse,
  TicketsResponse,
} from "$lib/pocketbase/generated-types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async function ({ params: { id } }) {
  const item: TicketsResponse =
    id === "new"
      ? ({} as TicketsResponse)
      : await client
          .collection("tickets")
          .getOne<TicketsResponse>(id, { expand: "creator" });
  const comments: PageStore<CommentsResponse> | undefined =
    id === "new"
      ? undefined
      : watch("comments", {
          filter: `ticket="${id}"`,
          expand: "user",
          sort: "created",
        });
  const attachments: PageStore<AttachmentsResponse> | undefined =
    id === "new"
      ? undefined
      : watch("attachments", {
          filter: `ticket="${id}"`,
          expand: "user",
          sort: "created",
        });

  return {
    item,
    comments,
    attachments,
  };
};
