var express = require('express');

var routes = function(Book){
	var bookRouter = express.Router();

	bookRouter.use("/:bookId", function(req, res, next){
		Book.findById(req.params.bookId, function(err, book){
				if(err){
					//internal server errors
					res.status(500).send(err);
				}
				else if(book){
					req.book = book;
					next();
				}
				//book is not found
				else{
					res.status(404).send('book not found');
				}
			});
	});

	bookRouter.route('/:bookId')
		.put(function(req, res){
	 		var book = req.book;
			if(err){
				//internal server errors
				res.status(500).send(err);
			}
			else{
				book.title = req.body.title;
				book.author = req.body.author;
				book.genre = req.body.genere;
				book.read = req.body.read;

				req.book.save(function(err){
					if(err){
						res.stats(500).send(err);
					}
					else{
						res.json(req.book);
					}
				});			
			}
		})
		.patch(function(req, res){
			if(req.body._id){
				delete req.body._id;
			}
			for(var key in req.body){
				req.book[key] = req.body[key];
			}
			req.book.save(function(err){
				if(err){
					res.stats(500).send(err);
				}
				else{
					res.json(req.book);
				}
			});
		})

		.get(function(req, res){
			res.json(req.book);
		})
		.delete(function(req, res){
			req.book.remove(function(err){
				if(err){
					res.status(500).send(err);
				}
				else{
					res.status(204).send("Removed");
				}
			});
		});

	bookRouter.route('/')
		.post(function(req,res){
			var book = new Book(req.body);
			book.save();
			res.status(201).send(book);

			res.send(book);
		})
		.get(function(req, res){
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
		});

	return bookRouter;
};

module.exports = routes;