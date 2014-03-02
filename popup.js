// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

document.addEventListener('DOMContentLoaded', function () {
  var list = document.getElementById('list'),
      lists = list.getElementsByTagName('li'),
      pops = ['triangle.html', 'rgba.html', 'rgb.html'];

for(var i = 0, len = lists.length; i < len; i++){
    lists[i].index = i;
    lists[i].onclick = function(){
        var self = this;
        chrome.tabs.getSelected(function tab(t){
            chrome.tabs.create({index: t.index, url: pops[self.index]});
        });
    }
}
});


