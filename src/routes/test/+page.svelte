<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	let { data } = $props();

	let resultsTable = $state([]);
	let fieldsTable = $state([]);

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const results = urlParams.get('results');
		const fields = urlParams.get('fields');
		if (results && fields) {
			resultsTable = JSON.parse(decodeURIComponent(results));
			fieldsTable = JSON.parse(decodeURIComponent(fields));
		}
		console.log(fields);
	});
</script>

<Navbar />

<div class="flex h-screen flex-col items-center justify-center">
	<div class="flex h-full w-full flex-col items-center justify-center gap-y-2">
		<div class="h-[60%] w-[80%] overflow-x-auto overflow-y-scroll rounded-sm border-4">
			<form action="?/runQuery" method="post">
				<input name="query" class="input" />
				<button class="btn" type="submit">RUN</button>
			</form>
			<table class="table">
				<thead>
					<tr>
						<th>RID</th>
						<th>Category</th>
						<th>Food Included?</th>
						<th>Price</th>
					</tr>
				</thead>

				<tbody>
					{#each data.results as row, index}
						<tr>
							<th>{row[0]}</th>
							<th>{row[1]}</th>
							<th>{row[2]}</th>
							<th>{row[3]}</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
