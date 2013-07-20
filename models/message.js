'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
	title: String,
	content: String
});

var MessageModel = mongoose.model('message', messageSchema);

exports.list = function(callback) {
	MessageModel.find(callback);
};

exports.create = function(message, callback) {
	var model = new MessageModel(message);
	model.save(callback);
};

