Meteor.startup(function() {
  if (Meteor.users.find().count() === 0) {
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();
    var date = (month + "/" + day + "/" + year).toString();

    	// Root user
      Accounts.createUser({
        username: 'Administrateur',
        email: 'alexis@mairena.fr',
        password: 'password',
        profile: {
        	laughScore: 0,
        	frownScore: 0,
          pukeScore: 0,
        }
      });

      var user0Id = Meteor.users.findOne({username: 'Administrateur'})._id;

      musics.insert({
        Name: "Music test - Test - BPM ",
        musicPost: "Un premier son",
        author: "Administrateur",
        date: date,
        createdAt: new Date(),
        laughScore: 0,
        frownScore: 0,
        pukeScore: 0,
        voted: ["Administrateur"],
        userId: user0Id,
      });
      console.log("Création du compte administrateur");
      console.log("Création des posts par défaut");

      console.log("  ");
      console.log("La base de donnée a été mis à jour! ");

  }

});
