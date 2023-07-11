<script lang="ts">
  import { goto } from "$app/navigation";
  import { Admin } from "pocketbase";
  import { authModel } from "../pocketbase";
  import LoginForm from "./LoginForm.svelte";
  export let adminOnly = false;
  export let slotLogin = false;
  export let destination: string | null = null;
  $: if (destination != null && $authModel) {
    goto(destination);
  }
</script>

{#if $authModel && (!adminOnly || $authModel instanceof Admin)}
  <slot />
{:else if slotLogin || $$slots["login"]}
  <slot name="login">
    <LoginForm />
  </slot>
{/if}
