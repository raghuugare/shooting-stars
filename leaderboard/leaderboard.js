PlayerList = new Mongo.Collection('players');

if(Meteor.isClient) {
    console.log("Hello from the Client! :)");

    Template.leaderboard.player = function() {
        return "From player function()...";
    }
    
}

if(Meteor.isServer) {
    console.log("Hello from the Server! :)");
}
