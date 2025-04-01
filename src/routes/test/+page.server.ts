import { connection } from '$lib/db';
import { json, redirect, type Actions } from '@sveltejs/kit';
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

export const actions: Actions = {
	runQuery: async ({ request }) => {
		const formData = await request.formData();
		const query = formData.get('query') as string;

		const [results, fields] = await connection.query(query);
		const encodedResults = encodeURIComponent(JSON.stringify(results));
		const encodedFields = encodeURIComponent(JSON.stringify(fields));
		throw redirect(303, `/test?results=${encodedResults}&fields=${encodedFields}`);
	}
};
