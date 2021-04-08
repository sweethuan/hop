const mysql = require('mysql')

module.exports = (sql) => {
  return new Promise((resolve, reject) => {
    const pool  = mysql.createPool({
      host     : 'localhost',	//本机
      user     : 'root',		//账号root
      password : 'root',	//密码12345
      database : 'test'	//数据库名
    })
     
    pool.getConnection(function(err, connection) {
      if (err) reject(err) // not connected!
     
      // Use the connection
      connection.query(sql, function (error, ...args) {
        // When done with the connection, release it.
        connection.release();
     
        // Handle error after the release.
        if (error) reject(error)
        
        // Don't use the connection here, it has been returned to the pool.
        resolve(...args)
      })
    })
  })
}