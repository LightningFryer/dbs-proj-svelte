<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte'; 
	import { onMount } from 'svelte';
	let { data } = $props();
	console.log(data.results);

	let Cally;
	let roomDateRange = $state('');
	let calendarElement;

	onMount(async () => {
		// Import Cally
		Cally = (await import('cally')).default;
		
		// Get the calendar element after it's rendered
		setTimeout(() => {
			// Add event listener to the calendar element
			const calendarRangeElement = document.querySelector('calendar-range');
			if (calendarRangeElement) {
				calendarRangeElement.addEventListener('change', (event) => {
					// Update the Svelte state with the new value
					roomDateRange = event.target.value;
					console.log('Calendar value changed:', roomDateRange);
				});
			}
		}, 100);
	});

	// This function isn't being used since the calendar component 
	// needs to have its event listener attached directly
	function updateRoomDateRange(event) {
		roomDateRange = event.target.value;
		console.log(roomDateRange);
	}
</script>

<Navbar />

<div class="flex h-screen flex-col items-center justify-center">
	<div class="flex h-full w-full flex-col items-center justify-center gap-y-2">
		<div class="h-[60%] w-[80%] overflow-x-auto overflow-y-scroll rounded-sm border-4">
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
		
		<calendar-range
			bind:this={calendarElement}
			value={roomDateRange}
			class="cally bg-base-100 border-base-300 rounded-box border shadow-lg"
		>
			<svg
				aria-label="Previous"
				class="size-4 fill-current"
				slot="previous"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg
			>
			<svg
				aria-label="Next"
				class="size-4 fill-current"
				slot="next"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg
			>
			<calendar-month></calendar-month>
		</calendar-range>
		<p class="p-3 text-7xl">{roomDateRange}</p>
	</div>
</div>