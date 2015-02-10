PlayerList = new Mongo.Collection('players');

if(Meteor.isClient) {
    console.log("Hello from the Client! :)");
}

if(Meteor.isServer) {
    console.log("Hello from the Server! :)");
}
