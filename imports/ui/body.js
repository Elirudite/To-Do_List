import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
	this.state = new ReactiveDict();
});

Template.body.helpers({
	tasks() {
		const instance = Template.instance();
		if (instance.state.get('hideCompleted')) {
		// completedTasksCount() {
		// 	return Tasks.find({ checked: { $ne: true } }).count();
		// }
			// [If] hide completed is checked, [do] filter tasks
			return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1} });
		}
		// Otherwise [else], return all of the tasks
		// Shows newest tassks at the top
		return Tasks.find({}, { sort: { createdAt: -1 } });
	},
	incompleteTasksCount() {
		return Tasks.find({ checked: { $ne: true } }).count();
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
	'change .hide-completed input' (event, instance) {
		instance.state.set('hideCompleted', event.target.checked);
	},
});