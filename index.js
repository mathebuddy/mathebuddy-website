let navLinks = [
    'Home',
    'Blog',
    'Editor',
    'Docs',
];
let htmlNavbar = '';
for (const link of navLinks) {
    htmlNavbar += `<li class="nav-item">
                <a
                    id="nav-link-$$$"
                    class="nav-link"
                    aria-current="page"
                    onclick="show('$$$');document.getElementById('navbar-toggler').click();"
                    style="cursor: pointer"
                    >$$$</a
                >
            </li>`.replaceAll('$$$', link);
}
htmlNavbar += `<li class="nav-item">
    <a
        class="nav-link"
        aria-current="page"
        href="https://github.com/mathebuddy"
        target="_blank"
        style="cursor: pointer"
        ><i class="fa-brands fa-github"></i></a
    >
</li>`;

document.getElementById('navbar-items').innerHTML = htmlNavbar;
document.getElementById('nav-link-Home').classList.add('active');

function show(str) {
    if (str === 'Docs') {
        window.open('docs/build/index.html', '_blank').focus();
    } else {
        for (const link of navLinks) {
            if (link == str) {
                document
                    .getElementById('nav-link-' + link)
                    .classList.add('active');
            } else {
                document
                    .getElementById('nav-link-' + link)
                    .classList.remove('active');
            }
            if (link !== 'Docs')
                document.getElementById(link).style.display =
                    link === str ? 'block' : 'none';
        }
    }
}

function generateBlog() {
    axios.get("blog/list.txt").then(function (response) {
        let lines = response.data.split('\n');
        const filenames = [];
        let html = '';
        for (const line of lines) {
            const data = line.trim();
            if (data.length == 0) continue;
            const tokens = data.split('#');
            let filename = tokens[0];
            let image = ''
            if (tokens.length > 1) image = tokens[1];
            filenames.push(filename);
            html += '<div id="blog_' + filename + '"></div>';
            html += '<div class="row text-center">';
            html += '    <div class="col text-center">';
            html += '        <img class="img-fluid mx-auto d-block shadow p-3" src="' + image + '"/>';
            html += '    </div>';
            html += '</div>';
        }
        document.getElementById('blog-content').innerHTML = html;
        for (const filename of filenames) {
            axios.get("blog/" + filename).then(function (response) {
                let html = '<br/>';
                html += new showdown.Converter().makeHtml(response.data);
                document.getElementById('blog_' + filename).innerHTML = html;
            });
        }
    });
}

generateBlog();
