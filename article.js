var express = require('express');
var router = express.Router();
var pool = require('../connect/connection')

// 文章模块
router.get('/list',function(req,res,next){
  var title = req.query.title
  var content = req.query.content
  var currentPage = req.query.currentPage
  var pageSize = req.query.pageSize
  var sql_all = "SELECT article.id,article.category_id,article.title,article.content,article.create_time,category.name FROM article as article join category as category on article.category_id = category.id where 1=1 ORDER BY create_time DESC"
  var sql_main = "SELECT article.id,article.category_id,article.title,article.content,article.create_time,category.name FROM article as article join category as category on article.category_id = category.id where 1=1"
  var searchSqlParams = [];
  if(title) {
    sql_main += " and article.title = ?"
    searchSqlParams.push(title)
  }
  if(content) {
    sql_main += " and article.content = ?"
    searchSqlParams.push(content)
  }
  sql_main += " ORDER BY create_time DESC "
  if(!currentPage && !pageSize){
    sql_main += " LIMIT 10 OFFSET 0" 
  }
  
  if(currentPage && !pageSize){
    let offset = 10 * (currentPage - 1)
    sql_main += " LIMIT 10 OFFSET " + offset 
  }
  if(currentPage && pageSize){ 
    let offset = pageSize * (currentPage -1)
    sql_main += " LIMIT " + pageSize + " OFFSET " + offset
  }
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(sql_all, searchSqlParams, function (err, result) {
      if(err){
        var responseData = {
          'code' : 400,
          'msg': '接口读取失败',
        }
        res.json(responseData);
        return;
      } else {
        const totalNum = result.length
        connection.query(sql_main, searchSqlParams, function (err, result) {
          if(err){
            var responseData = {
              'code' : 400,
              'msg': '接口读取失败',
            }
            res.json(responseData);
            return;
          }
          var responseData = {
            'code' : 0,
            'msg': 'success',
            'data': result,
            'totalNum': totalNum
          }
          res.json(responseData);
          return;
        })
      }
      
    });
    connection.release();
  })
 
})

router.get('/info/:id',function(req,res,next){
  var id = req.params.id
  var  sql = 'SELECT article.id,article.category_id,title,content FROM article WHERE article.id = ?';
  var selectVal = id
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(sql, selectVal, function (err, result) {
      if(err){
        var responseData = {
          'code' : 400,
          'msg': '接口读取失败',
        }
        res.json(responseData);
        return;
      }
      var results = result[0]
      
      var responseData = {
        'code' : 0,
        'msg': 'success',
        'data': results
      }
      res.json(responseData);
      return;
    });
    connection.release();
  })
  
})

router.post('/save',function(req,res,next){
  var title = req.body.title
  var content = req.body.content
  var category_id = req.body.category_id
  var addSql = 'INSERT INTO article(`id`,`category_id`,`title`,`content`) VALUES(0,?,?,?)';
  var addSqlParams = [category_id, title, content];
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(addSql, addSqlParams, function (err, result) {
      if(err){
        console.log(err)
        var responseData = {
          'code' : 400,
          'msg': '新增失败',
        }
        res.json(responseData);
        return;
      }
      var responseData = {
        'code' : 0,
        'msg': 'success',
      }
      res.json(responseData);
      return;
    });
    connection.release();
  })
  
})

router.post('/update',function(req,res,next){
  var id = req.body.id
  var title = req.body.title
  var content = req.body.content
  var category_id = req.body.category_id
  var  updateSql = 'UPDATE article SET title = ?,content = ?,category_id = ? WHERE id = ?';
  var  updateSqlParams = [title, content, category_id, id];
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(updateSql, updateSqlParams, function (err, result) {
      if(err){
        var responseData = {
          'code' : 400,
          'msg': '更新失败',
        }
        res.json(responseData);
        return;
      }
      var responseData = {
        'code' : 0,
        'msg': 'success',
      }
      res.json(responseData);
      return;
    });
    connection.release();
  })
  
})

router.get('/delete/:id',function(req,res,next){
  var id = req.params.id
  var  sql = 'DELETE FROM article WHERE article.id = ?';
  var selectVal = id
  pool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(sql, selectVal, function (err, result) {
      if(err){
        var responseData = {
          'code' : 400,
          'msg': '删除失败',
        }
        res.json(responseData);
        return;
      }
      var responseData = {
        'code' : 0,
        'msg': 'success',
      }
      res.json(responseData);
      return;
    });
    connection.release();
  })
  
})


module.exports = router;