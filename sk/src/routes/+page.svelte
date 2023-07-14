<script lang="ts">
  import { site, sponsor } from "$lib/config";
</script>

<p>
  {site.name} is an
  <a href={site.source_url} target="_blank" rel="noreferrer"
    >Open Source project.</a
  >
  sponsored by
  <a href={sponsor.url} target="_blank" rel="noreferrer">{sponsor.name}</a>.
</p>

<p>
  It's {site.description}. Thank you for using {site.name}. We'd love to hear
  your feedback.
</p>

<p>Now go ahead, explore your <a href="projects">projects</a>.</p>
