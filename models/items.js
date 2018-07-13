var mongoose = require('mongoose');
// User Schema
var ItemsSchema = mongoose.Schema({
	Budget: {
		type: String
	}, 
	Food:{
		type: Array
	},
	FoodList: {
		type: String
	},
    People : {
		type: Number
	},
	Query : {
		type: String
	},
	Venue : {
		type: String
	}
});

var Items = module.exports = mongoose.model('Items', ItemsSchema);
