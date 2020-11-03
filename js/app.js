'use strict';


function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.keyword = horn.keyword;
  this.horns = horn.horns;

}

Horn.prototype.render = function () {
  let $hornClone = $('<div></div>');
  $hornClone.html($('#photo-template').html());
  $hornClone.find('h2').text(this.title);
  $hornClone.find('img').attr('src', this.image_url);
  console.log($hornClone);
  $('main').append($hornClone);
}

Horn.readJson = () => {
  const ajaxSettings = { method: 'get', dataType: 'json' };
  $.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
      console.log('our array of horns', data);

      // for (i = 0; i < horn.length; i++) {
      data.forEach(item => {
        let horn = new Horn(item);
        horn.render();
      })
      //   new Horn(horn.title, horn.image_url);
      // }
    })
}
$(() => Horn.readJson());
