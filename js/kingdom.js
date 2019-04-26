/* It's a work in progress */

/* TODO:
  + Do or do not swap commentor image on change character

*/

var localStore = window.localStorage;

var authors = [
  {
    'id': 1,
    'name': 'Sora',
    'profileImage': '/images/characters/sora-avatar.png'
  },
  {
    'id': 2,
    'name': 'Kairi',
    'profileImage': '/images/characters/kairi-avatar.png'
  },
  {
  'id': 3,
  'name': 'Riku',
  'profileImage': '/images/characters/riku-avatar.png'
  },
  {
    'id': 4,
    'name': 'Aqua',
    'profileImage':'/images/characters/aqua-avatar.png'
  },
  {
    'id': 5,
    'name': 'Terra',
    'profileImage':'/images/characters/terra-avatar.png'
  },
  {
    'id': 6,
    'name': 'Ventus',
    'profileImage': '/images/characters/kh-ventus.png'
  },
  {
    'id':7,
    'name': 'Roxas',
    'profileImage':'/images/characters/roxas-avatar.png'
  },
  {
    'id':8,
    'name': 'Naminé',
    'profileImage': '/images/characters/namine-avatar.png'
  },
  {
    'id': 9,
    'name': 'Axel',
    'profileImage': '/images/characters/kh-axel.png',
  },
  {
    'id': 10,
    'name': 'Saïx',
    'profileImage': '/images/characters/kh-saix.png'
  },
  {
    'id': 11,
    'name': 'Zexion',
    'profileImage': '/images/characters/kh-zexion.png'
  },
  {
    'id': 12,
    'name': 'Xigbar',
    'profileImage': '/images/characters/kh-xigbar.png'
  },
  {
    'id': 13,
    'name': 'Luxord',
    'profileImage': '/images/characters/kh-luxord.png',
  },
  {
    'id': 14,
    'name': 'Xaldin',
    'profileImage': '/images/characters/kh-xaldin.png'
  },
  {
    'id': 15,
    'name': 'Vexen',
    'profileImage': '/images/characters/kh-vexen.png',
  },
  {
    'id': 16,
    'name': 'Demyx',
    'profileImage': '/images/characters/kh-demyx.png'
  }, 
  {
    'id': 17,
    'name': 'Marluxia',
    'profileImage': '/images/characters/kh-marluxia.png',
  },
  {
    'id': 18,
    'name': 'Larxene',
    'profileImage': '/images/characters/kh-larxene.png'
  },
  {
    'id': 19,
    'name': 'Lexeaus',
    'profileImage': '/images/characters/kh-lexaus.png'
  },
  {
    'id': 20,
    'name': 'Xemnas',
    'profileImage': '/images/characters/kh-xemnas.png'
  }
];

if(!localStorage.getItem('posts')) {

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

} else {
  var posts = JSON.parse(localStore.getItem('posts'));
}

/* Set the user on load */

var currentUser = authors[0];

/* *
 * Comment Codes 
 * */


/* Set the comment form to post new one */

$(document).on('submit', '.comment-input-form', function(e){
  /* Iterate comment num */
  e.preventDefault();
  var that = $(this);
  /* Set the message to the input */
  var message = $(this).find('.comment-input-field').val();
  

  var person = authors.find(function(author){
    if(that.find('.mini-char-selector').data('char') == author.id) {
      return author;
    }
  });
  
  var poster = $(this).find('.mini-char-selector').data('char') != 0 ? person.id : currentUser.id;
  
  /* Post the comment with function */
  

  makeNewComment(poster, $(this).parent().parent().data('post'), message);

  $(this).find('.comment-input-field').val('');
});

$(document).on('keydown', '.comment-input-field', function(event){
  if(event.keyCode === 13) {
    event.preventDefault();
    $(this).parent().trigger('submit');
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

  $(document).scrollTop()

}

/* Comment Editing */

$(document).on('click', '.comment-item', function(e){
  $('.comment-input-field.edit').each(returnComment);
  e.stopPropagation();

  var id = $(this).attr('id');
  
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
    
  $('.comment-input-field.edit').on('keydown', function(e){
    var newMessage = $(this).val();
    if(e.keyCode === 27) {
     that.removeClass('editing');
     message.text(original);
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
      
      post.comments[comment].message = newMessage;
      buildPostList();
      $(document).off('keydown', '.comment-input-field.edit'); 
      }
    
 
    
});

}
  
});

$(document).on('click', '.comment-input-field.edit', function(e){
  e.stopPropagation();
});


/* Return Comment to old state */

function returnComment() {
  var ogComment = $(this).closest('.comment-item.editing');
  var postId = ogComment.data('post');
  var commentId = ogComment.data('comment');

  var post = posts.find(function(post){
    if(postId == post.id) {
      return post;
    }    
  });

  var comment = post.comments.find(function(comment){
    if(commentId == comment.id) {
      return comment;
    }
  });
  ogComment.removeClass('editing');
  $(this).closest('.comment-message').text(comment.message);

}

/* Comment Deletion */

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
<div class="feed-item" id="post-${post.id}" data-post=${post.id}>
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
                        <div class="tool-bar-item edit-post" data-post="${post.id}">Edit Post</div>
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
            <div class="comment-input-fields">
              <div class="mini-char-selector" data-char="">
                <div class="selected-char">
                    
                </div>
                <div class="selected-char-options">

              </div>
            </div>
            <textarea class="comment-input-field" type="text" placeholder="Enter Comment" ></textarea> 
            </form>
          </div>
            
        </div>  
</div>
</div>`;
    
    

  });
  
  $('#activeFeed').html(postList);

  makeHeartTag();
  buildCommentorOpts();
  localStore.setItem('posts', JSON.stringify(posts));
}

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
  $('.selected-char').html(`
    <img src="${author.profileImage}">
  `);
  $('.selected-char').closest('.mini-char-selector').attr('data-char', author.id);
}

$('#curCharHold').on('click', swapChar(currentUser));

/** 
 * Character Switcher
*/

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

/**
 * Post Controls
 */

$(document).on('click', '.item-controls', function(e){
  e.stopPropagation();
    if($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $(this).addClass('active');
    }
});

/**
 * Edit Post Caption
 */

$(document).on('click', '.edit-post', function(e){
  e.stopPropagation();
  var that = $(this);

  var post = posts.findIndex(function(post){
    if(that.data('post') == post.id) {
      return post;
    }
  });

  var editPost = $('#post-' + posts[post].id).find('.item-caption');
  var curState = editPost.html();

  editPost.html(`
  <textarea class="item-caption-input" rows="4">${posts[post].caption.trim()}</textarea>
  `);

  $(document).on('keydown', '.item-caption-input', function(e){

    if(e.keyCode === 27) {
      editPost.html(curState);
      $(document).off('keydown', '.item-caption-input');
    }

    if(e.keyCode === 13) {

      posts[post].caption = editPost.find('.item-caption-input').val().trim();
      buildPostList();
      
      $(document).off('keydown', '.item-caption-input');
    }
    
    
  });

  

});



/**
 * Post Deletion
 */

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


function makeHeartTag() {
  var hashtag = $('.item-caption').text().match(/\W(\#[a-zA-Z]+\b)(?!;)/gm);
  
  
  if(hashtag !== null) {
    hashtag.forEach(function(hash){
      
      var index = $('.item-caption:contains(' + hash +')');

      //console.log(index.html().replace(hash, ' <span class="heart">' + hash.replace('#','').trim() + '</span> '));

      index.html(index.html().replace(hash, ' <span class="heart">' + hash.replace('#','').trim() + '</span> '));

    });
  }
}


function buildCommentorOpts() {
  var chars = authors.slice();
  
  var authorOutput = '';
  chars.reverse().forEach(function(author){
      authorOutput += `
      <div class="selected-char-option" data-char="${author.id}">
          <div class="char-option-image">
              <img src="${author.profileImage}">
          </div>
      </div>
      `;    
  });

  $('.selected-char').html(`<img src="${currentUser.profileImage}">`);
  $('.selected-char-options').html(authorOutput);


  $('.mini-char-selector').on('click', function(e){
      e.stopPropagation();
      
      var opts = $(this).find('.selected-char-options');
      if(opts.hasClass('active')) {
          opts.removeClass('active');
      } else {
          opts.addClass('active');
          opts.animate({
            scrollTop: opts.height() + 'px'
          });
      }
  });

  $('.selected-char-option').on('click', function(){
    var that = $(this);
    var swappedAuth = authors.find(function(author){
      if(that.data('char') == author.id) {
        return author;
      }
    });
    //console.log(swappedAuth);

      $(this).parent().find('.selected-char-option').removeClass('active');
      $(this).addClass('active');
      $(this).parent().siblings('.selected-char').html(`
          <img src="${swappedAuth.profileImage}">
      `);
     $(this).parent().parent().attr('data-char', $(this).data('char'));
     
  });
}




/* Close menus if clicked out of */

$(window).on('click', function(e){
  $('.item-controls').removeClass('active');
  $('.selected-char-options').removeClass('active');
  
  $('.comment-input-field.edit').each(returnComment);
});

//$(document).on('drop', '#dropURL', dropImage);

function dropImage(e) {
  e.preventDefault();
  var image = e.dataTransfer.getData('text/plain');
  $('#postImage').val(image);
  checkImage(image);

}

// Set Image Input to detect when there is an image



function checkImage(imageInput) {
  
  var imgReg = /\.(gif|jpg|jpeg|png)$/i;
  
  
  if(imgReg.test(imageInput)) {
    document.getElementById('dropURL').innerHTML = '<img class="image-preview" src="' + imageInput + '">';
    document.getElementById('dropURL').classList.add('full');
  } else {
    document.getElementById('dropURL').innerHTML = ' Drop Image URL';
    document.getElementById('dropURL').classList.remove('full');
  }


}

var debImage = debounce(function(){
  checkImage($('#postImage').val());
}, 250);


// Quick Debounce

function debounce(func, wait, immediate) {

  var timeout;

  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if(!immediate) func.apply(context,args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context,args);

  }

}


document.getElementById('dropURL').addEventListener('drop', dropImage, false);

/* Build on Ready */

$(document).ready(function(){
  buildPostList();
  listChars();
  $('#postImage').on('keydown', debImage);
});
