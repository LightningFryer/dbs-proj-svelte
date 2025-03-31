<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let bookedRoomData = data.bookedRoomData;
</script>

<main class="flex h-screen flex-col items-center justify-center">
	<div class="card bg-base-100 card-xl min-w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title font-kanit font-light">BOOKING DETAILS</h2>
			<div class="list-row flex w-full flex-col">
				<div class="card card-side min-w-full bg-[#FEFEFE]/50 shadow-sm">
					<figure>
						<img
							src={`/src/lib/images/room_${bookedRoomData[1].toLowerCase()}.jpg`}
							alt="room_img"
							class="max-h-64"
						/>
					</figure>
					<div class="card-body">
						<h2 class="card-title font-kanit text-3xl tracking-wider">
							{bookedRoomData[1].toUpperCase()} ROOM
						</h2>
						<div class="divider m-0"></div>
						{#if bookedRoomData[2] == 'Yes'}
							<p class="font-kanit font-semibold tracking-wide text-[#4A4A4A]">Meal Included</p>
						{:else}
							<p class="font-kanit font-semibold tracking-wide text-[#4A4A4A]">Meal not included</p>
						{/if}

						<div class="card-actions items-center justify-between">
							<div class="flex flex-row gap-x-4">
								<div class="flex flex-col">
									<p class="font-kanit tracking-wide text-[#4A4A4A]">Total price paid</p>
									<p class="font-kanit text-2xl text-black">
										{bookedRoomData[3] * bookedRoomData[6]} Rs
									</p>
								</div>

								<div class="flex flex-col">
									<p class="font-kanit tracking-wide text-[#4A4A4A]">Check In Date</p>
									<p class="font-kanit text-2xl text-black">
										{bookedRoomData[4]}
									</p>
								</div>

								<div class="flex flex-col">
									<p class="font-kanit tracking-wide text-[#4A4A4A]">Check Out Date</p>
									<p class="font-kanit text-2xl text-black">
										{bookedRoomData[5]}
									</p>
								</div>

								<div class="flex flex-col">
									<p class="font-kanit tracking-wide text-[#4A4A4A]">Days Booked</p>
									<p class="font-kanit text-2xl text-black">{bookedRoomData[6]}</p>
								</div>

								<div class="flex flex-col">
									<p class="font-kanit tracking-wide text-[#4A4A4A]">Guests</p>
									<p class="font-kanit text-2xl text-black">{bookedRoomData[7]}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="card-actions justify-center">
				<a
					class="btn font-jua rounded-[13px] border-transparent bg-[#030B49] font-light text-[#EDEDED] shadow-none"
					href="/bookings">Go To Bookings</a
				>
			</div>
		</div>
	</div>
</main>
