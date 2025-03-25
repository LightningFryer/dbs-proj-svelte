import mysql from 'mysql2/promise';
export const connPool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'opensesame',
	database: 'test',
	rowsAsArray: true
});

export const connection = await connPool.getConnection();

export async function test() {
	try {
		const [results, fields] = await connection.query('SELECT * FROM rooms');
		console.log(results);
		return JSON.stringify(results);
	} catch (err) {
		console.log(err);
	}
}
