import type { PageServerLoad } from './$types';
import { connection } from '$lib/db';
export const load = (async () => {
	try {
		const [results, fields] = await connection.query('SELECT * FROM ROOMS');
		// console.log(results);
		return { results };
	} catch (err) {
		console.log(err);
		return {};
	}
}) satisfies PageServerLoad;
