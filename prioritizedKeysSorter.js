function prioritizedKeysSorter(sortKeys, ascending) {
	ascending = ascending != undefined? ascending: true;
	var direction = ascending? 1: -1;

	return function(a, b) {

		// If A and B have the same value for each key, then do not alter their order.
		var order = 0;

		sortKeys.every(function(key) {

			// If only A or only B has a value for the key, then that item has a higher precendence, regardless of wether we are sorting ascending or descending.
			if(a[key] != undefined && b[key] == undefined) {
				order = -1;
				return false; // break
			} else if(a[key] == undefined && b[key] != undefined) {
				order = 1;
				return false;
			}

			// If A and B both have a value for the key, compare them. If they are equal, move on to the next highest priority sort key.
			else {
				if(a[key] < b[key]) {
					order = -1 * direction;
					return false;
				} else if(a[key] > b[key]) {
					order = 1 * direction;
					return false;
				} else return true; // continue
			}
		});

		return order;
	}
}

// Testing
(function() {
	var assert = require('assert');

	// Test prioritizedKeysSorter
	(function(sorter) {
		var data = [
			{
				firstName: "Dan",
				lastInitial: "R",
				age: 28,
				hometown: "Nanaimo",
				height: 183,
				weight: 77.3,
				missingTeeth: 4
			},
			{
				firstName: "Mike",
				lastInitial: "E",
				age: 29,
				hometown: "Nanaimo",
				height: 185,
				weight: 86.18
			},
			{
				firstName: "Corey",
				lastInital: "Z",
				hometown: "Nanaimo",
				age: 28,
				missingTeeth: 2
			}
		];

		function verifyOrder(list, order) {
			list.forEach(function(item, i, data) {
				if(item.firstName != order[i]) assert.fail(item.firstName, order[i], 'Incorrect order', '==');
			});
		}

		// The simple case: Sort by one key that is defined in each item.
		(function(data) {
			data.sort(sorter(['firstName']));
			verifyOrder(data, ['Corey', 'Dan', 'Mike']);
		})(data.concat());

		// The first key should be ignored, because it is the same for all items. The second key should sort the items numerically, in descending order. The item without a definition for the second key should be last.
		(function(data) {
			data.sort(sorter(['hometown', 'missingTeeth'], false));
			verifyOrder(data, ['Dan', 'Corey', 'Mike']);
		})(data.concat());

	})(prioritizedKeysSorter);
})();

exports.sorter = prioritizedKeysSorter;
