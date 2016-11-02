angular.module('App', []).controller('HelpItemController', function ($scope) {
	$scope.ItemCollections = [];
	var jIndex = 0;
	var pageSize = 10;
	
	for (var i = 0; i < 4; i++) {
		var itemCollection = {};
		itemCollection.Id = "collection" + i;
		itemCollection.CategoryName = "Category" + i;
		itemCollection.Items = [];
		for (var j = jIndex; j < pageSize + jIndex; j++) {
			var item = {};
			item.Title = "Help Item Title " + j;
			item.Content = "Help Item Content" + j;
			item.Id = "ItemId" + j;
			itemCollection.Items.push(item);
		}
		jIndex += pageSize;
		$scope.ItemCollections.push(itemCollection);
	}
	
	$scope.GdsTypes = ["Amadeus", "Galileo","Sabre"];
	
	$scope.OrderBy = ["ASC","DESC"];
});
