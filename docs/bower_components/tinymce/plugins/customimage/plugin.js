tinymce.PluginManager.add('insertimagecustom', function(editor) {

  editor.addButton('insertimagecustom', {
    tooltip: 'Insert image',
    icon: 'image',
    onclick: function () {
      editor.$scope.showImageLibrary().result.then(function(selectedImage) {
        editor.insertContent('<img src="' + selectedImage.imagePath + '" />');
      });
    }
  });

  editor.addMenuItem('insertimagecustom', {
		tooltip: 'Insert image',
    icon: 'image',
    onclick: function () {
      editor.$scope.showImageLibrary().result.then(function(selectedImage) {
        editor.insertContent('<img src="' + selectedImage.imagePath + '" />');
      });
    }
	});
});