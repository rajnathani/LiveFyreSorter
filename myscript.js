
						   
document.getElementById('what').onclick = function() {
chrome.tabs.executeScript(null, {file: "content.js"});
}


