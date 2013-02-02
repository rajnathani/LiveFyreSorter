
var styl=document.createElement("style");
styl.innerHTML = "@-webkit-keyframes in-pop /* Safari and Chrome */  { \
from {-webkit-transform:scale(0.7,0.7) translate(-100px,0); opacity:0.3} \
to {-webkit-transform:scale(1,1) translate(0,0); opacity:1} } \
\
#livefyre-extension-success-message { \
	position:relative; \
 padding :9px 22px; \
clear :both; \
margin-bottom :15px; \
background-color :rgb(55,240,140); \
  border :2px dashed rgb(20,200,80); \
text-align :center; \
font-size:14px; \
color :white; \
font-weight : bold; \
text-shadow :1px 1px 5px rgba(0,0,0,0.2); \
-webkit-animation: in-pop 400ms; \
} \
\
#livefyre-extension-cancel-success-message { \
	position:absolute; \
	cursor:pointer; \
	top:1px; \
	right:2px; \
	width:14px; \
	border:2px solid rgba(240,240,240,0.95); \
	border-radius:1em; \
	line-height:14px; \
	text-align:center; \
	color:rgba(245,245,245,0.95); \
	font-size:14px; \
} \
\
#livefyre-extension-cancel-success-message:hover { \
color:rgba(255,255,255,0.95); \
} \
"
document.body.appendChild(styl);

var sc = document.createElement("script");

sc.innerHTML = "\
 $('#livefyre-extension-success-message').remove(); \
 $('.fyre-comment-article').css('-webkit-animation', 'in-pop 400ms');\
var fyre_stream_contents = $('.fyre-stream-content'); \
for (var count=0; count < fyre_stream_contents.length; count++ ){ \
    var fyre_stream_content = fyre_stream_contents[count]; \
    var comments = fyre_stream_content.childNodes; \
    var comment_likes = []; \
    for (var i=0; i < comments.length; i++){ \
  var comment_wrapper = comments[i].firstChild; \
    try { \
    var like_count = $(comment_wrapper).find('.fyre-comment-like-count')[0].innerHTML; \
    } \
    catch (err){ \
        continue; \
    } \
    if (like_count === ''){ like_count=0} \
    comment_likes.push([comments[i], parseInt(like_count,10)]); \
} \
var sorted_comment_likes = comment_likes.sort(function(a, b) {return b[1] - a[1]}); \
$(fyre_stream_content).empty(); \
 var i=0; \
  var interval = setInterval(function() {  \
   if (i >= sorted_comment_likes.length) {clearInterval(interval);} \
             fyre_stream_content.appendChild(sorted_comment_likes[i][0]); i++;  \
          }, 10); \
} \
if (document.getElementById('livefyre-extension-success-message') == undefined){ \
var success = document.createElement('div'); \
 success.id = 'livefyre-extension-success-message'; \
 var cancel_success_msg = document.createElement('div'); \
 cancel_success_msg.id = 'livefyre-extension-cancel-success-message'; \
 cancel_success_msg.innerHTML = 'x'; \
 $(cancel_success_msg).bind('click', function(){  $(this.parentNode).remove();  }); \
success.innerHTML = 'The comments below have been sorted on the basis of likes by your LiveFyre Sorter Extension'; \
success.appendChild(cancel_success_msg); \
$(success).insertAfter('.fyre-stream-sort'); \
 } \
";


document.body.appendChild(sc);
document.body.appendChild(document.createElement("button"));