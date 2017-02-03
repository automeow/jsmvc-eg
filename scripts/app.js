/* globals $ */
"use strict";

var MVC = require("mvc");

$(function() {
	MVC.init({
		controllers: require("./config/controllers.js"),
		layouts: require("./config/layouts.js"),
		models: require("./config/models.js"),
		model_adapter: require("./config/model_adapter.js"),
		resources: require("./config/resources.js"),
		views: require("./config/views.js"),
		debug: true
	});

	$("body").click(function(e) {
		if (e.target.tagName.toLowerCase() == "nav") {
			$("nav > ul").toggleClass("open");
		} else {
			$("nav > ul").removeClass("open");
		}
	});
});
