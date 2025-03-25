<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';

	let { data }: { data: PageData } = $props();
	console.log(data.bookingData[0])
</script>

<Navbar />
<main class="flex h-screen flex-col items-center justify-center">
	<ul class="list bg-base-100 rounded-box h-[70%] w-[80%] overflow-y-auto shadow-md">
		<li class="font-bebas p-4 pb-2 text-4xl tracking-wide">Rooms you have booked</li>

		{#each data.bookingData[0] as row}
			<form class="" method="post" action="?/cancelBooking">
				<input name="room_id" class="invisible hidden w-0" value={row[0]} />
				<li class="list-row">
					<div class="text-4xl font-thin tabular-nums opacity-30">{row[0]}</div>
					<div class="list-col-grow">
						<div>{row[1]}</div>
						<div class="text-xs font-semibold uppercase opacity-60">
							Food Included: {row[2]}
						</div>
					</div>
					<div class="flex flex-row items-center justify-center gap-4">
						<!-- <p class="font-bebas text-2xl font-bold">RS {row[3]}</p> -->
						<button class="btn" type="submit">Cancel Booking</button>
					</div>
				</li>
			</form>
		{/each}
	</ul>
</main>