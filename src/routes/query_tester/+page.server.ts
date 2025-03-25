import { connection } from '$lib/db';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	runQuery: async ({ request }) => {
		const formData = await request.formData();
		const query = formData.get('query') as string;
		const [results, fields] = await connection.query(query);

		const fieldsJSON = fields.map((field) => ({
			name: field.name
		}));
		return { results, fieldsJSON };
	}
};
