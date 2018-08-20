/**
 * Copyright (c) 2018-present, Seamlz. All rights reserved.
 * @flow
 */

"use strict";

import { Meteor } from "meteor/meteor";

// no need to define collection. Meteor creates users collection by default
const Users = Meteor.users;

Users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

export default Users;
