import { client } from "$lib/pocketbase";
import type { ProjectsResponse } from "$lib/pocketbase/generated-types";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async function ({ params: { project_id } }) {
  const project: ProjectsResponse =
    project_id === "new"
      ? ({ users: [] } as ProjectsResponse)
      : await client
          .collection("projects")
          .getOne<ProjectsResponse>(project_id, { expand: "users" });

  return {
    project,
  };
};
