Template.search.rendered = function() {
	$("#search-link").addClass('selected');
	$("#profile-link").removeClass('selected');
	$("#classement-link").removeClass('selected');
	$("#msgs-link").removeClass('selected');
	$("#login-link").removeClass('selected');
}

Template.search.helpers({
	inputAttributes: function() {
		return { 'class': 'easy-search-input', 'placeholder': 'Sujet du message' };
	},
	players: function() {
		return Msgs.find({}, { sort: { createdAt: -1 } });
	},
	selectedName: function() {
		var message = MsgsIndex.config.mongoCollection.findOne({ __originalId: Session.get("selectedMsg") });
		return message && message.msgName;
	},
	index: function () {
		return MsgsIndex;
	},
	resultsCount: function() {
		return MsgsIndex.getComponentDict().get('count');
	},
	showMore: function() {
		return false;
	},

	renderTmpl: () => Template.renderTemplate

});

Template.User.helpers({
	selected: function() {
		return Session.equals("selectedMsg", this.__originalId) ? "selected" : '';
	},
});

Template.User.events({
	'click': function() {
		Session.set("selectedMsg", this.__originalId);
	}
});
