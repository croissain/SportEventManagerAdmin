
const adminSidebarCollapse = document.querySelector("#adminSidebarCollapse");
const adminSidebar = document.querySelector("#adminSidebar");

adminSidebarCollapse.onclick = function(){
    console.log("sang");
    adminWrapper.classList.toggle('admin-sidebar--hide');
}


