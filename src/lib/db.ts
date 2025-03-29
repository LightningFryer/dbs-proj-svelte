import mysql from 'mysql2/promise';

export const connPool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'opensesame',
	database: 'test',
	rowsAsArray: true
});

export const connection = await connPool.getConnection();
