<script lang="ts">
	import { authClient } from '$lib/authClient';
	import type { Session } from 'better-auth';
	import { onMount } from 'svelte';

	// List of admin emails
	let adminEmails = ['admin@example.com'];
	const session = authClient.useSession();

	async function signIn() {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/',
			errorCallbackURL: '/'
		});
	}

	async function signOut() {
		await authClient.signOut();
	}
</script>

<nav class="navbar bg-base-100 fixed z-10 shadow-md">
	<div class="navbar-start">
		<a href="/" class="btn btn-ghost rounded-md text-4xl">Hotel</a>
	</div>

	<div class="navbar-end space-x-2">
		{#if $session?.data?.user && adminEmails.includes($session?.data.user.email)}
			<div>*ADMIN*</div>
		{:else}
			<div>*NOT ADMIN*</div>
		{/if}

		{#if $session?.data?.user}
			<button class="btn" on:click={signOut}>Sign out</button>
		{:else}
			<button class="btn" on:click={signIn}>Sign in</button>
		{/if}

		{#if $session?.data?.user}
			<a class="btn" href="/dashboard">Dashboard</a>
			<a class="btn" href="/dashboard">Bookings</a>
		{/if}
	</div>
</nav>
