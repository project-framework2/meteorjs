Template.msgForm.rendered = function() {

}

Template.msgForm.events({
	"submit .msg-post": function() {
		var msgName = event.target.msgName.value;
		var msgPost = event.target.msgPost.value;

		if (isNotEmpty(msgName) &&
			isNotEmpty(msgPost)) {

			Meteor.call('addMsgs', msgName, msgPost);

			event.target.msgName.value = "";
			event.target.msgPost.value = "";

			Bert.alert("Vous avez posté votre suggestion avec succès!", "success", "growl-top-right");

		} else {

			Bert.alert("Oups ! Un problème ?", "danger", "growl-top-right");
		}

		return false;
	}
});

// Contrôle

var isNotEmpty = function(value){
	if (value && value !== ''){
		return true;
	}
	Bert.alert("Merci de remplir tous les champs!", "danger", "growl-top-right");
	return false;
};
