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
	this.index = Post.count + 1;

	this.items = localStorage.getItem('posts');
	this.key = 'posts';
}

Post.prototype.addHighFive = function() {
	this.highFiveCount += 1;
}

//Save render constructor and prototypes
function SaveRender(storedPosts) {
	this.storedPosts = storedPosts;
	this.key = 'posts'
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

//Render template all
SaveRender.prototype.renderTemplateAll = function(template_source, where) {
	Post.count = 0;
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
	// tempPost.renderTemplate('#post-template', '#post-list');
	$('#post-list').html('');
	refresh();

	$('#new-post').modal('hide');

});

//reindex function for individual post delete button
function reindex(arr) {
	$.each(arr, function(index) {
		this.index = index + 1;
	});
}

// Post delete button
$('#post-list').on('click', '.delete', function() {
	if (confirm('Are you sure you want to delete this post?')) {
		var $post = $(this).closest(".post").index();
		var items = JSON.parse(localItems.storedPosts);
		var index = reverseNum(items, $post);
		items.splice(index, 1);
		reindex(items);

		// items[reverseNum(items, $post)].splice($);
		localStorage.clear();
		localStorage.setItem('posts', JSON.stringify(items));
		$('#post-list').html('');
		refresh();
	}

});

// Delete all posts button
$('#delete-all').on('click', function() {
	if (confirm('Are you sure you want to delete all posts?')) {
		localStorage.clear();
		$('#post-list').html('');
		Post.count = 0;
	}
})

//Used to find the index of posts in storedItems based on the index of the child div in parent div
function reverseNum(arr, index) {
	return arr.length - (index + 1);
}

// Add high five to post on click
$('#post-list').on('click', '.high-five-click', function() {
	var $post = $(this).closest(".post").index();
	var items = JSON.parse(localItems.storedPosts);

	items[reverseNum(items, $post)].highFiveCount += 1;
	localStorage.clear();
	localStorage.setItem('posts', JSON.stringify(items));
	$('#post-list').html('');
	reindex(items);
	refresh();


});

//refresh list.
function refresh() {
	localItems = new SaveRender(localStorage.getItem('posts'));
	localItems.renderTemplateAll('#post-template', '#post-list');
}

//On page load, displays stored posts
refresh();

//Enables input focus for modal
$('#new-post').on('shown.bs.modal', function () {
  $('#your-name').focus()
})

})