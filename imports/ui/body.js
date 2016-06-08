import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './body.html';

Template.body.helpers({
	tasks() {
		// Shows newest tassks at the top
		return Tasks.find({}, { sort: { createdAt: -1 } });
	},
});

Template.body.events({
	'submit .new-task' (event) {
		// Prevents default browser from submit
		event.preventDefault();

		// Gets the value from form element
		const target = event.target
		const text = target.text.value;

		// Inserts a task into the collection
		Tasks.insert({
			text,
			createdAt: new Date(), // current time
		});

		// Clears form
		target.text.value = '';
	},
});