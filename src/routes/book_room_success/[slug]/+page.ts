import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const getParams = params.slug;
	// console.log(getParams.split('_'));
	const bookedRoomData = getParams.split('_');
	return { bookedRoomData };
}) satisfies PageLoad;
