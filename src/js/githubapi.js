

let dataview = $('#dataview');
function getData(gitHubUser) {
    let rezultat = new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            // url: `https://api.github.com/users/${gitHubUser}/repos`,
            url: `https://api.github.com/users/${gitHubUser}/repos?per_page=6&page=1&sort=updated`,
            // headers: { "Access-Control-Allow-Origin": "*" },
            dataType: 'json',
            contentType: 'application/json',

        }).done(function (data) {
            if (data.length > 0) {
                resolve(data);
            }
            else {
                reject('Error, nu s-au primit date!');
            }

        }).fail(function (status, errorThrown) {
            reject('Error: a aparut o eroare ' + JSON.stringify(status) + JSON.stringify(errorThrown))

        }).always(function () {
            console.log('Cererea a fost tratata complet.')
        });
    });
    return rezultat;
}

function showData(repos) {
    //const posts = JSON.parse(data);
    let allRepo = '';
    repos.forEach(item => {
        allRepo += `
        <div class="col-md-4">
                <div class="service-box">
                    <div class="service-ico">
                        <a href='${item.html_url}' target='_blank'>
                            <img style="max-width:300px" src ="https://raw.githubusercontent.com/${item.owner.login}/${item.name}/${item.default_branch}/banner.png">
                        </a>
                    </div>
                    <div class="service-content">
                        <h2 class="s-title"><a href='${item.html_url}' target='_blank'>${item.name}</a></h2>
                        <p class="s-description text-center">
                        ${item.description}
                        </p>
                        <span> Date: ${item.updated_at}</span> <br>
                        <span> Programming Language: ${item.language}</span> 
                    </div>
                </div>
            </div>`
    });
    dataview.append(allRepo);
};

$(function () {
    console.log("ready!");
    getData('mihaelaraducu').then((myRepos) => {
        showData(myRepos);
        console.log('succes ', myRepos);
    }).catch((err) => {
        console.log('Promisiune nu s-a realizat', err);
    })
});