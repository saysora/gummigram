/* It's a work in progress */

/* TODO:

  + Add Spot to show current user for posting;
  + Add editing for posts
  + Fix Editing for Comments

*/


var authors = [
  {
    'id': 1,
    'name': 'Sora',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/sora-avatar.png'
  },
  {
    'id': 2,
    'name': 'Kairi',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kairi-avatar.png'
  },
  {
  'id': 3,
  'name': 'Riku',
  'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/riku-avatar.png'
  },
  {
    'id': 4,
    'name': 'Aqua',
    'profileImage':'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/aqua-avatar.png'
  },
  {
    'id': 5,
    'name': 'Terra',
    'profileImage':'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/terra-avatar.png'
  },
  {
    'id': 6,
    'name': 'Ventus',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-ventus.png'
  },
  {
    'id':7,
    'name': 'Roxas',
    'profileImage':'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/roxas-avatar.png'
  },
  {
    'id':8,
    'name': 'Naminé',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/namine-avatar.png'
  },
  {
    'id': 9,
    'name': 'Axel',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-axel.png',
  },
  {
    'id': 10,
    'name': 'Saïx',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-saix.png'
  },
  {
    'id': 11,
    'name': 'Zexion',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-zexion.png'
  },
  {
    'id': 12,
    'name': 'Xigbar',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-xigbar.png'
  },
  {
    'id': 13,
    'name': 'Luxord',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-luxord.png',
  },
  {
    'id': 14,
    'name': 'Xaldin',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-xaldin.png'
  },
  {
    'id': 15,
    'name': 'Vexen',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-vexen.png',
  },
  {
    'id': 16,
    'name': 'Demyx',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-demyx.png'
  }, 
  {
    'id': 17,
    'name': 'Marluxia',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-marluxia.png',
  },
  {
    'id': 18,
    'name': 'Larxene',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-larxene.png'
  },
  {
    'id': 19,
    'name': 'Lexeaus',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-lexaus.png'
  },
  {
    'id': 20,
    'name': 'Xemnas',
    'profileImage': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-xemnas.png'
  }
];

var posts = [
  {
    'id': 1,
    'author': 1,
    'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/kh-cold.jpg',
    'caption': `I couldn't believe that Arendelle was so cold! 
I definitely didn't pack for this kind of weather. #freezing #whyisitsocold`,
    'comments': [
        {
            'id': 1,
            'author': '2',
            'message': 'We never really got too much cold weather on Destiny Islands.'
        }
    ]
  },
  {
    'id': 2,
    'author': 2,
    'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/26158/yensid.png',
    'caption': `Master Yen Sid really is amazing... If it wasn't for his guidance I would have no idea where to start with being a keyblade wielder... or how I could help Sora. #keyblademaster`,
    'comments': [
        {
            'id': 1,
            'author': 3,
            'message': 'Master Yen Sid really is incredible.'
        }
    ]
  }
];

/* Set the user on load */

var currentUser = authors[0];

/* *
 * Comment Codes 
 * */


/* Set the comment form to post new one */

$(document).on('submit', '.comment-input-form', function(e){
  /* Iterate comment num */
  e.preventDefault();

  /* Set the message to the input */
  var message = $(this).find('.comment-input-field').val();
  /* Post the comment with function */
  

  makeNewComment(currentUser.id, $(this).parent().parent().data('post'), message);

  $(this).find('.comment-input-field').val('');
});

$(document).on('keydown', '.comment-input-field', function(event){
  if(event.keyCode === 13) {
    event.preventDefault();
    $(this).parent('.comment-input-form').trigger('submit');
  }
});

 /** 
  * Comment Creation
  * Comments need an author (the one posting it), the post it is applying to (by id)
  * and the message the comment will say. Adds it to the comments array within the proper post.
  */

function makeNewComment(author,post,message) {

  var origPost = posts.find(function(ogPOST){
     if(ogPOST.id == post) {
         return ogPOST;
     }
  });


  var commentsNum = (origPost.comments.length + 1);
  if(message.length > 0){
    origPost.comments.push({
        'id': commentsNum,
        'author': author,
        'message': message
    });

    buildPostList();
  }

}

/* Comment Editing */

$(document).on('click', '.comment-item', function(){
  var id= $(this).attr('id');
  
  var that = $(this);
  var message = $(this).children('.comment-message');
  //var original = message.text();
  //console.log(original);
  
  
  if(!$(this).hasClass('editing')) {
    
    $(this).addClass('editing');
    var post = posts.find(function(post){
      if(that.data('post') == post.id) {
        return post;
      }
    });
    var comment = post.comments.findIndex(function(comment){
      if(that.data('comment') == comment.id) {
        return comment;
      }
    })
    
    var original = post.comments[comment].message;
    
    
  message.html(`<textarea class="comment-input-field edit">${original.trim()}</textarea>`);
    
  $(document).on('keydown', '.comment-input-field.edit', function(e){
    var newMessage = $(this).val();
    if(e.keyCode === 27) {
     that.removeClass('editing');
     message.text(message);
      $(document).off('keydown', '.comment-input-field.edit'); 
    }

    if(e.keyCode === 13) {
      e.stopPropagation;
      if($.trim( $(this).val() ).length == 0) {
        e.keyCode = 27;
        $(this).trigger(e);
        return;
      }
      that.removeClass('editing');
      //$('#' + id).find('.comment-message').html($(this).val());
      console.log(comment);
      post.comments[comment].message = newMessage;
      buildPostList();
      $(document).off('keydown', '.comment-input-field.edit'); 
      }
    
 
    
});

}
  
});

$(document).on('click', '.comment-delete', deleteComment);

function deleteComment() {
    var comment = $(this).parent().parent();
  
    var post = posts.find(function(thePost) {
        if(comment.data('post') == thePost.id) {
            return thePost;
        }
    });
    var ogComment =  post.comments.find(function(theComment){
        if(comment.data('comment') == theComment.id) {
            return theComment;
        }
    });

    var comIndex = post.comments.indexOf(ogComment);
    post.comments.splice(comIndex, 1);
    buildPostList();
}

function toggleMenu(elem, othermenu) {
  var menu = $(elem);
  var slideOut = $(othermenu);
  menu.on('click', function(){
    
    if(menu.hasClass('active')) {
      menu.removeClass('active');
      slideOut.removeClass('active');
    } else {
      menu.addClass('active');
      slideOut.addClass('active');
    }
  });
}

toggleMenu('#appMenu', '#sideMenu');

$('#newPost').on('submit', function(e){
  e.preventDefault();
  var caption = $(this).find("#postCaption");
  var image = $(this).find('#postImage');
  if(image.val() !== '') {
   if( $(this).find('#charAccount').val() == 0) {
    makeNewPost(currentUser, image.val(), caption.val()); 
   } else {
     var poster = authors.find(function(search){
       if($('#charAccount').val() == search.id) {
         return search;
       }
     });
     makeNewPost(poster, image.val(), caption.val());
   }
    
    caption.val('');
    image.val('');
    window.location.href = '#';
  }
  
});

/*
$('#postCaption').on('keyup', function(e){
  var that = $(this);
  setTimeout(function(){
    var hashReg = /\W(\#[a-zA-Z]+\b)(?!;)/gm;
    var str = that.val();

    while ((m = hashReg.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === hashReg.lastIndex) {
          hashReg.lastIndex++;
      }
      
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
          console.log(match);
          var hash = that.find(match);
          
      });
    }
  }, 2000);

});

*/


function makeNewPost(author, image, caption) {
  var user = author;
  var propCaption = caption.replace(/(<([^>]+)>)/ig,"");
  var num = parseInt(posts.length + 1);

  /* Regex for Hashtag */

  var hashReg = /\W(\#[a-zA-Z]+\b)(?!;)/gm;
  var hashReg = /(?:\s|^)#[A-Za-z0-9\-\.\_]+(?:\s|$)/g;
  var hashtag = '';


    while ((m = hashReg.exec(propCaption)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === hashReg.lastIndex) {
          hashReg.lastIndex++;
      }
      
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        //console.log(groupIndex);
        propCaption.replace(match, '<span class="heart">' + match.replace('#','') + '</span>');
      });
    }


//var hashedCap = propCaption.replace(/(?:\s|^)#[A-Za-z0-9\-\.\_]+(?:\s|$)/g, 'Yo');

//console.log(propCaption);

  if(image !== ''){
    
    posts.push({
      'id': num,
      'author': user.id,
      'image': image,
      'caption': propCaption,
      'comments': []
    });
  }
 
  buildPostList();
  
  
}

function closeMenus() {
  $('#appMenu').removeClass('active');
  $('#sideMenu').removeClass('active');
}

$('a').on('click', closeMenus);


function buildPostList() {
  var postList = "";
  
  posts.slice().reverse().forEach(function(post){
    var postComments = '';
    var theAuthor = authors.find(function(author){
      if(author.id == post.author) {
        return author;
      }
    });

    if(post.comments.length > 0) {
        post.comments.forEach(function(comment) {
            var commentAuthor = authors.find(function(comAuth){
                if(comAuth.id == comment.author) {
                    return comAuth;
                }
            });
            postComments += `
            <div class="comment-item" id="comment-${comment.id}" data-post="${post.id}" data-comment="${comment.id}">
                <div class="comment-author-image">
                    <img src="${commentAuthor.profileImage}">
                </div>
                <div class="comment-message">
                    ${comment.message}
                </div>
                <div class="comment-tools">
                    <div class="comment-delete">X</div>
                </div>
            </div>
            `;
        });
    }
    
    postList += `
<div class="feed-item" id="post-${post.id}">
<div class="item-header">
  <div class="item-avatar">
<div class="author-image">
<img src="${theAuthor.profileImage}">
</div>
<div class="author-name">
${theAuthor.name}
</div>
  </div>
  <div class="item-controls">
                    <div class="tool-button">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                    <div class="tool-bar">
                        <div class="tool-bar-item">Edit Post</div>
                        <div class="tool-bar-item delete-post" data-post="${post.id}">Delete Post</div>
                        
                    </div>
                </div>
  </div>
<div class="item-image">
<img src="${post.image}">
</div>
<div class="item-caption">
${post.caption}
</div>
<div class="item-comments" data-post="${post.id}">
          <div class="comment-list" id="comment-post-${post.id}">
            ${postComments}
          </div>
          
          <div class="comment-input">
            <form class="comment-input-form" data-post="comment-post-${post.id}">
            <textarea class="comment-input-field" type="text" placeholder="Enter Comment" ></textarea> 
            </form>
          </div>
            
        </div>  
</div>`;
    
    

  });
  
  $('#activeFeed').html(postList);
  makeHeartTag(); 
}

$(document).ready(function(){
  buildPostList();
  listChars();
});

function listChars() {
  var charListSpot = $('#characterList');
  var selectChars = $('#charAccount');
  var curUserList = '';
  var selectList ='';
  authors.forEach(function(author) {
    curUserList += `
    <div class="char-option ${author.id == 1 ? 'active' : ''}" data-char="${author.id}">
<div class="char-option-image">
<img src="${author.profileImage}">
</div>
<div class="char-option-name">
${author.name}
</div>
</div>
`;
    selectList += `
<option value="${author.id}">
${author.name}
</option>
`;
  });
  
  
  selectChars.append(selectList);
  charListSpot.html(curUserList);
}

/* Update Current Character Icon */

function swapChar(author) {
  $('#curChar').html(`
    <img src="${author.profileImage}">
  `);
}

$('#curCharHold').on('click', swapChar(currentUser));



$(document).on('click', '.char-option', function(e){
  e.preventDefault();
  var that = $(this);
  var user = authors.find(function(author){
    if(that.data('char') == author.id) {
      return author;
    }
  });
  $('.char-option').removeClass('active');
  that.addClass('active');
  currentUser = user;
  swapChar(currentUser);
  window.location.href = '#';
  
});

$(document).on('click', '.item-controls', function(e){
  e.stopPropagation();
    if($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $(this).addClass('active');
    }
});

$(document).on('click', '.delete-post', function(e){
    e.stopPropagation();
    var that = $(this);
    var sure = confirm('Are you sure you want to delete?');

   if(sure) {
    //$('#post-' + $(this).data('post')).remove();
    
    var thePost = posts.find(function(post){
        if(post.id == that.data('post')) {
            return post;
        }
    });

    var index = posts.indexOf(thePost);
   
    posts.splice(index, 1);
    
   buildPostList();
}
   

});

/* Close menus if clicked out of */

$(window).on('click', function(e){
  $('.item-controls').removeClass('active');
});

function makeHeartTag() {
  var hashtag = $('.item-caption').text().match(/\W(\#[a-zA-Z]+\b)(?!;)/gm);
  
  hashtag.forEach(function(hash){
    
    var index = $('.item-caption:contains(' + hash +')');

    //console.log(index.html().replace(hash, ' <span class="heart">' + hash.replace('#','').trim() + '</span> '));

    index.html(index.html().replace(hash, ' <span class="heart">' + hash.replace('#','').trim() + '</span> '));

  });
}