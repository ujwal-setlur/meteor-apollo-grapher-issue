"use strict";

import { Meteor } from "meteor/meteor";
import { initialize } from "meteor/cultofcoders:apollo";

// import our database collections
import "../../db";

// import our api
import "../../api";

// Load some intial data
import "./fixtures";

Meteor.startup(() => {
});
