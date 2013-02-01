

var styl=document.createElement("style");
styl.innerHTML = "@-webkit-keyframes in-pop /* Safari and Chrome */  { \
from {-webkit-transform:scale(0.7,0.7) translate(-100px,0); opacity:0.3} \
to {-webkit-transform:scale(1,1) translate(0,0); opacity:1} } \
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
 $(success).css('-webkit-animation', 'in-pop 400ms');\
 success.style.padding = '10px'; \
 success.style.clear = 'both'; \
  success.style.marginBottom = '15px'; \
 success.style.backgroundColor = 'rgb(55,240,140)'; \
  success.style.border = '1px solid rgb(20,200,50)'; \
 success.style.textAlign = 'center'; \
 success.style.color = 'white'; \
 success.style.fontWeight = 'bold'; \
 success.style.textShadow = '1px 1px 5px rgba(0,0,0,0.2)'; \
 var cancel_success_msg = document.createElement(''); \
success.innerHTML = 'The comments have been sorted by your LiveFyre Sorter Extension'; \
$(success).insertAfter('.fyre-stream-sort'); } \
";


document.body.appendChild(sc);
document.body.appendChild(document.createElement("button"));