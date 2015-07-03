$(function() {

var $yourName = $('#your-name');
var $postTitle = $('#post-title');
var $content = $('#content');
var $newPostForm = $('#new-post-form');

// Post constructor and prototype functions
function Post (owner, title, content) {
	var date = new Date()
	this.owner = owner;
	this.title = title;
	this.content = content;
	this.highFiveCount = 0;
	this.date = date.toDateString();
	this.index = Post.count;

	this.items = localStorage.getItem('posts');
	this.key = 'posts';
}

Post.count = 1;

//SaveRender instance of all stored posts
//Used to display stored posts on page load
localItems = new SaveRender(localStorage.getItem('posts'));

Post.prototype.delete = function() {

}

Post.prototype.highFive = function() {

}

//Save render constructor and prototypes
function SaveRender(storedPosts) {
	this.storedPosts = storedPosts;
}

//SaveRender prototype method that saves post to local storage
SaveRender.prototype.saveToLs = function(thing) {
	if (this.items) {
		items_json = JSON.parse(this.items);
	} else {
		items_json = [];
	}

	items_json.push(thing);

	localStorage.setItem(this.key, JSON.stringify(items_json));
}

//Render template one
SaveRender.prototype.renderTemplate = function(template_source, where) {
	var template = _.template($(template_source).html());

		$(where).prepend(template(this));

	Post.count += 1;
}

//Render template all
SaveRender.prototype.renderTemplateAll = function(template_source, where) {
	var items_json = JSON.parse(this.storedPosts);

	var template = _.template($(template_source).html());

	_.each(items_json, function(item) {
		$(where).prepend(template(item));
		Post.count += 1;
	});

}

//Post inheritance of SaveRender
Post.prototype = new SaveRender();
Post.prototype.constructor = Post;

// Modal publish button
$newPostForm.on('submit', function(event) {
	event.preventDefault();

	var tempPost = new Post($yourName.val(), $postTitle.val(), $content.val());
	tempPost.saveToLs(tempPost);
	tempPost.renderTemplate('#post-template', '#post-list');

});

// Post delete button
$newPostForm.on('submit', '.delete', function() {


});

//On page load, display stored items 
localItems.renderTemplateAll('#post-template', '#post-list');

//Enables input focus for modal
$('#new-post').on('shown.bs.modal', function () {
  $('#your-name').focus()
})

})