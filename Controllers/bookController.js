var bookController = function(Book){
	var get = function(req, res){
		var query = {};
		if(req.query.genre){
			query.genre = req.query.genre;
		}

		Book.find(query, function(err, books){
			if(err){
				//internal server errors
				res.status(500).send(err);
			}
			else{
				console.log(query);
				var returnBooks = [];
				books.forEach(function(element, index, array){
					var newBook = element.toJSON();
					newBook.links = {};
					newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
					returnBooks.push(newBook);
				});
				res.json(returnBooks);	
			}
			
		});
	}
	
	var post = function(req,res){
		var book = new Book(req.body);

		book.save();
		res.status(201);
		res.send(book);
	 }

	return {
		post : post,
		get : get
	}


}

module.exports = bookController;