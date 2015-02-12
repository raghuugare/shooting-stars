PlayerList = new Mongo.Collection('players');

if(Meteor.isClient) {
    console.log("Hello from the Client! :)");

    Template.leaderboard.helpers( {
        'player': function() {
            return PlayerList.find({}, {sort : {score: -1, name: 1}});
        },
        'selectedClass': function() {
            var playerId = this._id;
            var selectedPlayerId = Session.get('selectedPlayer');
            if(playerId == selectedPlayerId) {
                return "selected"
            }
        },
        'showSelectedPlayer': function() {
            var selectedPlayer = Session.get('selectedPlayer');
            return PlayerList.findOne(selectedPlayer);
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
        },
        'click .remove': function() {
            var selectedPlayer = Session.get('selectedPlayer');
            PlayerList.remove(selectedPlayer);
        }
    });
    
    Template.addPlayerForm.events({
        'submit form': function(event) {
            event.preventDefault();
            var pName = event.target.playerName.value;
            console.log('Form submitted');
            console.log(event.type);
            console.log("player name submitted is ["+ pName +"]");
            PlayerList.insert( {
                name: pName,
                score: 0});
        }
    });

    
}

if(Meteor.isServer) {
    console.log("Hello from the Server! :)");
}
