/* globals Promise */

module.exports = function(Base) {
	function People() {
		Base.apply(this, arguments);
	}
	People.prototype = Object.create(Base.prototype);

	People.prototype.getPerson = function(f) {
		var self = this,
			Person = this.model("Person");

		return Person.find(this.params.id)
			.then(function(data) {
				self.person = data;

				if (f) {
					f(self.person);
				}

				return new Promise(function(resolve) {
					resolve(data);
				});
			});
	};

	People.prototype.index = function() {
		var self = this;
		this.model("Person").all()
			.then(function(data) {
				self.people = data;
			})
			.catch(function(error) {
				error.handle();
				self.showError("Couldn't load people");
			});
	};

	People.prototype.new = function() {
		var Person = this.model("Person");

		this.person = new Person();
	};

	People.prototype.create = function() {
		var self = this,
			Person = this.model("Person");

		this.person = new Person(this.params);

		this.person.save()
			.then(function() {
				self.rewrite(self.people_path(self.person.get("id")));
				self.render("show");
			})
			.catch(function() {
				self.render("new");
			});
	};

	People.prototype.show = function() {
		this.getPerson();
	};

	People.prototype.edit = People.prototype.show;

	People.prototype.update = function() {
		var self = this;
		this.getPerson()
			.then(function(p) {
				return p.update(self.params);
			})
			.then(function(p) {
				self.rewrite(self.people_path(p.get("id")));
				self.render("show");
			})
			.catch(function() {
				self.render("edit");
			});
	};

	People.prototype.destroy = function() {
		var self = this;
		this.getPerson()
			.then(function(p) {
				return p.destroy();
			})
			.then(function() {
				self.redirect(self.people_path());
			})
			.catch(function() {
				self.render("show");
			});
	};

	return People;
};
