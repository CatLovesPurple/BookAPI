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
			res.json(books);
		});
	}
	
	var post = function(req,res){
		var book = new Book(req.body);

		book.save();
		res.status(201).send(book);
	 }

	return {
		post : post,
		get : get
	}


}

module.exports = bookController;