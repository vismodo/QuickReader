let currentyOpenedTab = "recent"
function getKeyByValue(object, targetValue) {
  for (const key in object) {
    if (object[key] == targetValue) {
      return key;
    }
  }
  // If the target value is not found, you can return a default value or null.
  return null;
}

function extractDomain(url) {
  let domain;
  // Find and remove the protocol (e.g., "https://" or "http://")
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }

  // Find and remove the port number (if any)
  domain = domain.split(':')[0];

  // Handle www subdomain (if present)
  if (domain.indexOf("www.") === 0) {
    domain = domain.substr(4);
  }

  return domain;
}
const reading_list = document.getElementsByClassName("list")[0]
function update(grp){
  reading_list.innerHTML = "<span></span>"
  chrome.storage.sync.get(["list"]).then((result) => {
    let li = result.list;
    for (let i=0; i<li.length;i++){
      const p = li[i];
      if (p.group == grp || grp == 'none'){
      const list_item = document.createElement("div");
list_item.className = "list_item";
list_item.innerHTML = `<span class="list_favicon">
<img src=""></span>
<div class="title">Here is some very long text that ends but after a very very very long time because it is supposed to check the ability of my css to cancel out the excess. 
</div>
<svg class="groupColor" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <!-- Circle with white border and red fill -->
    <circle cx="9" cy="9" r="9" fill="#8F00FF" />
  </svg>
<span class="webname">example.com</span>
<button class="deleteBtn">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg>
</button>`;
list_item.getElementsByClassName("title")[0].innerHTML = p.title
list_item.getElementsByClassName("list_favicon")[0].firstElementChild.src = p.favUrl;
list_item.getElementsByClassName("webname")[0].innerHTML = extractDomain(p.url);
const circle = list_item.getElementsByClassName("groupColor")[0].firstElementChild;
switch (p.group){
case 'v':
  circle.setAttribute("fill", "#8F00FF");
  break;
case 'i':
  circle.setAttribute("fill", "indigo");
  break;
case 'b':
  circle.setAttribute("fill", "blue");
  break;
case 'g':
  circle.setAttribute("fill", "green");
  break;
case 'y':
  circle.setAttribute("fill", "yellow");
  break;
case 'o':
  circle.setAttribute("fill", "orange");
  break;
case 'r':
  circle.setAttribute("fill", "red");
  break;
case 'bl':
  circle.setAttribute("fill", "black");
  break;
default:
  circle.setAttribute("fill", "#8F00FF");
}
const br = document.createElement("br")
reading_list.appendChild(br);
list_item.getElementsByClassName("deleteBtn")[0].addEventListener("click",(event)=>{
  event.stopPropagation();
li.splice(li.indexOf(p), 1);
chrome.storage.sync.set({"list": li});
reading_list.removeChild(list_item);
reading_list.removeChild(br);
})
list_item.addEventListener("click", ()=>{
  chrome.tabs.create({ url: p.url });
})
reading_list.appendChild(list_item);

    }}

  })
}

window.addEventListener('load', ()=>{ 
    chrome.storage.sync.get(["colors"]).then((result) => {
        document.getElementById("violet_name").innerHTML = result.colors["violet"];
        document.getElementById("indigo_name").innerHTML = result.colors["indigo"];
        document.getElementById("blue_name").innerHTML = result.colors["blue"];
        document.getElementById("green_name").innerHTML = result.colors["green"];
        document.getElementById("yellow_name").innerHTML = result.colors["yellow"];
        document.getElementById("orange_name").innerHTML = result.colors["orange"];
        document.getElementById("red_name").innerHTML = result.colors["red"];
        document.getElementById("black_name").innerHTML = result.colors["black"];
        document.getElementById('v').innerHTML = result.colors["violet"];
        document.getElementById('i').innerHTML = result.colors["indigo"];
        document.getElementById('b').innerHTML = result.colors["blue"];
        document.getElementById('g').innerHTML = result.colors["green"];
        document.getElementById('y').innerHTML = result.colors["yellow"];
        document.getElementById('o').innerHTML = result.colors["orange"];
        document.getElementById('r').innerHTML = result.colors["red"];
        document.getElementById('bl').innerHTML = result.colors["black"];
        update('none')
      });

const tabs =  Array.prototype.slice.call(document.getElementsByClassName("sidebarItem"));
tabs.pop()
tabs.forEach(element => {
    element.addEventListener('click', ()=>{
        tabs.forEach(el2=>{
            el2.className = "sidebarItem"
        })
        element.className= "sidebarItem active"
        const b = element.getElementsByClassName("tooltiptext")[0].innerHTML;
        let q = b[0].toLowerCase();
        if (element.getElementsByClassName("tooltiptext")[0].id == "black_name") {
          q = 'bl'
        }
        if (element.getElementsByClassName("tooltiptext")[0].innerHTML == "Recently Added") {
          q = 'none'
        }
        currentyOpenedTab=b.toLowerCase()
        update(q);
        document.getElementById("currentTabName").innerHTML = b + `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" style="margin-left:20px; cursor:pointer" viewBox="0 0 16 16">
        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
      </svg>`;
        if (b == "Recently Added"){
          document.getElementById("currentTabName").innerHTML = b
        }
    })
});
var modal = document.getElementById("newModal");

// Get the button that opens the modal
var addBtn = document.getElementById("addBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
addBtn.onclick = function() {
  const pagename = document.getElementById("pagename")
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    pagename.value = currentTab.title;
  });
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById("addBtnModal").addEventListener('click',()=>{
  modal.style.display = "none";
let pageUrl, favUrl;
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const currentTab = tabs[0];
  favUrl = currentTab.favIconUrl
  pageUrl=currentTab.url; 
});
tabs.forEach(element => {
  element.className="sidebarItem"
})
switch (document.getElementById("group_select").value){
  case 'v':
    document.getElementById('violetBtn').className = "sidebarItem active"
    document.getElementById("currentTabName").innerHTML = document.getElementById("violet_name").innerHTML + `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" style="margin-left:20px; cursor:pointer" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
  </svg>`
    break;
  case 'i':
    document.getElementById('indigoBtn').className = "sidebarItem active"
    document.getElementById("currentTabName").innerHTML = document.getElementById("indigo_name").innerHTML + `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" style="margin-left:20px; cursor:pointer" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
  </svg>`
    break;
  case 'b':
    document.getElementById('blueBtn').className = "sidebarItem active"
    document.getElementById("currentTabName").innerHTML = document.getElementById("blue_name").innerHTML + `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" style="margin-left:20px; cursor:pointer" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
  </svg>`
    break;
  case 'g':
    document.getElementById('greenBtn').className = "sidebarItem active"
    document.getElementById("currentTabName").innerHTML = document.getElementById("green_name").innerHTML + `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" style="margin-left:20px; cursor:pointer" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
  </svg>`
    break;
  case 'y':
    document.getElementById('yellowBtn').className = "sidebarItem active"
    document.getElementById("currentTabName").innerHTML = document.getElementById("yellow_name").innerHTML + `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" style="margin-left:20px; cursor:pointer" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
  </svg>`
    break;
  case 'o':
    document.getElementById('orangeBtn').className = "sidebarItem active"
    document.getElementById("currentTabName").innerHTML = document.getElementById("orange_name").innerHTML + `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" style="margin-left:20px; cursor:pointer" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
  </svg>`
    break;
  case 'r':
    document.getElementById('redBtn').className = "sidebarItem active"
    document.getElementById("currentTabName").innerHTML = document.getElementById("red_name").innerHTML + `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" style="margin-left:20px; cursor:pointer" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
  </svg>`
    break;
  case 'bl':
    document.getElementById('blackBtn').className = "sidebarItem active"
    document.getElementById("currentTabName").innerHTML = document.getElementById("black_name").innerHTML + `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" style="margin-left:20px; cursor:pointer" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
  </svg>`
    break;
  default:
    document.getElementById('recentBtn').className = "sidebarItem active"
    document.getElementById("currentTabName").innerHTML = "Recently Added"
}

chrome.storage.sync.get(["list"]).then((result) => {
  let li = result.list
  li.unshift({
    title: document.getElementById('pagename').value,
    url: pageUrl,
    favUrl: favUrl,
    group: document.getElementById("group_select").value
  })
  chrome.storage.sync.set({"list": li}, ()=>{update(document.getElementById("group_select").value)});
});

})

document.getElementById("currentTabName").addEventListener("click", ()=>{
  if (! document.getElementById("currentTabName").innerHTML.startsWith("Recently Added")){
  const newName = prompt("Change the name of this tab")
  if (newName != null && newName != ''){
    chrome.storage.sync.get(["colors"]).then((result) => {
      let clrs = result.colors
      clrs[getKeyByValue(clrs, currentyOpenedTab)] = newName
      chrome.storage.sync.set({"colors": clrs})
    })
    document.getElementById("currentTabName").innerHTML = newName+ `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" style="margin-left:20px; cursor:pointer" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/></svg>`
  }}
})

});