'use strict';



// use removeClass to hide images after selection

//let userSelection = ()
let pageInfo;

function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.keyword = horn.keyword;
  this.horns = horn.horns;

}

//event listner for user selected option
// We need to listen for a change in the drop down menu- done

// we need to determine the value the user selected on the page- done
$('select').on('change', function(){
  let userSelection = $(this).find(':selected').attr('value');
  console.log('this is what the user picked:',userSelection );
  if (userSelection === 'default'){
    $('.hornanimal').show();
  }else{
    $('.hornanimal').hide();
    $(`.${userSelection}`).show();
  }
})

$('button').on('click',function(){
  console.log(this.id);
  let buttonSelection = this.id;
  console.log('this is what user selected', buttonSelection);
  if (buttonSelection === 'pageone'){
    pageInfo = 'data/page-1.json'
    $(() => Horn.readJson());
  }
  else if (buttonSelection === 'pagetwo') {
    pageInfo = 'data/page-2.json'
    $(() => Horn.readJson());
  }
})

// we need to pass userSelection value to the render function



// creating an array of objects

Horn.prototype.render = function () {
  // using jquery to create a div element on the page
  let $hornClone = $(`<div class = "hornanimal ${this.keyword}"></div>`);
  $hornClone.html($('#photo-template').html());
  $hornClone.find('h2').text(this.title);
  $hornClone.find('img').attr('src', this.image_url);

  console.log($hornClone);
  $('main').append($hornClone);
}//);

Horn.readJson = () => {
  console.log(pageInfo);
  const ajaxSettings = { method: 'get', dataType: 'json' };
  $.ajax( pageInfo, ajaxSettings)
    .then(data => {
      console.log('our array of horns', data);
      data.forEach(item => {
        let horn = new Horn(item);
        //if (userSelection === horn.keyword);
        horn.render();
      })
    })
}


$(() => Horn.readJson());
