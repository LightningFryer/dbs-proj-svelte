<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	let Pikaday;
	let checkInPickerField: any = $state('');
	let checkOutPickerField: any = $state('');
	let checkInPicker: any;
	let checkOutPicker: any;
	let checkInDate = $state('');
	let checkOutDate = $state('');
	let guestCount = $state(1);
	onMount(() => {
		(async () => {
			Pikaday = (await import('pikaday')).default;
			if (checkInPickerField && checkOutPickerField) {
				checkInPicker = new Pikaday({
					field: checkInPickerField,
					minDate: new Date(),
					onSelect: function (date) {
						// Store the formatted date when selected
						const day = date.getDate();
						const month = date.getMonth() + 1;
						const year = date.getFullYear();
						checkInDate = `${year}-${month}-${day}`;
					}
					// Rest of your config...
				});

				checkOutPicker = new Pikaday({
					field: checkOutPickerField,
					minDate: new Date(),
					onSelect: function (date) {
						// Store the formatted date when selected
						const day = date.getDate();
						const month = date.getMonth() + 1;
						const year = date.getFullYear();
						checkOutDate = `${year}-${month}-${day}`;
					}
					// Rest of your config...
				});
			}
		})();
	});

	let { data }: { data: PageData } = $props();
	console.log(data.results);
</script>

<Navbar />
<main class="flex h-screen flex-row gap-x-5 pt-24 pr-12 pl-12">
	<ul class="list rounded-box h-[100%] w-[60%] overflow-y-auto bg-[#D9D9D9] p-8 shadow-md">
		<!-- <li class="font-bebas p-4 pb-2 text-4xl tracking-wide">Rooms Available</li> -->

		{#each data.results as row}
			<form class="w-full" method="post" action="?/bookRoom">
				<input name="room_id" class="invisible hidden w-0" value={row[0]} />
				<input
					type="text"
					name="check_in_date"
					class="invisible hidden w-0"
					bind:this={checkInPickerField}
					value={checkInDate}
				/>
				<input
					type="text"
					class="invisible hidden w-0"
					name="check_out_date"
					bind:this={checkOutPickerField}
					value={checkOutDate}
				/>
				<input type="number" name="guests" class="invisible hidden w-0" bind:value={guestCount} />
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
								<div class="flex flex-col">
									<p class="font-kanit tracking-wide text-[#4A4A4A]">Total price</p>
									<p class="font-kanit text-2xl text-black">{row[3]}/night</p>
								</div>
								<button class="btn font-kanit bg-[#6C0002] font-normal text-white"
									>Select Room</button
								>
							</div>
						</div>
					</div>
				</li>
			</form>
		{/each}
	</ul>
	<div class="flex w-[40%] flex-col">
		<div class="flex flex-row rounded-[18px] bg-[#FEFEFE]">
			<div class="flex flex-col p-5">
				<h2 class="font-jua text-xl text-[#898989]">Check In</h2>
				<input
					type="text"
					class="input pika-single font-jua text-[#474747]"
					bind:this={checkInPickerField}
					onchange={() => {
						console.log(checkInPicker.toString('YYYY-MM-DD'));
					}}
					value="Pick a day"
				/>
			</div>
			<div class="divider lg:divider-horizontal"></div>
			<div class="flex flex-col p-5">
				<h2 class="font-jua text-xl text-[#898989]">Check Out</h2>
				<input
					type="text"
					class="input pika-single font-jua text-[#474747]"
					bind:this={checkOutPickerField}
					onchange={() => {
						console.log(checkOutPicker.toString('YYYY-MM-DD'));
					}}
					value="Pick a day"
				/>
			</div>
			<div class="divider lg:divider-horizontal divider-divide-black"></div>
			<div class="flex flex-col p-5">
				<h2 class="font-jua text-xl text-nowrap text-[#898989]">Guests</h2>
				<input
					type="number"
					class="input pika-single font-jua text-[#474747]"
					bind:value={guestCount}
				/>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		background-image: url('src/lib/images/landing_bg.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: top;
	}
</style>
