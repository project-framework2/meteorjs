Template.msgs.rendered = function() {
	$("#msgs-link").addClass('selected');
	$("#profile-link").removeClass('selected');
	$("#classement-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');
}

Template.msgs.helpers({
	msgs: function() {
		var msgs = Msgs.find({}, {sort: {createdAt: -1}});
		return msgs;
	}
});

Template.msgs.events({
	"click #laugh": function() {
		var thisUser = Meteor.userId();
		var thisMsg = Msgs.findOne({_id: this._id})._id;
		var msgAuthor = Msgs.findOne({_id: this._id}).userId;
		var Name = Meteor.user().username;
		var thisMsgsVotes = Msgs.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

		if (thisMsgsVotes.indexOf(Name) > -1) {
			Bert.alert("Vous ne pouvez pas voter deux fois", "danger", "growl-top-right");

		} else {

			Meteor.call("countVote", thisMsg, Name);
			Meteor.call("userPointLaugh", msgAuthor);
			Meteor.call("laughVote", thisUser, thisMsg);
			Bert.alert("Votre vote a été pris en compte!", "success", "growl-top-right");

		}

		if (Name == thisMsgsVotes) {
			Bert.alert("Vous ne pouvez pas voter pour vous-même", "danger", "growl-top-right");
		}
	},

	"click #frown": function() {
		var thisUser = Meteor.userId();
		var thisMsg = Msgs.findOne({_id: this._id})._id;
		var msgAuthor = Msgs.findOne({_id: this._id}).userId;
		var Name = Meteor.user().username;
		var thisMsgsVotes = Msgs.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

		if (thisMsgsVotes.indexOf(Name) > -1) {
			Bert.alert("Vous ne pouvez pas voter deux fois", "danger", "growl-top-right");

		} else {

			Meteor.call("countVote", thisMsg, Name);
			Meteor.call("userPointFrown", msgAuthor);
			Meteor.call("frownVote", thisUser, thisMsg);
			Bert.alert("Votre vote a été pris en compte!", "success", "growl-top-right");

		}

		if (Name == thisMsgsVotes) {
			Bert.alert("Vous ne pouvez pas voter pour vous-même", "danger", "growl-top-right");
		}
	},

	"click #puke": function() {
		var thisUser = Meteor.userId();
		var thisMsg = Msgs.findOne({_id: this._id})._id;
		var msgAuthor = Msgs.findOne({_id: this._id}).userId;
		var Name = Meteor.user().username;
		var thisMsgsVotes = Msgs.findOne({_id: this._id}, {voted: {$in: Name}}).voted;

		if (thisMsgsVotes.indexOf(Name) > -1) {
			Bert.alert("Vous ne pouvez pas voter deux fois", "danger", "growl-top-right");

		} else {
			Meteor.call("countVote", thisMsg, Name);
			Meteor.call("userPointPuke", msgAuthor);
			Meteor.call("pukeVote", thisUser, thisMsg);
			Bert.alert("Votre vote a été pris en compte!", "success", "growl-top-right");

		}

		if (Name == thisMsgsVotes) {
			Bert.alert("Vous ne pouvez pas voter pour vous-même", "danger", "growl-top-right");
		}
	},

});
