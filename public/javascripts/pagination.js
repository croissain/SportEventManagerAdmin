
const pathname = location.pathname;
let urlParams = new URLSearchParams(location.search);
console.log(urlParams.toString());

$(document).ready(function() {

    $('#pagination li').addClass('page-item');
    $('#pagination li a').addClass('page-link');


    const currentPage = urlParams.get("page") || 1;
    console.log("currentPage: ",currentPage);

    $('#pagination li a').each((index, item) => {
        let itemPage = $(item).attr('href').split('=')[1];
        console.log("$(item).attr('href'): ",$(item).attr('href'));
        console.log("$(item).html: ",$(item).html());
        console.log("itemPage: ",itemPage);
        urlParams.set("page",itemPage);

        const itemHref = pathname + '?' + urlParams.toString();
        $(item).attr('href',itemHref);
    })

    urlParams.set("page",currentPage);
});