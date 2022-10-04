# PocketBase / SvelteKit Demo App

A starter-kit showing how to use _customized_
[PocketBase](https://pocketbase.io/) as a backend
to [SvelteKit](https://kit.svelte.dev) frontend.
This is a high-performance frontend+backend combination since frontend
is static and backend is a single compiled Golang binary (JAMstack).

- SvelteKit frontend is fully static, client-side only so that here is no need
  for NodeJS at runtime. It is generated using [`adapter-static`](https://github.com/sveltejs/kit/tree/master/packages/adapter-static)
- PocketBase provides complete (and _fast_) backend including:
  - databse (SQLite)
  - CRUD API for database
  - realtime subscriptions for LIVE data (server push to browser)
  - Authentication and Authorization (email + social login)
  - file storage (local filesystem or S3)
- PocketBase can be downloaded as binary. But if you want to extend it with
  custom Golang code then code is included to compile it locally with
  extensions such as custom endpoints (e.g. `/api/hello`) and database event
  hooks (e.g. executing Go handler functions when a database row is created)

## Setup

Follow these step EXACTLY, or else it won't work.

1. Follow [./backend/README.md](./backend/README.md)
2. Follow [./frontend/README.md](./frontend/README.md)

## Developing

After you've done the setup in the above two README files, run
the backend and the frontend in dev mode.

```bash
npm run backend:dev
npm run dev
```

Now making changes in the Svelte code (frontend) or Go code (backend) will show
results (almost) immediately.

## Building

To create a production version of your app:

```bash
npm run build
```

The above creates `backend/pocketbase` (customized version) and client-app
in `frontend/build`.

Now not only can you serve this app with `npm run preview` but much better ...
_you can serve it statically using PocketBase_ using `--publicDir ../frontend/build` option
So now just visting `http://127.0.0.1:8090/`
will serve your SvelteKit frontend along with your PocketBase backend - a
single binary serving frontend, backend, API, auth, uploaded files, etc.

# Configurable Hooks

Please read about the "hooks" system in [./backend/README.md](./backend/README.md)
It is a very easy and powerful way to extend your application with minimal
configuration and perhaps no code.

# Feedback

Please provide feedback by
[opening an issue](https://github.com/spinspire/pocketbase-sveltekit-starter/issues/new)
or
[starting a discussion](https://github.com/spinspire/pocketbase-sveltekit-starter/discussions).
