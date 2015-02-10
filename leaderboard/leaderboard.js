PlayerList = new Mongo.Collection('players');

if(Meteor.isClient) {
    console.log("Hello from the Client! :)");

    Template.leaderboard.helpers( {
        'player': function() {
            return PlayerList.find();
        },
        'manager': function() {
            return "From manager function()..."
        }
    });


    Template.leaderboard.events({
        'click .player':function() {
            console.log("You clicked on a player.list element...");
        }
    });
    
    
}

if(Meteor.isServer) {
    console.log("Hello from the Server! :)");
}
