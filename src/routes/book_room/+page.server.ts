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
				`INSERT INTO BOOKINGS VALUES('${userID}', ${roomID}, '${checkInDate}', '${checkOutDate}', ${guestCount}, DATEDIFF('${checkOutDate}', '${checkInDate}'))`
			);
			await connection.commit();
		} catch (err) {
			console.log(err);
		}
		const [bookingDataResult] = await connection.query(
			`SELECT * FROM ROOMS, BOOKINGS WHERE ROOMS.RID = BOOKINGS.roomID AND BOOKINGS.userID = '${session?.user.id}' AND roomID = ${roomID}`
		);
		
		const bookingData = bookingDataResult[0];
		redirect(
			301,
			`/book_room_success/${roomID}_${bookingData[1]}_${bookingData[2]}_${bookingData[3]}_${checkInDate}_${checkOutDate}_${bookingData[10]}_${guestCount}`
		);
	}
};
// [
// 	2,
// 	'Double',
// 	'No',
// 	1340,
// 	1,
// 	'AdSd0NFp0yP5xLoSVf4gFx1zz4qhJlvI',
// 	2,
// 	2025-03-30T18:30:00.000Z,
// 	2025-04-13T18:30:00.000Z,
// 	1,
// 	14
//   ]
