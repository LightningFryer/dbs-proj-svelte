import { auth } from '$lib/auth';
import { connection } from '$lib/db';
import { json, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		redirect(300, '/');
	}

	const bookingData = await connection.query(
		`SELECT * FROM ROOMS, BOOKINGS WHERE ROOMS.RID = BOOKINGS.roomID AND BOOKINGS.userID = '${session?.user.id}'`
	);
	// console.log(bookingData);
	const parsedBookingData = JSON.parse(JSON.stringify(bookingData));
	return {
		bookingData: parsedBookingData
	};
}) satisfies PageServerLoad;
