import { connection } from '$lib/db';
import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	try {
		const [results, fields] = await connection.query('SELECT * FROM rooms');
		// console.log(results);
		const fieldsJSON = fields.map((field) => ({
			name: field.name
		}));
		return { results, fieldsJSON };
	} catch (err) {
		console.log(err);
		return {};
	}
}) satisfies PageServerLoad;
