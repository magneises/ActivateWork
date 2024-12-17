// ALAB 316-1-1 DOM Manipulation (Part One)
// import "./style.";
// Like to Part 1 Code on GitHub (Team Code): https://github.com/nortonjulian/Dom-Manip

// Menu data structure
var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];

// Part 1: Getting Started - Step One
const mainEl = document.querySelector('main');

// Part 1: Getting Started - Step Two
mainEl.style.backgroundColor = 'var(--main-bg)';

// Part 1: Getting Started - Step Three
mainEl.innerHTML = `<h1>DOM Manipulation</h1>`;

// Part 1: Getting Started - Step Four
mainEl.classList.add("flex-ctr");


// Part 2: Creating a Menu Bar
// Part 2: Creating a Menu Bar - Step One
const topMenuEl = document.querySelector("#top-menu");

// Part 2: Creating a Menu Bar - Step Two
topMenuEl.style.height = "100%";

// Part 2: Creating a Menu Bar - Step Three
topMenuEl.style.backgroundColor = `var(--top-menu-bg)`;

//Part 2: Creating a Menu Bar - Step Four
topMenuEl.classList.add(`flex-around`);


// Part 3: Adding Menu Buttons
// Part 3: Adding Menu Buttons - Step One Through 5
for (let i = 0; i < menuLinks.length; i++) {
    const link = menuLinks[i]
    const menuItem = document.createElement('a');
    menuItem.href = link.href;
    menuItem.textContent = link.text;
    topMenuEl.appendChild(menuItem);
}

// Part 4: Adding Interactivity
// Review what you've accomplished so far and get ready for Part Two of this activity. 


// ALAB 316-3-1 DOM Manipulation (Part Two)
// Part 3: Creating the Submenu
// Part 3: Creating the Submenu - Step One
const subMenuEl = document.querySelector("#sub-menu");
// Part 3: Creating the Submenu - Step Two
subMenuEl.style.height = "100%";
// Part 3: Creating the Submenu - Step Three
subMenuEl.style.backgroundColor = `var(--sub-menu-bg)`;
// Part 3: Creating the Submenu - Step Four
subMenuEl.classList.add(`flex-around`);
// Part 3: Creating the Submenu - Step Five
subMenuEl.style.position = "absolute";
// Part 3: Creating the Submenu - Step Six
subMenuEl.style.top = "0";

// Part 4: Adding Menu Interaction 
// Part 4: Adding Menu Interaction - Step One
const topMenuLinks = topMenuEl.querySelectorAll("a");
// Part 4: Adding Menu Interaction - Step Two
topMenuEl.addEventListener("click", function(event) {
    event.preventDefault();

    const clickedEl = event.target;
    
    if (clickedEl.tagName !== "A") return;
    console.log(clickedEl.textContent);

    if (clickedEl.classList.contains('active')) {
        clickedEl.classList.remove('active');
        subMenuEl.style.display = 'none'; 
      } else { 
        topMenuLinks.forEach(link => link.classList.remove('active'));
        clickedEl.classList.add('active');
        const clickedLink = menuLinks.find(link => link.text === clickedEl.textContent);
    
    if (clickedLink && clickedLink.subLinks) {
        buildSubmenu(clickedLink.subLinks);
        subMenuEl.style.display = 'block';
        } else {
        subMenuEl.style.display = 'none'; 
        }
    }    
});

// Part 5: Adding Submenu Interaction 
// Part 5: Adding Submenu Interaction - Step One
topMenuEl.addEventListener("click", function(event) {
    event.preventDefault();

    const clickedEl = event.target;

    if (clickedEl.tagName !== "A") return;

    if (clickedEl.classList.contains('active')) {
        clickedEl.classList.remove('active');
        subMenuEl.style.top = '0';
        return;
    }

    topMenuLinks.forEach(link => link.classList.remove('active'));
    clickedEl.classList.add('active');

    const clickedLink = menuLinks.find(link => link.text === clickedEl.textContent);

    if (clickedLink && clickedLink.subLinks) {
        subMenuEl.style.top = '100%';
    } else {
        subMenuEl.style.top = '0';
    }
});

// Part 5: Adding Submenu Interaction - Step Two
topMenuEl.addEventListener("click", function(event) {
    event.preventDefault();

    const clickedEl = event.target;

    if (clickedEl.tagName !== "A") return;
    
    if (clickedEl.classList.contains('active')) {
        clickedEl.classList.remove('active');
        subMenuEl.style.top = '0';
        return;
    }

    topMenuLinks.forEach(link => link.classList.remove('active'));
    clickedEl.classList.add('active');

    const clickedLink = menuLinks.find(link => link.text === clickedEl.textContent);

    if (clickedLink && clickedLink.subLinks) {
        buildSubmenu(clickedLink.subLinks);
        subMenuEl.style.top = '100%';
    } else {
        subMenuEl.style.top = '0';
    }
});

// Part 5: Adding Submenu Interaction - Part Two Step One
function buildSubmenu(subLinks) {
    subMenuEl.innerHTML = "";
    subLinks.forEach(link => {
        const subMenuItem = document.createElement('a');
        subMenuItem.href = link.href;
        subMenuItem.textContent = link.text;
        subMenuEl.appendChild(subMenuItem);
    });
}

// Part 5: Adding Submenu Interaction - Part Three Step One
subMenuEl.addEventListener("click", function(event) {
    event.preventDefault();

    const clickedEl = event.target;

    if (clickedEl.tagName !== "A") return;
    console.log(clickedEl.textContent); 
    // Part 5: Adding Submenu Interaction - Part Three Step Two
    subMenuEl.style.top = '0';
    // Part 5: Adding Submenu Interaction - Part Three Step Three
    topMenuLinks.forEach(link => link.classList.remove('active'));
    // Part 5: Adding Submenu Interaction - Part Three Step Four
    mainEl.innerHTML = `<h1>${clickedEl.textContent}</h1>`;
    // Part 5: Adding Submenu Interaction - Part Three Step Five
    if (clickedEl.textContent === "ABOUT") {
        mainEl.innerHTML = "<h1>About</h1>";
    }
});