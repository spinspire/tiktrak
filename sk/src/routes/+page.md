<script lang="ts">
  import { site, sponsor } from "$lib/config";
</script>

_{site.name}_ is a ticket tracking application built on top of [pocketbase-sveltekit-starter](https://github.com/spinspire/pocketbase-sveltekit-starter). Thank you for using it. We'd love to hear your [feedback]({site.source_url}/discussions).

Please read the _help_ section below before using this application. But if you're already familiar, then go ahead and explore your [projects](projects).

## Help

_{site.name}_ is a ticket tracking application. We try to keep it simple, minimal, but useful.

## Data Model

- There are `users` (once signed up and signed in)
- `users` are assigned to `projects` (at least one).
- `projects` have `tickets`.
- `tickets` have ...
  - `comments`
  - `attachments` (uploaded files/images)

## Sign-In / Sign-Up

You must sign-up (create an account) and then sign-in (login) to the app before you can use it. Both email/password and social login (sign-in with ...) are supported.

If you just signed-up then you might not see any `projects` or `tickets`. For that an administrator has to assign you to some project(s).

## Tickets, Comments, and Attachments

Once you are in a project, you can view, updated, and create tickets. Tickets are of various types, such as `question`, `task`, `bug`, `feature`, etc. Also pay attention to their titles, description, status, and assignee fields.

- Add `comments` as needed.
- Add `attachments` (uploaded files/images) as needed.
- Overall, use ticket editing to guide the ticket through its lifecycle to completion status.

## Editor and markdown text

Whenever you see a `textarea` (or multi-line text editor), you can use the [Markdown format](https://www.markdownguide.org/getting-started/) which looks a lot like plain text, but still lets you use common formatting such as headings, bullets, hyperlinks, code, etc.

## Editor and file/image attachment copy/paste

In the editor, you can simply copy/paste files or clipboard images into it. The editor automatically ...

- uploads the files/images to turn them into `attachments`
- determines the URL of the uploaded files
- generates markdown text to turn them into image-embeds or file-download links as appropriate, e.g. `![image.png](<url-of-uploaded-image.png>)`

![pasting a file into the editor](screenshots/editor-file-paste.png)
