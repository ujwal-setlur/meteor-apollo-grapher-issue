"use strict";

import Users from "./users/collection";
import Groups from "./groups/collection";

// links between Groups and Users
Groups.addLinks({
  "members": {
    type: "many",
    collection: Users,
    field: "memberIds",
    index: true
  }
});

Users.addLinks({
  "groupMembers": {
    collection: Groups,
    inversedBy: "members"
  }
});

Groups.addLinks({
  "admins": {
    type: "many",
    collection: Users,
    field: "adminIds",
    index: true
  }
});

Users.addLinks({
  "groupAdmins": {
    collection: Groups,
    inversedBy: "admins"
  }
});
