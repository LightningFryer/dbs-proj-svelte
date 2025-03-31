<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/authClient';
	import { redirect } from '@sveltejs/kit';
	import type { Session } from 'better-auth';
	import { onMount } from 'svelte';

	import { adminEmails } from '$lib/adminEmails';
	// List of admin emails
	const session = authClient.useSession();

	async function signIn() {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/',
			errorCallbackURL: '/'
		});
	}

	async function signOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					window.location.reload();
				}
			}
		});
	}
</script>

<nav class="navbar fixed z-10 bg-[#213B65]/30 text-white shadow-md backdrop-blur-sm">
	<div class="navbar-start">
		<a
			href="/"
			class="btn btn-ghost btn-xl font-kanit border-transparent font-light text-[#EDEDED] shadow-none hover:bg-[#030B49]"
			>Hotel</a
		>
	</div>

	<div class="navbar-end space-x-2">
		{#if $session?.data?.user && adminEmails.includes($session?.data.user.email)}
			<div>*ADMIN*</div>
		{:else}
			<div>*NOT ADMIN*</div>
		{/if}

		{#if $session?.data?.user}
			<button
				class="btn font-jua rounded-[13px] border-transparent bg-[#030B49] font-light text-[#EDEDED] shadow-none"
				on:click={signOut}>Sign out</button
			>
		{:else}
			<button
				class="btn font-jua rounded-[13px] border-transparent bg-[#030B49] font-light text-[#EDEDED] shadow-none"
				on:click={signIn}>Sign in</button
			>
		{/if}

		{#if $session?.data?.user}
			<a
				class="btn font-jua rounded-[13px] border-transparent bg-[#030B49] font-light text-[#EDEDED] shadow-none"
				href="/bookings">Bookings</a
			>
		{/if}

		{#if $session.data?.user && adminEmails.includes($session.data.user.email)}
			<a
				class="btn font-jua rounded-[13px] border-transparent bg-[#030B49] font-light text-[#EDEDED] shadow-none"
				href="/dashboard">Dashboard</a
			>
		{/if}
	</div>
</nav>
