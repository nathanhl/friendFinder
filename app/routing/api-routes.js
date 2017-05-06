var express = require('express');
var router = express.Router();
var path = require('path');
var jsonfile = require('jsonfile');
var file = './app/data/friends.js';

router.get('/api/friends', function(req, res) {
    res.json(jsonfile.readFileSync(file));
})

router.post('/api/friends', function(req, res) {

    var friends = jsonfile.readFileSync(file);
    var index = findFriend(req.body, friends);
    friends.push(req.body);
    jsonfile.writeFileSync(file, friends, { spaces: 2 });
    res.json({
        name: friends[index].name,
        photo: friends[index].photo,
        location: friends[index].location,
        email: friends[index].email
    });
})

function findFriend(self, friends) {
    var friend = {};
    for (var i in friends) {
        var diff = 0;
        for (var j in friends[i].scores) {

            diff += Math.abs(Number(self.scores[j]) - Number(friends[i].scores[j]));
        }
        if (friend.diff === undefined) {
            friend.diff = diff;
            friend.index = i;
        } else {
            if (diff < friend.diff) {
                friend.diff = diff;
                friend.index = i;
            }
        }
    }
    console.log(friend);
    return friend.index;
}

module.exports = router;
