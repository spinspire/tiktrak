import { client } from "$lib/pocketbase";
import type { PageLoad } from "./projects/$types";

export const load: PageLoad = async () => {
  const projects = await client.collection("projects").getFullList();
  return {
    projects,
  };
};
