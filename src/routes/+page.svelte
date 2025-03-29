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

	// Run GSAP animation on mount
	onMount(() => {
		const mainText = new SplitType('#main-text');

		// gsap.from(mainText.words, {
		// 	opacity: 0,
		// 	duration: 0.5,
		// 	stagger: 0.2,
		// 	yPercent: 50,
		// 	ease: 'back.out',
		// 	onComplete: () => {
		// 		gsap.fromTo(
		// 			'.book-hotel-btn',
		// 			{ yPercent: 50, autoAlpha: 0 },
		// 			{ duration: 0.3, yPercent: 0, autoAlpha: 1 }
		// 		);
		// 	}
		// });
	});
</script>

<Navbar />

<main class="flex h-screen flex-row items-center justify-center gap-2">
	<div class="flex flex-col items-center justify-center gap-2">
		<div class="flex flex-col gap-y-2">
			<div class="mb-7 flex flex-col gap-2">
				<h1 class="font-inria-sans text-center text-5xl text-white" id="main-text">
					In A Great Hotel, You Don’t
				</h1>
				<h1 class="font-inria-sans text-center text-5xl text-white" id="main-text">
					Just Stay, You Belong
				</h1>

				<p class="font-inria-sans mt-2 text-center text-xl text-white">
					Luxury, Comfort, and a Place to Call Home
				</p>
			</div>
		</div>
		{#key $session}
			{#if $session?.data?.user}
				<a
					href="/book_room"
					class="btn btn-xl book-hotel-btn font-jua rounded-[13px] border-transparent bg-[#030B49] font-light text-[#EDEDED] shadow-none"
					>Book A Room Now</a
				>
			{:else}
				<button
					class="btn btn-xl book-hotel-btn font-jua rounded-[13px] border-transparent bg-[#030B49] font-light text-[#EDEDED] shadow-none"
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
