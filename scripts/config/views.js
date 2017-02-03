module.exports = {
	error: require("../views/error.html.ejs"),
	loading: require("../views/loading.html.ejs"),

	people: {
		index: require("../views/people/index.html.ejs"),
		new: require("../views/people/new.html.ejs"),
		show: require("../views/people/show.html.ejs"),
		edit: require("../views/people/edit.html.ejs"),
	}
};
