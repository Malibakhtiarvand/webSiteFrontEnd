const HeaderElement = '<a href="">home</a><a href="">about</a><a href="">Services</a><a href="">Blog</a><a href="">Events</a><a href="">Contact Us</a><a href=""></a>'

var HeaderE = document.querySelector('.Header')

setInterval(() => {
    if (window.innerWidth > 992) {
        HeaderE.innerHTML = HeaderElement
    } else if (window.innerWidth <= 992) {
        while (HeaderE.children.length != 0) {
            HeaderE.removeChild(HeaderE.firstChild)
        }

        if (HeaderE.children.length == 0) {
            var HeaderChild = document.createElement('button')
            HeaderChild.classList.add('fa')
            HeaderChild.classList.add('fa-bars')
            HeaderChild.classList.add('btn')
            HeaderChild.classList.add('btn-dark')
            HeaderChild.classList.add('HeaderBars')
            HeaderE.appendChild(HeaderChild)
        }

    }
}
);

