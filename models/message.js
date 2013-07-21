'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
	name: {type: String, index: {unique: true}},
	created: {type: Date, index: true},
	title: String,
	content: String
});

var MessageModel = mongoose.model('message', messageSchema);

exports.create = function(message, callback) {
	// callback: function (error, message)

	var model = new MessageModel(message);
	model.save(callback);
};

exports.list = function(callback) {
	// callback: function (error, messages)

	MessageModel.find(callback);
};

exports.read = function(name, callback) {
	// callback: function (error, message)

	MessageModel.findOne({name: name}, callback);
};

exports.update = function(message, callback) {
	// callback: function (error)

	MessageModel.update({name: message.name}, message, function(error, affected) {
		console.log('updated\n');
		if(callback) {
			if(error) callback(error);
			else if(affected === 0) callback(message.name + ' was not updated.');
			else callback();
		}
	});
};

exports.delete = function(name, callback) {
	// callback: function (error)

	MessageModel.remove({name: name}, callback);
}
