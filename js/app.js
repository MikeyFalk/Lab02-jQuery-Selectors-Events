'use strict';



// use removeClass to hide images after selection

//let userSelection = ()
let pageInfo;
let hornArray = [];

function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  this.description = horn.description;

}

//event listner for user selected option
// We need to listen for a change in the drop down menu- done

// we need to determine the value the user selected on the page- done
$('select').on('change', function () {
  let userSelection = $(this).find(':selected').attr('value');
  console.log('this is what the user picked:', userSelection);
  if (userSelection === 'default') {
    $('.hornanimal').show();
  } else {
    $('.hornanimal').hide();
    $(`.${userSelection}`).show();
  }
})

$('button').on('click', function () {
  console.log(this.id);
  let buttonSelection = this.id;
  console.log('this is what user selected', buttonSelection);
  if (buttonSelection === 'pageone') {
    pageInfo = 'data/page-1.json'
    $(() => Horn.readJson());
  }
  else if (buttonSelection === 'pagetwo') {
    pageInfo = 'data/page-2.json'
    $(() => Horn.readJson());
  }
})


Horn.readJson = () => {
  const ajaxSettings = { method: 'get', dataType: 'json' };
  $.ajax(pageInfo, ajaxSettings)
    .then(data => {
      console.log('our array of horns', data);

      hornArray = []
      $('section').empty();
      // data.forEach(item => {
      //   let horn = new Horn(item);
      //   //if (userSelection === horn.keyword);
      Horn.prototype.toHtml = function () {
        let template = $('#photo-template').html();
        let html = Mustache.render(template, this);
        return html;
      }


      data.forEach(item => {
        hornArray.push(new Horn(item));
      })

      hornArray.forEach(item => {
        $('#gallery').append(item.toHtml());
      })



      //horn.render();
      // })
    })

}

// $(() => Horn.readJson());
