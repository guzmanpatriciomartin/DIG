const api_url_house = "https://api.propublica.org/congress/v1/113/house/members.json"
const api_url_senate = "https://api.propublica.org/congress/v1/113/senate/members.json"
const h = {
    type: 'GET',
    datatype: 'json',
    headers: {
        'X-API-Key': 'Q9Eib0KXN0vBcLDpac5VsFUgs1SjUZfpRHg987ft',
    }
}
var json = []
var app
var app2
var app3
var app4
var loading
async function prueba(url) {
    const datos = await fetch(url, h).then(response => response.json())
    return datos.results[0].members
}
async function onloadfunction(api_url) {
    app = new Vue({
        el: "#app",
        data: {            users: []
        },
    })
    await prueba(api_url).then(data => {
        json = data
        app.users = data
    })
    stateSelector();
}
function change() {
    var logueable = document.getElementById("readmore").innerHTML;
    if (logueable == "Read more") {
        document.getElementById("readmore").innerHTML = "Read less";
    }
    else {
        document.getElementById("readmore").innerHTML = "Read more"
    }

}
function tableglanceDisplay(apipura) {
    app2.numOfDemocrats = nDemocrats(apipura)
    app2.votes_whit_party_pct_democrats = nDemocratspct(apipura)
    app2.numOfRepublicans = nRepublicans(apipura)
    app2.votes_whit_party_pct_republicans = nRepublicanspct(apipura)
    app2.numOfindependents = nIndependents(apipura)
    app2.votes_with_party_pct_independents = nIndependentspct(apipura)
    app2.total = nDemocrats(apipura) + nRepublicans(apipura) + nIndependents(apipura);
    if (nIndependents(apipura) == 0) {
        app2.totalpct = ((nDemocratspct(apipura) + nRepublicanspct(apipura)) / 2).toFixed(2)
    }
    else {
        app2.totalpct = ((nDemocratspct(apipura) + nRepublicanspct(apipura) + nIndependentspct(apipura)) / 3).toFixed(2)
    }
    document.getElementById("glancel").style.display = "none"
    document.getElementById("glance").style = ""
}
function stateSelector() {
    var states = []
    json.forEach(state => {
        states.push(state.state)
    })
    const statesArr = new Set(states);

    states = [...statesArr];
    for (var i = 0; i < states.length; i++) {
        var option;
        option = `<option value="${states[i]}">${states[i]}</option>`;
        document.getElementById("inputGroupSelect03").innerHTML += option;
    };
}
function tabletbody(tnpc, idselect, tnpc2, idselect2) {
    app3 = new Vue({
        el: `#${idselect}`,
        data: {
            tnpc: []
        },
    })
    app4 = new Vue({
        el: `#${idselect2}`,
        data: {
            tnpc: []
        },
    })
    app3.tnpc = tnpc
    app4.tnpc = tnpc2
    loading = document.querySelectorAll(`.loading`)
    console.log('0');
    for (var clases of loading) {
        console.log('1');
        clases.style.display = 'none';

    }
    document.getElementById(`tbody`).style = ""
    document.getElementById(`tbody2`).style = ""

}
async function launcher(api_url) {
    document.getElementById("glance").style.display = "none"
    document.getElementById(`tbody`).style.display = "none"
    document.getElementById(`tbody2`).style.display = "none"

    app2 = new Vue({
        el: "#glance",
        data: {
            numOfDemocrats: [],
            votes_whit_party_pct_democrats: [],
            numOfRepublicans: [],
            votes_whit_party_pct_republicans: [],
            numOfindependents: [],
            votes_with_party_pct_independents: [],
            total: [],
            totalpct: [],
        },
    })
    await prueba(api_url).then(data => {
        json = data

    })
    var jsonf = json.filter(num => num.total_votes != 0)
    tableglanceDisplay(json)
    tabletbody(tenpercentvoteswhitpartyd(jsonf, 1), "tbody", tenpercentvoteswhitpartyd(jsonf, 2), "tbody2")
}
async function launcher2(api_url) {
    document.getElementById("glance").style.display = "none"
    document.getElementById(`tbody`).style.display = "none"
    document.getElementById(`tbody2`).style.display = "none"

    app2 = new Vue({
        el: "#glance",
        data: {
            numOfDemocrats: [],
            votes_whit_party_pct_democrats: [],
            numOfRepublicans: [],
            votes_whit_party_pct_republicans: [],
            numOfindependents: [],
            votes_with_party_pct_independents: [],
            total: [],
            totalpct: [],
        },
    })
    await prueba(api_url).then(data => {
        json = data

    })
    var jsonf = json.filter(num => num.total_votes != 0)
    tableglanceDisplay(json)
    tabletbody(tenpercentvoteswhitpartyd(jsonf, 4), "tbody", tenpercentvoteswhitpartyd(jsonf, 3), "tbody2")
}
function filtros() {
    var r = document.getElementById("r").checked;
    var d = document.getElementById("d").checked;
    var id = document.getElementById("id").checked;
    var verdadero = r && d && id;
    var falso = r || d || id;
    falso = !falso
    if (verdadero == true) {

        aplifilter2(json);
    }
    else if (falso == true) {

        aplifilter2(json);
    }
    else {
        checked();

    }
    function aplifilter2(json2) {
        var statev = document.getElementById("inputGroupSelect03").value; //guardo un valor ddel html
        var statefilt = [] //creo un arreglo
        if (statev === "ALL") { //le pregunto si el valor que guarde en linea 37 (adentro de statev)
            json2.forEach(statefilter => { //recorro el Json
                statefilt.push(statefilter);
            })
        } else { //sino
            json2.forEach(statefilter => { //recorro el Json
                if (statefilter.state === statev) { //le pregunto si el  "state": "NC", es igual que el valor de linea 37 (statev)
                    statefilt.push(statefilter); //si es igual, lo pusheo adentro del arreglo que cree en linea 43
                }
            })
        } app.users = statefilt
    }
    function checked() {
        var congressfilt = []
        if (r == true) {
            json.forEach(partyfilter => {
                if (partyfilter.party === "R") {
                    congressfilt.push(partyfilter);
                }
            })
        }
        if (d == true) {
            json.forEach(partyfilter => {
                if (partyfilter.party === "D") {
                    congressfilt.push(partyfilter);
                }
            })
        }
        if (id == true) {
            json.forEach(partyfilter => {
                if (partyfilter.party === "ID") {
                    congressfilt.push(partyfilter);
                }
            })
        }
        aplifilter2(congressfilt)
    }
}
function nDemocrats(json) {
    var democratsArray = [];
    json.forEach(obj => {
        if (obj.party === "D") {
            democratsArray.push(obj);
        }
    })
    return democratsArray.length
}
function nDemocratspct(json) {
    var democratspctArray = 0
    json.forEach(obj => {
        if (obj.party === "D") {
            democratspctArray += obj.votes_with_party_pct;
        }
    })
    let pct_votes = Number((democratspctArray / nDemocrats(json)).toFixed(2))
    return pct_votes
}
function nRepublicanspct(json) {
    var republicanspctArray = 0
    json.forEach(obj => {
        if (obj.party === "R") {
            republicanspctArray += obj.votes_with_party_pct;
        }
    })
    let pct_votes = Number((republicanspctArray / nRepublicans(json)).toFixed(2))
    return pct_votes
}
function nIndependentspct(json) {
    var independentspctArray = 0
    json.forEach(obj => {
        if (obj.party === "ID") {
            independentspctArray += obj.votes_with_party_pct;
        }
    })
    let pct_votes = Number((independentspctArray / nIndependents(json)).toFixed(2))
    return pct_votes
}
function nRepublicans(json) {
    var republicansArray = [];
    json.forEach(obj => {
        if (obj.party === "R") {
            republicansArray.push(obj);
        }
    })
    return republicansArray.length
}
function nIndependents(json) {
    var independentsArray = [];
    json.forEach(obj => {
        if (obj.party === "ID") {
            independentsArray.push(obj);
        }
    })
    return independentsArray.length
}
function tenpercentvoteswhitpartyd(variable, program) {
    let ntpc = (variable.length) / 100 * 10
    if (program == 1) {
        var tenptc = variable.sort(((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)).slice(0, ntpc)
    }
    if (program == 2) {
        var tenptc = variable.sort(((a, b) => b.votes_with_party_pct - a.votes_with_party_pct)).slice(0, ntpc)
    }
    if (program == 3) {
        var tenptc = variable.sort(((a, b) => a.missed_votes_pct - b.missed_votes_pct)).slice(0, ntpc)
    }
    if (program == 4) {
        var tenptc = variable.sort(((a, b) => b.missed_votes_pct - a.missed_votes_pct)).slice(0, ntpc)
    }
    return tenptc
}


