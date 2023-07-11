import { client } from "$lib/pocketbase";
import type { ProjectsResponse } from "$lib/pocketbase/generated-types";
import { ClientResponseError } from "pocketbase";
import type { LayoutLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: LayoutLoad = async function ({ params: { project_id } }) {
  try {
    const project: ProjectsResponse =
      project_id === "new"
        ? ({ users: [] } as ProjectsResponse)
        : await client
            .collection("projects")
            .getOne<ProjectsResponse>(project_id, { expand: "users" });
    return {
      project,
    };
  } catch (e) {
    if (e instanceof ClientResponseError && e.status === 404) {
      // replace ClientResponseError with HttpError
      throw error(
        404,
        "Project not found. Make sure it exists and you have access."
      );
    }
    throw e; // else just rethrow
  }
};
