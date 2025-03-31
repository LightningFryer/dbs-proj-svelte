<script>
	import Navbar from '$lib/components/Navbar.svelte'; // Adjust path as needed
	import { onMount } from 'svelte';
	import { authClient } from '$lib/authClient';
	import { gsap } from 'gsap';
	import SplitType from 'split-type';

	const session = authClient.useSession();

	async function signIn() {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/',
			errorCallbackURL: '/'
		});
	}

	onMount(() => {
		gsap.from('.landing-anim-sel', {
			opacity: 0,
			duration: 1,
			stagger: 0.2,
			yPercent: 100,
			ease: 'back.out'
		});
	});
</script>

<svelte:head>
	<title>Hotel | Welcome</title>
</svelte:head>

<Navbar />

<main class="flex h-screen flex-row items-center justify-center gap-2">
	<div class="flex flex-col items-center justify-center gap-2">
		<div class="flex flex-col gap-y-2">
			<div class="mb-7 flex flex-col gap-2">
				<h1 class="landing-anim-sel font-inria-sans text-center text-5xl text-white" id="main-text">
					In A Great Hotel, You Don’t
				</h1>
				<h1 class="landing-anim-sel font-inria-sans text-center text-5xl text-white" id="main-text">
					Just Stay, You Belong
				</h1>

				<p class="landing-anim-sel font-inria-sans mt-2 text-center text-xl text-white">
					Luxury, Comfort, and a Place to Call Home
				</p>
			</div>
		</div>
		{#key $session}
			{#if $session?.data?.user}
				<a
					href="/book_room"
					class="landing-anim-sel btn btn-xl book-hotel-btn font-jua rounded-[13px] border-transparent bg-[#030B49] font-light text-[#EDEDED] shadow-none"
					>Book A Room Now</a
				>
			{:else}
				<button
					class="landing-anim-sel btn btn-xl book-hotel-btn font-jua rounded-[13px] border-transparent bg-[#030B49] font-light text-[#EDEDED] shadow-none"
					onclick={signIn}>Sign In To Book Rooms</button
				>
			{/if}
		{/key}
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
