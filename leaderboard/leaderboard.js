PlayerList = new Mongo.Collection('players');

if(Meteor.isClient) {
    console.log("Hello from the Client! :)");

    Template.leaderboard.helpers( {
        'player': function() {
            return "From player function()...";
        },
        'manager': function() {
            return "From manager function()..."
        }
    });
    
}

if(Meteor.isServer) {
    console.log("Hello from the Server! :)");
}
