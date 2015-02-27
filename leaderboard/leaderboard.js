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
        'mouseenterClass' : function() {
            var playerId = this._id;
            var selectedPlayerId = Session.get('selectedPlayer');
            if(playerId !== selectedPlayerId && playerId === Session.get('mouseOnId')) {
                return "mouseenter"
            }
        },
       /* 'mouseleaveClass' : function() {
            var playerId = this._id;
            var selectedPlayerId = Session.get('selectedPlayer');
            if(playerId !== selectedPlayerId) {
                return "mouseleave"
            }
        }*/
        'mouseOnPlayer' : function() {
            var mouseOnPlayerId = Session.get('mouseOnId');
            return PlayerList.findOne(mouseOnPlayerId);
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
        'mouseenter .player': function() {
            Session.set('mouseOnId', this._id);
        },
        'mouseleave .player': function() {
            Session.set('mouseOnId', null);
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
            var response = confirm("Are you sure you want to remove " + PlayerList.findOne(selectedPlayer).name + " ?");
            if(response==true) {
                PlayerList.remove(selectedPlayer);
            } else {
                alert("User cancelled the removal! Don't worry...");
            }
        }
    });
    
    Template.addPlayerForm.events({
        'submit form': function(event) {
            event.preventDefault();
            var pName = event.target.playerName.value;
            var currentUserId = Meteor.userId();
            console.log('Form submitted');
            console.log(event.type);
            console.log("player name submitted is ["+ pName +"]");
            PlayerList.insert( {
                name: pName,
                score: 0,
                createdBy: currentUserId
            });
            event.target.playerName.value = '';
        }
    });

    
}

if(Meteor.isServer) {
    console.log("Hello from the Server! :)");
}
