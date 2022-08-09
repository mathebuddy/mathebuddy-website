let urlParameters = new URLSearchParams(window.location.search);
let page = urlParameters.get('page');
if (page == null) page = 'home';

let navLinks = [ // id, rendered name, href
    'home # Home # .',
    'blog # Blog # .',
    //'editor # Editor # .',
    'docs # Docs # docs/build/index.html',
    'github # <i class="fa-brands fa-github"></i> # https://github.com/mathebuddy'
];

let htmlNavbar = '';
for (const link of navLinks) {
    const tokens = link.split('#');
    const id = tokens[0].trim();
    const name = tokens[1].trim();
    const active = id === page ? ' active' : '';
    let href = tokens[2].trim();
    let target = '_self';
    if (href === '.') {
        href = 'index.html?page=' + id;
        const element = document.getElementById(id);
        if (element != null)
            document.getElementById(id).style.display =
                id === page ? 'block' : 'none';
    } else {
        target = '_blank';
    }

    htmlNavbar += `<li class="nav-item">
    <a
        id="nav-link-`+ id + `"
        class="nav-link` + active + `"
        aria-current="page"
        href="`+ href + `"
        target="`+ target + `"
        style="cursor: pointer"
        >`+ name + `</a></li>`;
}

document.getElementById('navbar-items').innerHTML = htmlNavbar;

if (page === 'blog') {
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
