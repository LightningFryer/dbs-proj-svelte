import { auth } from '$lib/auth';
import { connection } from '$lib/db';
import { json, redirect, type Actions } from '@sveltejs/kit';
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

export const actions: Actions = {
	cancelBooking: async ({ request }) => {
		const session = await auth.api.getSession({
			headers: request.headers
		});

		const formData = await request.formData();
		const roomID = formData.get('room_id') as string;
		const userID = session?.user.id;

		await connection.query(
			`DELETE FROM bookings WHERE roomID = ${roomID} AND userID = '${userID}'`
		);
		await connection.query(`UPDATE ROOMS SET booked = 0 WHERE RID = ${roomID}`);
		await connection.commit();
	}
};
