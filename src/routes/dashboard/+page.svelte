<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const employeeData = data.employeeData;
</script>

<Navbar />
<main class="flex min-h-screen flex-col items-center justify-center">
	<div class="mt-16 flex h-[80%] w-[90%] flex-col items-center justify-evenly pb-12">
		<div class="font-kanit w-[50%] p-10 text-center text-6xl tracking-tight">
			<h1 class="rounded-[18px] bg-white p-5">Employee Details</h1>
		</div>
		<div class="grid grid-cols-4 gap-x-20 gap-y-10">
			{#each employeeData as employeeDataRow}
				<form action="?/fireEmployee" method="post">
					<input name="emp_id" value={employeeDataRow[0]} class="invisible hidden h-0 w-0" />
					
					<div class="card w-72 bg-[#D9D9D9] p-4 shadow-sm">
						<figure>
							{#if employeeDataRow[2] == 'Chef'}
								<img src="/src/lib/images/emp_chef.jpg" alt="emp_img" />
							{:else if employeeDataRow[2] == 'General Manager'}
								<img src="/src/lib/images/emp_gen_manager.jpg" alt="emp_img" />
							{:else if employeeDataRow[2] == 'Receptionist'}
								<img src="/src/lib/images/emp_receptionist.jpg" alt="emp_img" />
							{:else if employeeDataRow[2] == 'Guest Agent'}
								<img src="/src/lib/images/emp_guest_agent.jpg" alt="emp_img" />
							{:else if employeeDataRow[2] == 'Hospitality staff'}
								<img src="/src/lib/images/emp_hosp_agent.jpg" alt="emp_img" />
							{:else if employeeDataRow[2] == 'Food staff'}
								<img src="/src/lib/images/emp_food_staff.jpg" alt="emp_img" />
							{:else}
								<img src="/src/lib/images/emp_housekeeping.jpg" alt="emp_img" />
							{/if}
						</figure>
						<div class="card-body">
							<h2 class="card-title font-kanit text-2xl">{employeeDataRow[1]}</h2>
							<div class="flex flex-col items-center justify-center">
								<div class="flex w-full flex-row justify-between">
									<p class="font-jua text-md">Job</p>
									<p class="font-inria-sans text-md text-right">{employeeDataRow[2]}</p>
								</div>

								<div class="flex w-full flex-row justify-between">
									<p class="font-jua text-md">Date of Joining</p>
									<p class="font-inria-sans text-md text-right">
										{new Date(employeeDataRow[3]).getFullYear()}/{new Date(
											employeeDataRow[3]
										).getMonth() + 1}/{new Date(employeeDataRow[3]).getDate()}
									</p>
								</div>

								<div class="flex w-full flex-row justify-between">
									<p class="font-jua text-md">Salary</p>
									<p class="font-inria-sans text-md text-right">{employeeDataRow[4]}/-</p>
								</div>
							</div>
							<div class="card-actions justify-end">
								<button class="btn btn-error" type="submit">FIRE</button>
							</div>
						</div>
					</div>
				</form>
			{/each}
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
