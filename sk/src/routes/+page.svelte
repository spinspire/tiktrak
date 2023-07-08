<script lang="ts">
  import { metadata } from "$lib/app/stores";
  import LoginGuard from "$lib/components/LoginGuard.svelte";
  import List from "$lib/components/projects/List.svelte";
  $metadata.title = "Home";
</script>

<LoginGuard slotLogin={true} destination="/projects">
  Redirecting ...
</LoginGuard>
