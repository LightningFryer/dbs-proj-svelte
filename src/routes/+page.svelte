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

		gsap.from(mainText.words, {
			opacity: 0,
			duration: 0.7,
			stagger: 0.2,
			yPercent: 50,
			ease: 'back.out',
			onComplete: () => {
				gsap.fromTo(
					'.book-hotel-btn',
					{ yPercent: 50, autoAlpha: 0 },
					{ duration: 0.3, yPercent: 0, autoAlpha: 1 }
				);
			}
		});
	});
</script>

<Navbar />

<div class="flex h-screen flex-row items-center justify-center gap-2">
	<div class="flex flex-col items-center justify-center gap-2">
		<div class="flex flex-col gap-y-2">
			<h1 class="font-bebas text-8xl font-bold" id="main-text">Welcome to our humble Hotel!</h1>
		</div>
		{#key $session}
			{#if $session?.data?.user}
				<a href="/book_room" class="btn btn-xl book-hotel-btn opacity-0">Book A Room Now</a>
			{:else}
				<button class="btn btn-xl book-hotel-btn opacity-0" onclick={signIn}>Sign In To Book Rooms</button>
			{/if}
		{/key}
	</div>
</div>
