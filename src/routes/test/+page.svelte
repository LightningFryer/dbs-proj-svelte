<script>
	import Navbar from '$lib/components/Navbar.svelte'; // Adjust the path as needed
	import { onMount } from 'svelte';
	let { data } = $props();
	console.log(data.results);
	// console.log(data.fieldsJSON);

	// Fetch data on mount
	onMount(async () => {
		//   const res = await fetch("/api/rooms"); // Adjust the API endpoint
		//   rowsJSON = await res.json();
	});
</script>

<Navbar />

<div class="flex h-screen flex-col items-center justify-center">
	<div class="flex h-full w-full flex-col items-center justify-center">
		<div class="h-[60%] w-[80%] overflow-y-scroll overflow-x-auto rounded-sm border-4">
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
