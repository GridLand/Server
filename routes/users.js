var express = require('express');
var router = express.Router();

//기록 저장
router.get('/add/:id/:time', function (req, res) {
    var id = req.params.id;
    var time = req.params.time;

    pool.getConnection(function (err, conn) {
        var sqlForAddRecord= 'INSERT INTO records(player, time, date) VALUES (?, ?,NOW())';
        conn.query(sqlForAddRecord, [id, time], function (err, row) {
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