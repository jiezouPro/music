const mysql = require('mysql')
const option={
  host: 'localhost',
  port: 3306,
  user: 'root',
  password : '',
  database : 'music'
}
//创建数据库连接池
const pool = mysql.createPool(option)

function getData(sql){
  return new Promise(function(resolve,reject){
    pool.getConnection((err,conn)=>{
      if (err) {
        console.error('Failed to get connection from pool:', err);
        reject(err);
        return;
      }
      console.log('建立连接成功')
      conn.query(sql,(err,result,fields)=>{
        if (err) {
          console.error('Failed to execute query:', err);
          conn.release(); // 将连接放回连接池中
          reject(err);
          return;
        }
         console.log('查询成功',result)   
         conn.release() //释放连接，归还连接
         resolve(result)
      })
    })
  })
}

module.exports = {
  getData
}
