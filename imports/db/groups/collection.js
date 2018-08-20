/**
 * Copyright (c) 2018-present, Seamlz. All rights reserved.
 * @flow
 */

"use strict";

import { Mongo } from "meteor/mongo";

// our groups collection
const Groups = new Mongo.Collection("groups");

Groups.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Groups.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

export default Groups;
