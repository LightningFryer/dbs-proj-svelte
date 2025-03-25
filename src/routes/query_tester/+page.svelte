<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let results = $state([]);
	let fields = $state([]);
	function handleResponse({ update }) {
		update(({ form }) => {
			results = form?.results || [];
			fields = form?.fieldsJSON || [];
		});
	}
</script>

<main class="flex h-screen flex-col items-center justify-center gap-y-5">
	<form
		class="flex flex-row gap-x-2"
		action="?/runQuery"
		method="POST"
		use:enhance={({ formElement, formData, action, cancel, submitter }) => {

			return async ({ result, update }) => {
				
			};
		}}
	>
		<input name="query" type="text" placeholder="Enter query here" class="input" />
		<button class="btn" type="submit">Run</button>
	</form>

	{#if !results.length}
		<h1 class="font-bebas text-8xl">No query run yet</h1>
	{:else}
		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr>
						{#each fields as field}
							<th>{field.name as string}</th>
						{/each}
					</tr>
				</thead>
			</table>
		</div>
	{/if}
</main>
