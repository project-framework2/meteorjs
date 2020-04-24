if (Meteor.isServer) {
	Meteor.methods({
		// Methode pour ajouter un message
		addMsgs: function(msgName, msgPost) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				var username = Meteor.user().username;
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				var day = new Date().getDate();
				var date = (month + "/" + day + "/" + year).toString();

				Msgs.insert({
					msgName: msgName,
					msgPost: msgPost,
					author: username,
					date: date,
					createdAt: new Date(),
					laughScore: 0,
					frownScore: 0,
					pukeScore: 0,
					voted: [username],
					userId: Meteor.userId(),
				});

			}
		},

		removeMsg: function(msgsId) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Msgs.remove(msgsId);
			}
		},

		countVote: function(thisMsg, Name) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Msgs.update(thisMsg, { $addToSet: { voted: Name}});
			}
		},

		userPointLaugh: function(msgAuthor) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(msgAuthor, { $inc: {'profile.laughScore': +1}});
			}
		},

		laughVote: function(thisUser, thisMsg) {
			if (!thisUser) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				Msgs.update(thisMsg, {$inc: {laughScore: +1}});
			}
		},

		userPointFrown: function(msgAuthor) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(msgAuthor, { $inc: {'profile.frownScore': +1}});
			}
		},

		frownVote: function(thisUser, thisMsg) {
			if (!thisUser) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				Msgs.update(thisMsg, {$inc: {frownScore: +1}});
			}
		},

		userPointPuke: function(msgAuthor) {
			if(!Meteor.userId()) {
				throw new Meteor.Error('not authorized');
				this.stop();
				return false;
			} else {
				Meteor.users.update(msgAuthor, { $inc: {'profile.pukeScore': +1}});
			}
		},

		pukeVote: function(thisUser, thisMsg) {
			if (!thisUser) {
				throw new Meteor.Error('not authorized');
				return false;
			} else {
				Msgs.update(thisMsg, {$inc: {pukeScore: +1}});
			}
		},

	});

}
