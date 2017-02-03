module.exports = function(Base) {
	function People() {
		Base.apply(this, arguments);
	}
	People.prototype = Object.create(Base.prototype);

	People.prototype.getPerson = function(f) {
		var self = this,
			Person = this.model("Person");

		Person.find(this.params.id, function(data) {
			self.person = data;
			if (f) {
				f(self.person);
			}
		});
	};

	People.prototype.index = function() {
		var self = this;
		this.model("Person").all(
			function(data) {
				self.people = data;
			},
			function(error) {
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

		this.person.save(
			function() {
				self.redirect(self.people_path(self.person.get("id")));
			},
			function() {
				self.render("new");
			}
		);
	};

	People.prototype.show = function() {
		this.getPerson();
	};

	People.prototype.edit = People.prototype.show;

	People.prototype.update = function() {
		var self = this;
		this.getPerson(function(p) {
			p.update(
				self.params,
				function() {
					self.redirect(self.people_path(p.get("id")));
				},
				function() {
					self.render("edit");
				}
			);
		});
	};

	People.prototype.destroy = function() {
		var self = this;
		this.getPerson(function(p) {
			p.destroy(
				function() {
					self.redirect(self.people_path());
				},
				function() {
					self.render("show");
				}
			);
		});
	};

	return People;
};
