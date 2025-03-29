<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Navbar />
<main class="flex h-screen flex-col items-center justify-center">
	<h1 class="text-6xl">Manage Employees</h1>
</main>
