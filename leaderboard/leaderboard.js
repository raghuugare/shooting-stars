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
        }
    });
    
    
}

if(Meteor.isServer) {
    console.log("Hello from the Server! :)");
}
