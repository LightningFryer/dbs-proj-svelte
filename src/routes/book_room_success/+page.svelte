<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<main>
	Hi you booked a room!
	<a href="/">Go back!</a>
</main>
