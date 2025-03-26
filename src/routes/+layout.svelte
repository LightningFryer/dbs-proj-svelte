<script lang="ts">
	import '../app.css';

	let { children } = $props();
	import ViewTransition from '$lib/components/Navigation.svelte';
</script>

<ViewTransition />
{@render children()}
