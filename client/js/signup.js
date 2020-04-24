Template.signup.rendered = function() {

}

Template.signup.events({
	"submit .form-signup": function(event){
		var username = trimInput(event.target.username.value);
		var email = trimInput(event.target.email.value);
		var password = trimInput(event.target.password.value);
		var password2 = trimInput(event.target.password2.value);

		if(isNotEmpty(email) &&
			isNotEmpty(username) &&
			isNotEmpty(password) &&
			isEmail(email) &&
			areValidPasswords(password, password2)) {

			Accounts.createUser({
				username: username,
				email: email,
				password: password,
				profile: {
					laughScore: 0,
					frownScore: 0,
					pukeScore: 0,
					voted: [],
				}
			}, function(err){
				if(err){
					Bert.alert(err.reason, "danger", "growl-top-right");
				} else {
					Bert.alert("Bienvenue ! Vous êtes connecté.", "success", "growl-top-right");
					Router.go("/msgs");

				}
			});

		}

		return false;

	}
});

// Contrôles

// Vérification de la saisie utilisateur

var trimInput = function(val){
	return val.replace(/^\s*|\s*$/g, "");
};

var isNotEmpty = function(value){
	if (value && value !== ''){
		return true;
	}
	Bert.alert("Vous devez remplir tous les champs !", "danger", "growl-top-right"); // alerte pop-up
	return false;
};

// contrôle mail

isEmail = function(value) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(filter.test(value)) {
		return true;
	}
	Bert.alert("Vous devez utiliser une adresse mail valide !", "danger", "growl-top-right");
	return false;
};

// contrôle champ password

isValidPassword = function(password){
	if(password.length <8) {
		Bert.alert("Votre mot de passe doit contenir au minimum 8 caractères !", "danger", "growl-top-right");
		return false;
	}
	return true;
};

// contrôle password incorrect

areValidPasswords = function(password, confirm) {
	if(!isValidPassword(password)) {
		return false;
	}
	if(password !== confirm) {
		Bert.alert("Le mot de passe ne correspond pas !", "danger", "growl-top-right");
		return false;
	}
	return true;
};
