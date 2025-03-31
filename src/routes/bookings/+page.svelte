<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();
	console.log(data.bookingData[0]);
</script>

<svelte:head>
	<title>Hotel | Your Bookings</title>
</svelte:head>

<Navbar />
<main class="flex h-screen flex-col items-center justify-center">
	<ul class="list rounded-box mt-12 h-[80%] w-[80%] overflow-y-auto bg-[#D9D9D9] p-8 shadow-md">
		<li class="font-kanit rounded-md pb-2 text-4xl">ROOMS BOOKED</li>

		{#if data.bookingData[0].length != 0}
			{#each data.bookingData[0] as row}
				<form class="" method="post" use:enhance action="?/cancelBooking">
					<input name="room_id" class="invisible hidden w-0" value={row[0]} />
					<li class="list-row flex w-full flex-col">
						<div class="card card-side min-w-full bg-[#FEFEFE]/50 shadow-sm">
							<figure>
								<img
									src={`src/lib/images/room_${row[1].toLowerCase()}.jpg`}
									alt="Movie"
									class="max-h-64"
								/>
							</figure>
							<div class="card-body">
								<h2 class="card-title font-kanit text-3xl tracking-wider">
									{row[1].toUpperCase()} ROOM
								</h2>
								<div class="divider m-0"></div>
								{#if row[2] == 'Yes'}
									<p class="font-kanit font-semibold tracking-wide text-[#4A4A4A]">Meal Included</p>
								{:else}
									<p class="font-kanit font-semibold tracking-wide text-[#4A4A4A]">
										Meal not included
									</p>
								{/if}

								<div class="card-actions items-center justify-between">
									<div class="flex flex-row gap-x-4">
										<div class="flex flex-col">
											<p class="font-kanit tracking-wide text-[#4A4A4A]">Total price paid</p>
											<p class="font-kanit text-2xl text-black">{row[3] * row[10]} Rs</p>
										</div>

										<div class="flex flex-col">
											<p class="font-kanit tracking-wide text-[#4A4A4A]">Check In Date</p>
											<p class="font-kanit text-2xl text-black">
												{new Date(row[7]).getFullYear()}/{new Date(row[7]).getMonth() +
													1}/{new Date(row[7]).getDate()}
											</p>
										</div>

										<div class="flex flex-col">
											<p class="font-kanit tracking-wide text-[#4A4A4A]">Check Out Date</p>
											<p class="font-kanit text-2xl text-black">
												{new Date(row[8]).getFullYear()}/{new Date(row[8]).getMonth() +
													1}/{new Date(row[8]).getDate()}
											</p>
										</div>

										<div class="flex flex-col">
											<p class="font-kanit tracking-wide text-[#4A4A4A]">Days Booked</p>
											<p class="font-kanit text-2xl text-black">{row[10]}</p>
										</div>

										<div class="flex flex-col">
											<p class="font-kanit tracking-wide text-[#4A4A4A]">Guests</p>
											<p class="font-kanit text-2xl text-black">{row[9]}</p>
										</div>
									</div>
									<button class="btn font-kanit bg-[#6C0002] font-normal text-white"
										>Cancel Booking</button
									>
								</div>
							</div>
						</div>
					</li>
				</form>
			{/each}
		{:else}
			<div class="flex h-full w-full flex-col items-center justify-center">
				<h1 class="font-bebas text-5xl">You don't have any bookings yet!</h1>
			</div>
		{/if}
	</ul>
</main>

<style>
	main {
		background-image: url('src/lib/images/landing_bg.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: top;
	}
</style>
