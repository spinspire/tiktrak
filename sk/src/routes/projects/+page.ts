import { client } from "$lib/pocketbase";
import { Admin } from "pocketbase";
import type { PageLoad } from "./projects/$types";
import { goto } from "$app/navigation";
import { base } from "$app/paths";

export const load: PageLoad = async () => {
  const projects = await client.collection("projects").getFullList();
  // send non-admins to the project detail page if they have access to only one project
  if (projects.length === 1 && !(client.authStore.model instanceof Admin)) {
    const [project] = projects;
    goto(`${base}/projects/${project.id}`);
  }
  return {
    projects,
  };
};
