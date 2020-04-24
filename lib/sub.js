if (Meteor.isClient) {
	Meteor.subscribe('Msgs');
	Meteor.subscribe('Users');
	Meteor.subscribe('ProfileImages');
	Meteor.subscribe('UserImages');
}
