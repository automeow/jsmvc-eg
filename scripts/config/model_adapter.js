function Cache() {
	this.ids = 0;
	this.models = {};
}

Cache.prototype.push = function(model) {
	this.models[this.ids] = model;

	return this.ids++;
};

Cache.prototype.destroy = function(id) {
	if (this.models[id]) {
		delete this.models[id];

		return true;
	}

	return false;
};

var cache = {},
	PRETEND_WAIT = 500;

module.exports = function(Errors) {
	function Adapter() {}

	Adapter.all = function(data) {
		var name = this.name;
		cache[name] = cache[name] || new Cache();

		setTimeout(function() {
			data(cache[name].models.values());
		}, PRETEND_WAIT);
	};

	Adapter.find = function(id, data, error) {
		var name = this.name;
		id = parseInt(id);
		cache[name] = cache[name] || new Cache();

		if (!cache[name].models[id]) {
			setTimeout(function() {
				error(new Errors.NotFound());
			}, PRETEND_WAIT);
		} else {
			setTimeout(function() {
				data(cache[name].models[id]);
			}, PRETEND_WAIT);
		}
	};

	Adapter.prototype.save = function(data) {
		var self = this;

		if (this.get("id")) {
			return setTimeout(function() {
				data(self);
			}, PRETEND_WAIT);
		}
		var name = this.constructor.name;
		cache[name] = cache[name] || new Cache();
		this.set("id", cache[name].push(this));

		return setTimeout(function() {
			data(self);
		}, PRETEND_WAIT);
	};

	Adapter.prototype.destroy = function(data, error) {
		var name = this.constructor.name;
		cache[name] = cache[name] || new Cache();

		setTimeout(cache[name].destroy(this.get("id")) ? data : error, PRETEND_WAIT);
	};

	return Adapter;
};
