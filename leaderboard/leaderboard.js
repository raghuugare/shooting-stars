PlayerList = new Mongo.Collection('players');

if(Meteor.isClient) {
    console.log("Hello from the Client! :)");

    Template.leaderboard.helpers( {
        'player': function() {
            return PlayerList.find();
        },
        'selectedClass': function() {
            var playerId = this._id;
            var selectedPlayerId = Session.get('selectedPlayer');
            if(playerId == selectedPlayerId) {
                return "selected"
            }
        }
    });


    Template.leaderboard.events({
        'click .player': function() {
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
            var selectedPlayer = Session.get('selectedPlayer');
            console.log(selectedPlayer);
        },
        'click .increment': function() {
            var selectedPlayer = Session.get('selectedPlayer');
            PlayerList.update(selectedPlayer, {$inc : {score: 5}});
        },
        'click .decrement': function() {
            var selectedPlayer = Session.get('selectedPlayer');
            PlayerList.update(selectedPlayer, {$inc : {score: -5}});
        }
    });
    
    
}

if(Meteor.isServer) {
    console.log("Hello from the Server! :)");
}
