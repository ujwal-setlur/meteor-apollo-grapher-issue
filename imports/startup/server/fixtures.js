"use strict";

import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import Groups from "../../db/groups/collection";
import Users from "../../db/users/collection";

// create our users specified in settings file
const users = Meteor.settings.private.users;
users.forEach(({username, email, password, profile, roles}) => {
  const userExists = Meteor.users.findOne({
    "emails.address": email
  });

  if (!userExists) {
    // Create the user
    const userId = Accounts.createUser({
      username,
      email,
      password,
      profile
    });

    // Verify the email
    Accounts.addEmail(userId, email, true);
  }
});

// create our groups specified in the settings file
const groups = Meteor.settings.private.groups;
groups.forEach(({name, description, members, admins}) => {
  const groupExists = Groups.findOne({
    "name": name
  });

  if (!groupExists) {
		let memberIds = [];
		let adminIds = [];
		
		members.forEach((member) => {
			const user = Meteor.users.findOne({username: member});
			if(user) {
				memberIds.push(user._id);
			}
			else {
				console.log("Cannot find member " + member);
			}
		});
		
		admins.forEach((admin) => {
			const user = Meteor.users.findOne({username: admin});
			if(user) {
				adminIds.push(user._id);
			}
			else {
				console.log("Cannot find admin " + admin);
			}
		});
		
		Groups.insert({name, description, memberIds, adminIds});
		
  }
});

// add reducers
Users.addReducers({
  firstName: {
    body: {
      "profile.firstName": 1
    },
    reduce: obj => obj.profile.firstName
  },
  lastName: {
    body: {
      "profile.lastName": 1
    },
    reduce: obj => obj.profile.lastName
  },
  name: {
    body: {
      "profile.name": 1
    },
    reduce: obj => obj.profile.name
  }
});

// test grapher direct and inverse links
const directLinkQueryResult = Groups.createQuery({
	name: 1,
	description: 1,
	members: {
		name: 1
	},
	admins: {
		name: 1
	}
}).fetch();

console.log("groups query result = " + JSON.stringify(directLinkQueryResult, null, 2));
console.log("");
console.log("");

const inverseLinkQueryResult = Users.createQuery({
	name: 1,
	memberOf: {
		name: 1,
		description: 1
	},
	adminOf: {
		name: 1,
		description: 1
	}
}).fetch();

console.log("users query result = " + JSON.stringify(inverseLinkQueryResult, null, 2));

