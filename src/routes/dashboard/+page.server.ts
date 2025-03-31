import { auth } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { connection } from '$lib/db';

export const load = (async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (!session) {
		redirect(301, '/');
	}

	const [employeeQueryResult] = await connection.query('SELECT * FROM EMPLOYEE');
	const employeeData = employeeQueryResult;

	return { employeeData };
}) satisfies PageServerLoad;
