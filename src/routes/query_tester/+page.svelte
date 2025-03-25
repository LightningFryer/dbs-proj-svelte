<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<main class="flex h-screen flex-col items-center justify-center gap-y-5">
	<form class="flex flex-row gap-x-2" action="?/runQuery" use:enhance method="GET">
		<input name="query" type="text" placeholder="Enter query here" class="input" />
		<button class="btn" type="submit">Run</button>
	</form>

	{#if data.results.length == 0}
		<h1 class="font-bebas text-8xl">No query run yet</h1>
	{:else}
		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr>
						<th>Name</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						{#each data.results as row}
							<th>{row}</th>
						{/each}
					</tr>
				</tbody>
			</table>
		</div>
	{/if}
</main>
