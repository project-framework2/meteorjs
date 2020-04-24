Template.profile.rendered = function() {
	$("#profile-link").addClass('selected');
	$("#msgs-link").removeClass('selected');
	$("#classement-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#login-link").removeClass('selected');

}

Template.profile.helpers({
	email: function() {
		if(!Meteor.user()) {
			Bert.alert("Accès interdit, identifiez-vous !", "danger", "growl-top-right");
			return false;
		} else {
			return Meteor.user().emails[0].address;
		}
	},

	username: function() {
		if(!Meteor.user()) {
			Bert.alert("Accès interdit, identifiez-vous !", "danger", "growl-top-right");
			return false;
		} else {
			return Meteor.user().username;
		}
	},

	userMsgs: function() {
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		var userMsgs = Msgs.find({userId: userId}, {sort: {createdAt: -1}});
		return userMsgs;
	},

	userLaughScore: function() {
		return Meteor.user().profile.laughScore;
	},

	userFrownScore: function() {
		return Meteor.user().profile.frownScore;
	},

	userPukeScore: function() {
		return Meteor.user().profile.pukeScore;
	},

	UserImages: function() {
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		var URL = UserImages.findOne({username: username}, {userId: userId});
		return URL;
	}

});

Template.profile.events({
	"click #delete-msg": function() {
		Meteor.call("removeMsg", this._id);
		Bert.alert("Suppression OK", "success", "growl-top-right");
	},

	"submit .edit-profile": function(event) {
		var file = $('#profileImage').get(0).files[0];

		if (file) {

			fsFile = new FS.File(file);

			ProfileImages.insert(fsFile, function(err, result){
				if (err) {
					throw new Meteor.Error(err);
				} else {

					var imageLoc = '/cfs/files/ProfileImages/'+result._id;

					UserImages.insert({
						userId: Meteor.userId(),
						username: Meteor.user().username,
						image: imageLoc,
					});

					Bert.alert("MAJ OK!", "success", "growl-top-right");
				}
			});

		}

		return false
	}
});
