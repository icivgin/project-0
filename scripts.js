$(function() {

var $yourName = $('#your-name');
var $postTitle = $('#post-title');
var $content = $('#content');
var $newPostForm = $('new-post-form');

// Post constructor and prototype functions
function Post (owner, title, content) {
	var date = new Date()
	this.owner = owner;
	this.title = title;
	this.content = content;
	this.highFiveCount = 0;
	this.date = date.toDateString();
	this.index = Post.count;
}

Post.count = 0;

Post.prototype.save = function() {

}

Post.prototype.render = function() {

}

Post.prototype.delete = function() {

}

Post.prototype.highFive = function() {

}

// Modal publish button
$newPostForm.on('submit', function() {

});

// Post delete button
$newPostForm.on('submit', '.delete', function() {


});

var x = new Post('Ian Civgin', 'Test', 'lasjcasiahoiesfasdf,aelfia');

console.log(x);

$('#new-post').on('shown.bs.modal', function () {
  $('#your-name').focus()
})

})