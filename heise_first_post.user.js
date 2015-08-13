// ==UserScript==
// @name           Heise.de - First Post
// @namespace      https://github.com/LenAnderson/
// @downloadURL    https://github.com/LenAnderson/Heise-First-Post/raw/master/heise_first_post.user.js
// @version        0.3
// @include        http://www.heise.de/forum/*/forum-*/
// ==/UserScript==

function firstPost() {
    function retrieveFirstPost(thread) {
        var url = thread.querySelector('.posting_subject').href;
        if (!url) return;
        var spinner = document.createElement('div');
        spinner.classList.add('hfp_spinner');
        spinner.style.top = thread.offsetTop + 3 + 'px';
        thread.appendChild(spinner);
        var xhr = new XMLHttpRequest();
        xhr.thread = thread;
        xhr.open('GET', url, true);
        xhr.addEventListener('load', addPreview);
        xhr.send();
    }
    function addPreview(evt) {
        var post = new DOMParser().parseFromString(evt.target.responseText, 'text/html');
        var prev = document.createElement('div');
        prev.style.top = evt.target.thread.offsetTop + 'px';
        prev.style.left = evt.target.thread.offsetLeft + 50 + 'px';
        prev.classList.add('hfp_container');
        prev.appendChild(post.querySelector('.first_posting'));
        prev.querySelector('.posting_options_wrapper').remove();
        evt.target.thread.appendChild(prev);
        evt.target.thread.querySelector('.hfp_spinner').remove();
    }
    
    var style = document.createElement('style');
    style.innerHTML = '.hfp_container { position: absolute; z-index: 1000; padding: 10px; background: white; box-shadow: 3px 3px 15px rgba(0,0,0,0.5); overflow: hidden; display: none; white-space: normal; } .posting_element:hover .hfp_container { display: block; }';
    style.innerHTML += '.hfp_spinner { position: absolute; left: 6px; height: 16px; width: 16px; background-image: url("data:image/gif;base64,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");';
    document.body.appendChild(style);
    Array.prototype.forEach.call(document.querySelectorAll('.posting_element'), retrieveFirstPost);
}
firstPost();
