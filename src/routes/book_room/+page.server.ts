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
		const checkInDate = formData.get('check_in_date') as string;
		const checkOutDate = formData.get('check_out_date') as string;
		const guestCount = formData.get('guests') as string;

		try {
			await connection.query(`UPDATE ROOMS SET BOOKED = 1 WHERE RID = ${roomID}`);
			await connection.query(
				`INSERT INTO BOOKINGS VALUES('${userID}', ${roomID}, '${checkInDate}', '${checkOutDate}', ${guestCount}, 0)`
			);
			const [daysBookedSQLResult] = await connection.query(
				`SELECT DATEDIFF(check_out, check_in) FROM BOOKINGS WHERE roomID = ${roomID}`
			);
			await connection.commit();
			await connection.query(
				`UPDATE BOOKINGS SET days_booked = ${daysBookedSQLResult[0][0]} WHERE roomID = ${roomID}`
			);
			await connection.commit();
		} catch (err) {
			console.log(err);
		}

		redirect(301, '/book_room_success');
	}
};
