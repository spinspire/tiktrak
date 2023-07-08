import { client } from "$lib/pocketbase";
import type { PageLoad } from "./$types";

export const load: PageLoad = async function ({ url, params: { id } }) {
  const item = await client.collection("projects").getOne(id);

  return {
    item,
  };
};
