Tracker.autorun(function(){
	if(Meteor.userId()){
		Router.go("/msgs");
	}
});

Template.login.rendered = function() {
	$("#login-link").addClass('selected');
	$("#profile-link").removeClass('selected');
	$("#classement-link").removeClass('selected');
	$("#search-link").removeClass('selected');
	$("#msgs-link").removeClass('selected');
}

Template.login.events({
	"submit .form-signin": function(event){
		var email = trimInput(event.target.email.value);
		var password = trimInput(event.target.password.value);

		if(isNotEmpty(email) &&
			isNotEmpty(password) &&
			isEmail(email) &&
			isValidPassword(password)){

			Meteor.loginWithPassword(email, password, function(err){
				if(err) {
					Bert.alert(err.reason, "danger", "growl-top-right");
					return false;
				} else {
					Router.go("/msgs");
					Bert.alert("Vous êtes connecté", "success", "growl-top-right");
				}
			});

		}

		return false
	}

});

var trimInput = function(val){
	return val.replace(/^\s*|\s*$/g, "");
};
// Contrôle champs
var isNotEmpty = function(value){
	if (value && value !== ''){
		return true;
	}
	Bert.alert("Il faut remplir tous les champs!", "danger", "growl-top-right");
	return false;
};

// Contrôle Email
isEmail = function(value) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(filter.test(value)) {
		return true;
	}
	Bert.alert("Adresse mail incorrecte", "danger", "growl-top-right");
	return false;
};

// Contrôle password
isValidPassword = function(password){
	if(password.length <8) {
		Bert.alert("Le mot de passe doit contenir au minimum 8 caractères", "danger", "growl-top-right");
		return false;
	}
	return true;
};
