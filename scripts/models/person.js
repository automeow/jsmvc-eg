module.exports = function(Base) {
	function Person() {
		Base.apply(this, arguments);
	}
	Person.prototype = Object.create(Base.prototype);
	Person.prototype.constructor = Person;
	Object.assign(Person, Base);

	return Person;
};
