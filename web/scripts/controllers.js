angular.module('App', []).controller('HelpItemController', function ($scope) {
	$scope.ItemCollections = [];

	for (var i = 0; i < 3; i++) {
		var itemCollection = {};
		itemCollection.Id = "collection" + i;
		itemCollection.CategoryName = "Category" + i;
		itemCollection.Items = [];
		for (var j = 0; j < 5 + i; j++) {
			var item = {};
			item.Title = "Help Item Title " + j;
			item.Content = "Help Item Content" + j;
			item.Id = "ItemId" + j;
			itemCollection.Items.push(item);
		}
		$scope.ItemCollections.push(itemCollection);
	}
});
