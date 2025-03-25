import { connection } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/auth';

export const load = (async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		redirect(300, '/');
	}
	const [results] = await connection.query('SELECT * FROM ROOMS WHERE BOOKED = 0');
	return { results };
}) satisfies PageServerLoad;

export const actions: Actions = {
	bookRoom: async ({ request }) => {
		const session = await auth.api.getSession({
			headers: request.headers
		});
		const userID = session?.user.id as string;
		const formData = await request.formData();
		const roomID = formData.get('room_id') as string;
		console.log(roomID);
		try {
			await connection.query(`UPDATE ROOMS SET BOOKED = 1 WHERE RID = ${roomID}`);
			await connection.query(`INSERT INTO BOOKINGS(userID, roomID) VALUES('${userID}', ${roomID})`);
			await connection.commit();
		} catch (err) {
			console.log(err);
		}
		redirect(301, '/book_room_success');
	}
};
