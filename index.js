// 2022 by Andreas Schwenk contact@arts-and-sciences.com
// GPLv3

// get current page by URL parameter "page"
let urlParameters = new URLSearchParams(window.location.search);
let page = urlParameters.get('page');
if (page == null) page = 'home';

/**
 * Run
 * @param {*} navLinks Array of strings. Each string has the following form:
 *    "LINK_ID # LINK_TEXT # LINK"
 *    For internal links use the dot "." as link (without quotes)
 */
function runSite(navLinks) {

    // ===== add navbar items =====
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
            if (element != null) {
                document.getElementById(id).style.display =
                    id === page ? 'block' : 'none';
            }
        } else
            target = '_blank';
        htmlNavbar += '<li class="nav-item">';
        htmlNavbar += '    <a ';
        htmlNavbar += '        id="nav-link-' + id + '"';
        htmlNavbar += '        class="nav-link' + active + '"';
        htmlNavbar += '        aria-current="page"';
        htmlNavbar += '        href="' + href + '"';
        htmlNavbar += '        target="' + target + '"';
        htmlNavbar += '        style="cursor: pointer"';
        htmlNavbar += '>' + name + '</a></li>';
    }
    document.getElementById('navbar-items').innerHTML = htmlNavbar;

    // ===== build blog from files from subdirectory blog/ =====
    if (page === 'blog') {
        if (document.getElementById('blog-content') == null) {
            console.log('HTML has no "blog-content" element');
            return;
        }
        axios.get("blog/list.txt?time=" + Date().now()).then(function (response) {
            let lines = response.data.split('\n');
            const filenames = [];
            let html = '';
            for (const line of lines) {
                const data = line.trim();
                if (data.length == 0) continue;
                const tokens = data.split('#');
                let filename = tokens[0].trim();
                let image = ''
                if (tokens.length > 1) image = tokens[1].trim();
                filenames.push(filename);
                html += '<br/>';
                html += '<div class="shadow p-3">';
                html += '    <div id="blog_' + filename + '" class="lead">';
                html += '    </div>';
                if (image.length > 0) {
                    html += '<div class="row text-center">';
                    html += '    <div class="col text-center">';
                    html += '        <img class="img-fluid mx-auto d-block" src="' + image + '" style="border-radius: 0px;"/>';
                    html += '    </div>';
                    html += '</div>';
                }
                html += '</div>';
                html += '<br/>';
            }
            document.getElementById('blog-content').innerHTML = html;
            for (const filename of filenames) {
                axios.get("blog/" + filename).then(function (response) {
                    let html = '';
                    html += new showdown.Converter().makeHtml(response.data);
                    document.getElementById('blog_' + filename).innerHTML = html;
                });
            }
        });
    }

}
