"use strict";

import { initAccounts } from "meteor/cultofcoders:apollo-accounts";

// init the accounts module
const accountsModule = initAccounts({
  CreateUserProfileInput: "name: String firstName: String lastName: String",
  loginWithFacebook: false,
  loginWithGoogle: false,
  loginWithLinkedIn: false
}); // returns { typeDefs, resolvers }

export default accountsModule;
