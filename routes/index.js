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

module.exports = router;
