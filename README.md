# TikTrak

This application is derived from [pocketbase-sveltekit-starter](https://github.com/spinspire/pocketbase-sveltekit-starter) with a
[PocketBase](https://pocketbase.io/) backend
with [SvelteKit](https://kit.svelte.dev) frontend.

# Developer Guide

Foundational developer information is available in the [pocketbase-sveltekit-starter](https://github.com/spinspire/pocketbase-sveltekit-starter) project. So please read that for setup, built, code organization etc.

Data Model is described in the [application's home page](./sk/src/routes/%2Bpage.md).

## Sample Data

When starting from scratch (empty PocketBase DB), the system **could** automatically generate sample data (users, projects, tickets, hooks, etc.) if you have set the SAMPLE_DATA_DOMAIN. This step is skipped if this variable is not set in `.env` file.

See `pb/pb_migrations/*_import_data.js` for the details of generated sample data.

## Sample Hooks

If sample data (above) is enabled, then you will also see some `hooks` being generated. These hooks are `disabled=true` by default. If you want to use them, then you must enable them manually.

# Feedback

Please provide feedback by
[opening an issue](https://github.com/spinspire/tiktrak/issues/new)
or
[starting a discussion](https://github.com/spinspire/tiktrak/discussions).
