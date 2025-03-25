import { connection } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('query');
	let results = [];

	if (query) {
		try {
			const [rows] = await connection.query(query);
			results = rows;
		} catch (error) {
			console.error('Query Error:', error);
			results = [{ error: 'Invalid query or database error' }];
		}
	}

	return { results };
};
