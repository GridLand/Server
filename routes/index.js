var express = require('express');
var router = express.Router();
var pool = require('../config/db')();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//기록 저장
router.get('/add/:id/:time/:game', function (req, res) {
    var id = parseInt(req.params.id);
    var time = parseInt(req.params.time);
    var game = parseInt(req.params.game);

    pool.getConnection(function (err, conn) {
        var sqlForAddRecord= 'INSERT INTO records(player, play_time, date, game_number) VALUES (?, ?,NOW(), ?)';
        conn.query(sqlForAddRecord, [id, time, game], function (err, row) {
            if (err) {
                conn.release();
                throw err;
            } else {
                res.json(row);
                conn.release();
            }
        })
    })
});

//골드 정보
router.get('/gold/:id', function (req, res) {
    var id = parseInt(req.params.id);

    pool.getConnection(function (err, conn) {
        var sqlForGetGold= 'SELECT gold FROM users WHERE idx='+id;
        conn.query(sqlForGetGold,function (err, result) {
            if (err) {
                conn.release();
                throw err;
            } else {
                res.json(result);
                conn.release();
            }
        })
    })
});

//골드 수정
router.get('/update/:gold', function (req, res) {
    var gold = parseInt(req.params.gold);

    pool.getConnection(function (err, conn) {
        var sqlForUpdateGold= 'UPDATE users SET gold=? WHERE idx=1';
        conn.query(sqlForUpdateGold,[gold], function (err, result) {
            if (err) {
                conn.release();
                throw err;
            } else {
                res.json("ok");
                conn.release();
            }
        })
    })
});

module.exports = router;
