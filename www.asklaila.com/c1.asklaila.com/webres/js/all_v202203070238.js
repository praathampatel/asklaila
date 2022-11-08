function blockerLCFModalHide() {
    YblockerLCFModalDialog.cancel();
    var a = document.getElementById("blockerLCFModalDlg_c");
    if (a) {
        a.style.display = "none"
    }
    var b = "";
    if (document.getElementById("businessReqCategory")) {
        b = document.getElementById("businessReqCategory").value
    }
    var c = "";
    if (document.getElementById("businessReqCategoryName")) {
        c = document.getElementById("businessReqCategoryName").value
    }
    ga("send", "event", "ROADBLOCK_SRP_LCF", "Cancel", c + "|" + b + "|")
}
var xhr = null;
var uncheckClicked = false;
var firstTimeUnchecker = true;
var numExamples = 15;
var selected = Math.floor(Math.random() * numExamples);
var acSelected = false;
var gpsLocation = null;
var isClicked = false;
var loc9 = null;

function escapeRegExp(a) {
    return a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
}

function replaceAll(c, b, a) {
    return c.replace(new RegExp(escapeRegExp(b), "g"), a)
}

function slugifyCity(a) {
    if (a != null && a.indexOf("-") == -1) {
        a = a.replace(/\s+/g, "-")
    }
    return a
}

function slugify(a) {
    if (a != null) {
        a = a.toString().toLowerCase().replace(/'/g, "").replace(/\s+/g, "-").replace(/[^\w\-]+/g, "-").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "").replace(/^$/, "-")
    } else {
        a = "-"
    }
    return a
}

function searchNew() {
    var h = "";
    var f = document.getElementById("whatType").value;
    var c = document.searchForm.city.value;
    var d = document.searchForm.where.value.trim();
    var k = document.searchForm.what.value.trim();
    var e = document.getElementById("autoCompleteTypeSpecs").value;
    if (k.length == 0 || k == "" || k.indexOf("Listings, Movies and Events") != -1 || k.indexOf("Business Listings") != -1 || k == "-") {
        return false
    }
    if ((d == "") || (d.indexOf("e.g.") != -1)) {
        d = "-"
    }
    if (f == "keyword" || f == "generic") {
        h = getContextURL() + "search/" + slugifyCity(c) + "/" + slugify(d) + "/" + slugify(k) + "/";
        if (d == "-" && gpsLocation != null && gpsLocation.trim() != "") {
            h += "?gpsLocation=" + gpsLocation
        } else {
            var a = "";
            setSldCookie("ld", "false", a)
        }
        window.location.href = h;
        return false
    } else {
        if (f == "listing") {
            var b = document.getElementById("randomIdField").value;
            var d = document.getElementById("listingLocalityField").value;
            h = getContextURL() + "listing/" + slugifyCity(c) + "/" + slugify(d) + "/" + slugify(k) + "/" + b + "/";
            setCookie("whatLDPTitle", k, 15);
            window.location.href = h;
            return false
        } else {
            if (f == "movie" || f == "event") {
                var g = document.getElementById("movieIdField").value;
                h = getContextURL() + "movie/" + slugifyCity(c) + "/" + slugify(k) + "/" + g + "/";
                setCookie("whatMovieTitle", k, 15);
                window.location.href = h;
                return false
            }
        }
    }
}

function trimTextArea(a) {
    if (a.value.trim() == "Be the first to comment!") {
        a.value = ""
    }
}

function changeImage(a) {
    var b = document.getElementById("kaptchaImage");
    if (b != null) {
        b.src = a + Math.floor(Math.random() * 100)
    }
}

function searchDefaultPage() {
    alert("Please select a city")
}

function emailCheck(f) {
    var a = "@";
    var b = ".";
    var e = f.indexOf(a);
    var c = f.length;
    var d = f.indexOf(b);
    if (f.indexOf(a) == -1) {
        alert("Invalid E-mail ID");
        return false
    }
    if (f.indexOf(a) == -1 || f.indexOf(a) == 0 || f.indexOf(a) == c) {
        alert("Invalid E-mail ID");
        return false
    }
    if (f.indexOf(b) == -1 || f.indexOf(b) == 0 || f.indexOf(b) == c) {
        alert("Invalid E-mail ID");
        return false
    }
    if (f.indexOf(a, (e + 1)) != -1) {
        alert("Invalid E-mail ID");
        return false
    }
    if (f.substring(e - 1, e) == b || f.substring(e + 1, e + 2) == b) {
        alert("Invalid E-mail ID");
        return false
    }
    if (f.indexOf(b, (e + 2)) == -1) {
        alert("Invalid E-mail ID");
        return false
    }
    if (f.indexOf(" ") != -1) {
        alert("Invalid E-mail ID");
        return false
    }
    return true
}

function getFFGeoLocation() {
    try {
        var a = navigator.userAgent;
        if (document.searchForm && (/Firefox\/3\.[5-9]/.test(a) || /Firefox\/[4-9]/.test(a)) && (gpsLocation == null || gpsLocation.trim() == "")) {
            navigator.geolocation.getCurrentPosition(searchWithBrowserLocationData)
        }
    } catch (b) {}
}

function displayFFAutoLocationChkBox() {
    var a = navigator.userAgent;
    if (document.searchForm && (/Firefox\/3\.[5-9]/.test(a) || /Firefox\/[4-9]/.test(a) || /Firefox\/[10-50]/.test(a)) && (gpsLocation == null || gpsLocation.trim() == "")) {
        document.getElementById("geo_loc_span").style.display = "inline";
        if (readCookieGen("ld") != null && readCookieGen("ld") == "true") {
            getFFGeoLocation()
        }
    }
}

function searchWithBrowserLocationData(c) {
    var d = c.coords.latitude + "," + c.coords.longitude;
    gpsLocation = d;
    var b = "";
    if (readCookieGen("lmsg") == null) {
        alert("Thank you for enabling Geolocation. You will not need to type your locality for your queries.");
        setSldCookie("lmsg", "true", b)
    }
    setSldCookie("ld", "true", b);
    var a = document.searchForm.where;
    if (a.value.trim() != "" && a.value.indexOf("e.g.") == -1) {
        a.value = ""
    }
}

function search(d) {
    var c = document.searchForm.what.value.trim();
    var b = document.searchForm.where.value.trim();
    var f = "";
    var e = document.searchForm.city.value;
    if ((b == "") || (b.indexOf("For Example") != -1)) {
        b = "-"
    }
    if (c == "" || c.indexOf("Listings, Movies and Events") != -1 || c.indexOf("Business Listings") != -1) {
        c = "-"
    }
    f = getContextURL() + "search/" + slugifyCity(e) + "/" + slugify(b) + "/" + slugify(c) + "/";
    var a = document.searchForm.locAutoDetectChkBox;
    if (a) {
        if (b == "-" && a.checked && gpsLocation != null && gpsLocation.trim() != "") {
            f += "?gpsLocation=" + gpsLocation
        }
    }
    window.location.href = f;
    return false
}

function searchByCategory(d, a, b) {
    a = filterNum(a.trim());
    d = filterNum(d);
    var e = document.searchForm.city.value;
    if (a == "") {
        a = "-"
    }
    if (d == "") {
        d = "-"
    }
    var c = getURLParam("skin");
    if (c == null || c == "") {
        c = "default"
    }
    var f = "";
    f = getContextURL() + "category/" + slugifyCity(e) + "/" + slugify(a) + "/" + slugify(d) + "/" + slugify(b) + "/";
    window.location.href = f
}

function proxyCheck(a, b) {
    if (document.searchForm.searchNearbyCheck == null) {
        return
    }
    if (b == "") {} else {
        if ((b == "false") && (firstTimeUnchecker == true)) {
            document.forms.searchForm.searchNearbyCheck.checked = false;
            uncheckClicked = true;
            firstTimeUnchecker = false;
            return
        }
    }
    if (isEmpty(a)) {
        document.forms.searchForm.searchNearbyCheck.disabled = true;
        document.forms.searchForm.searchNearbyCheck.checked = false
    } else {
        document.forms.searchForm.searchNearbyCheck.disabled = false;
        if (uncheckClicked == false) {
            document.forms.searchForm.searchNearbyCheck.checked = true
        }
    }
}

function getURLParam(e) {
    var d = "";
    var c = window.location.href;
    if (c.indexOf("?") > -1) {
        var b = c.substr(c.indexOf("?")).toLowerCase();
        var f = b.split("&");
        for (var a = 0; a < f.length; a++) {
            if (f[a].indexOf(e.toLowerCase() + "=") > -1) {
                var g = f[a].split("=");
                d = g[1];
                break
            }
        }
    }
    return unescape(d)
}

function filterNum(a) {
    re = /\$|~|`|\%|\*|\+|\;|\:|\^|\(|\)|\[|\]|\}|\{|\<|\>|\?|\||\\|\!|\/|\$/g;
    return a.replace(re, " ")
}

function isEmpty(a) {
    var b = /^\s{1,}$/g;
    if ((a.value.length == 0) || (a.value == null) || ((a.value.search(b)) > -1)) {
        return true
    } else {
        return false
    }
}

function ismaxlength(b) {
    var a = b.getAttribute ? parseInt(b.getAttribute("maxlength")) : "";
    if (b.getAttribute && b.value.length > a) {
        b.value = b.value.substring(0, a)
    }
}

function getDisplayType() {
    if (selected != undefined && document.getElementById("example_" + selected) != undefined) {
        document.getElementById("example_" + selected).style.display = ""
    }
}

function initASCheckedState() {}

function initDTAndAS() {
    getDisplayType();
    initASCheckedState()
}

function findMouseOver(a) {
    a.className = "hvr"
}

function findMouseDown(a) {
    a.className = "nor"
}

function findMouseOut(a) {
    a.className = "nor"
}
String.prototype.trim = function() {
    return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, "")
};
String.prototype.fulltrim = function() {
    return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, "").replace(/\s+/g, " ")
};
String.prototype.stringReplace = function(c, b) {
    var e = new String(this);
    var d = 0;
    var a = c.length;
    d = e.indexOf(c);
    while (d != -1) {
        preString = e.substring(0, d);
        postString = e.substring(d + a, e.length);
        e = preString + b + postString;
        d = e.indexOf(c)
    }
    return e
};

function createXHR() {
    var a = false;
    xhr = null;
    if (xhr == null) {
        try {
            a = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (c) {
            try {
                a = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (b) {
                a = false
            }
        }
        if (!a && typeof XMLHttpRequest != "undefined") {
            try {
                a = new XMLHttpRequest()
            } catch (c) {
                a = false
            }
        }
        if (!a && window.createRequest) {
            try {
                a = window.createRequest()
            } catch (c) {
                a = false
            }
        }
        xhr = a
    }
    return xhr
}

function readCookieGen(b) {
    var e = b + "=";
    var a = document.cookie.split(";");
    for (var d = 0; d < a.length; d++) {
        var f = a[d];
        while (f.charAt(0) == " ") {
            f = f.substring(1, f.length)
        }
        if (f.indexOf(e) == 0) {
            return f.substring(e.length, f.length)
        }
    }
    return null
}

function getCookieDomainString() {
    domainString = "";
    if (window.location.href.search(/www\.asklaila\.com/) != -1) {
        domainString = "domain=www.asklaila.com;"
    } else {
        if (window.location.href.search(/sandbox\.asklaila\.com/) != -1) {
            domainString = "domain=sandbox.asklaila.com;"
        } else {
            if (window.location.href.search(/staging\.asklaila\.com/) != -1) {
                domainString = "domain=staging.asklaila.com;"
            } else {
                if (window.location.href.search(/newqa\.asklaila\.com/) != -1) {
                    domainString = "domain=newqa.asklaila.com;"
                } else {
                    domainString = "domain=asklaila.com;"
                }
            }
        }
    }
    return domainString
}

function getCookie(c) {
    if (document.cookie.length > 0) {
        var b = document.cookie.split(";");
        for (var a = 0; a < b.length; a++) {
            if (b[a].trim().indexOf(c + "=") == 0) {
                return b[a].substring(b[a].indexOf("=") + 1)
            }
        }
    }
    return ""
}

function setSldCookie(a, c, b) {
    domainString = getCookieDomainString();
    cookieString = a + "=" + c + ";path=/;" + domainString;
    if (b != "") {
        cookieString += "expires=" + b + ";"
    }
    document.cookie = cookieString;
    if (a = "ci") {
        domainString = "domain=asklaila.com;";
        cookieString = a + "=" + c + ";path=/;" + domainString;
        if (b != "") {
            cookieString += "expires=" + b + ";"
        }
        document.cookie = cookieString
    }
}

function saveUserContent(a, b) {
    setSldCookie("uc", a + "|" + encodeURIComponent(b.value), "")
}

function saveUserLocation(a, b) {
    setSldCookie("ul", a + "|" + encodeURIComponent(b.value), "")
}

function setugcCookie(b, e, d) {
    var c = new Date(new Date().getTime() + (d * 60 * 1000));
    var a = "expires=" + c.toUTCString();
    document.cookie = b + "=" + e + "; " + a + ";path=/"
}

function selectCity(e) {
    if (document.getElementById("what")) {
        var d = document.getElementById("what").value;
        var b = createXHR();
        var c = "/SetWhat.do?what=" + d;
        b.open("GET", c, true);
        b.onreadystatechange = function() {};
        b.send(null)
    }
    var a = new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)).toGMTString();
    setSldCookie("ci", e, a);
    window.location = getContextURL() + slugifyCity(e) + "/";
    return false
}

function selectMoreCities(c) {
    if (document.getElementById("what")) {
        var e = document.getElementById("what").value;
        var b = createXHR();
        var d = "/SetWhat.do?what=" + e;
        b.open("GET", d, true);
        b.onreadystatechange = function() {};
        b.send(null)
    }
    var a = new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)).toGMTString();
    setSldCookie("ci", city, a);
    window.location = "https://" + c + "/cities/";
    return false
}

function selectIntCity(f, c) {
    if (document.getElementById("what")) {
        var e = document.getElementById("what").value;
        var b = createXHR();
        var d = "/SetWhat.do?what=" + e;
        b.open("GET", d, true);
        b.onreadystatechange = function() {};
        b.send(null)
    }
    var a = new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)).toGMTString();
    setSldCookie("ci", f, a);
    setCookieRevGeoLoc("revGeoLocality", "", 1);
    window.location = "https://" + c + "/" + f + "/";
    return false
}

function selectIntCityHome(f, c) {
    if (document.getElementById("what")) {
        var e = document.getElementById("what").value;
        var b = createXHR();
        var d = "/SetWhat.do?what=" + e;
        b.open("GET", d, true);
        b.onreadystatechange = function() {};
        b.send(null)
    }
    var a = new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)).toGMTString();
    setSldCookie("ci", f, a);
    setCookieRevGeoLoc("revGeoLocality", "", 1);
    window.location = c + f + "/";
    return false
}

function goToUrl(a) {
    if (document.getElementById("what")) {
        var e = document.getElementById("what").value;
        var c = createXHR();
        var d = "/SetWhat.do?what=" + e;
        c.open("GET", d, true);
        c.onreadystatechange = function() {};
        c.send(null)
    }
    var b = new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)).toGMTString();
    setSldCookie("ci", city, b);
    window.location = a;
    return false
}

function selectCityAndRedirect(f, d) {
    var e = document.getElementById("what").value;
    var b = createXHR();
    var c = "/SetWhat.do?what=" + e;
    b.open("GET", c, true);
    b.onreadystatechange = function() {};
    b.send(null);
    var a = new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)).toGMTString();
    setSldCookie("ci", f, a);
    setCookieRevGeoLoc("revGeoLocality", "", 1);
    if (d.contains("http") == -1) {
        window.location = "https://" + getFullURLServerName() + getContextPath() + d
    } else {
        window.location = d
    }
    return false
}

function selectCityAndUrl(c, b) {
    var a = new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)).toGMTString();
    setSldCookie("ci", c, a);
    setCookieRevGeoLoc("revGeoLocality", "", 1);
    window.location = b.href;
    return false
}

function setCityCookie(b) {
    var a = new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000)).toGMTString();
    setSldCookie("ci", b, a);
    return true
}

function hidecityDiv() {
    var a = document.getElementById("cityLocation");
    a.style.display = "none"
}

function removeWaterMark(a) {
    if ((a.value.indexOf("Listings, Movies and Events") != -1) || (a.value.indexOf("Business Listings") != -1)) {
        a.value = ""
    }
    a.style.color = "black";
    a.style.fontWeight = "bold"
}

function removeWhereWaterMark(a) {
    if (a.value.indexOf("For Example") != -1) {
        a.value = ""
    }
    a.style.color = "black";
    a.style.fontWeight = "bold"
}
startList = function() {
    if (document.all && document.getElementById) {
        cssdropdownRoot = document.getElementById("cssdropdown");
        if (cssdropdownRoot == null) {
            return
        }
        for (x = 0; x < cssdropdownRoot.childNodes.length; x++) {
            node = cssdropdownRoot.childNodes[x];
            if (node.nodeName == "LI") {
                node.onmouseover = function() {
                    this.className += " over"
                };
                node.onmouseout = function() {
                    this.className = this.className.replace(" over", "");
                    this.style.backgroundColor = "white"
                }
            }
        }
    }
};
if (window.attachEvent) {
    window.attachEvent("onload", startList)
} else {
    window.onload = startList
}

function showSugTip(b) {
    var a = document.getElementById("suggTip");
    a.style.left = b.pageX ? pageXOffset + b.clientX - 100 : document.body.scrollLeft + b.clientX - 100;
    a.style.top = b.pageY ? pageYOffset + b.clientY + 100 : document.body.scrollTop + b.clientY + 100;
    a.style.display = "block"
}

function hideSugTip() {
    document.getElementById("suggTip").style.display = "none"
}

function fillWaterMarkText_All(h) {
    h = typeof(h) != "undefined" ? h : "";
    if (document.forms[h + "contactMeFormBean"] != null) {
        var g = readCookieGen("lcf");
        var f = null;
        var e = null;
        if (g != null) {
            g = hexDecode(g);
            var d = g.split("|");
            f = d[0];
            e = d[1]
        }
        var c = document.getElementById(h + "businessReqName");
        if (c != null) {
            if (f != null && f != "") {
                c.value = f;
                removeWaterMarkText(c);
                setFlag(c)
            } else {
                fillWaterMarkText_wrapper(c, nameExampleText, nameFlag)
            }
        }
        var b = document.getElementById(h + "businessReqMob");
        if (b != null) {
            if (e != null) {
                b.value = e;
                removeWaterMarkText(b);
                setFlag(b)
            } else {
                fillWaterMarkText_wrapper(b, mobileExampleText, mobileFlag)
            }
        }
        var a = document.getElementById(h + "businessReqMail");
        if (a != null) {
            fillWaterMarkText_wrapper(a, emailExampleText, emailFlag)
        }
    }
}
var nameExampleText = "Sanjay Gupta";
var nameFlag = true;
var mobileExampleText = "9902016976";
var mobileFlag = true;
var emailExampleText = "example@domain.com";
var emailFlag = true;

function removeWaterMarkText(a) {
    if (a.id.indexOf("businessReqName") != -1) {
        removeWaterMarkText_wrapper(a, nameExampleText, nameFlag)
    } else {
        if (a.id.indexOf("businessReqMob") != -1) {
            removeWaterMarkText_wrapper(a, mobileExampleText, mobileFlag)
        } else {
            if (a.id.indexOf("businessReqMail") != -1) {
                removeWaterMarkText_wrapper(a, emailExampleText, emailFlag)
            }
        }
    }
}

function fillWaterMarkText(a) {
    if (a.id.indexOf("businessReqName") != -1) {
        fillWaterMarkText_wrapper(a, nameExampleText, nameFlag)
    } else {
        if (a.id.indexOf("businessReqMob") != -1) {
            fillWaterMarkText_wrapper(a, mobileExampleText, mobileFlag)
        } else {
            if (a.id.indexOf("businessReqMail") != -1) {
                fillWaterMarkText_wrapper(a, emailExampleText, emailFlag)
            }
        }
    }
}

function setFlag(a) {
    if (a.value.trim().length > 0) {
        if (a.id.indexOf("businessReqName") != -1) {
            nameFlag = false
        } else {
            if (a.id.indexOf("businessReqMob") != -1) {
                mobileFlag = false
            } else {
                if (a.id.indexOf("businessReqMail") != -1) {
                    emailFlag = false
                }
            }
        }
        a.className = "normalText"
    } else {
        if (a.id.indexOf("businessReqName") != -1) {
            nameFlag = true
        } else {
            if (a.id.indexOf("businessReqMob") != -1) {
                mobileFlag = true
            } else {
                if (a.id.indexOf("businessReqMail") != -1) {
                    emailFlag = true
                }
            }
        }
    }
}

function removeWaterMarkText_wrapper(c, b, a) {
    if ((a) && (c.value == b)) {
        c.value = "";
        c.className = "normalText"
    }
}

function fillWaterMarkText_wrapper(c, b, a) {
    if ((c.value.trim() == "")) {
        c.value = b;
        c.className = "waterMarkText"
    }
}

function validateFrm(e) {
    e = typeof(e) != "undefined" ? e : "";
    var h = "";
    var g = document.getElementById(e + "contactMeFormBean");
    if (document.getElementById(e + "businessReq")) {
        h = document.getElementById(e + "businessReq").value
    }
    var a = "";
    if (document.getElementById(e + "businessReqMob")) {
        a = document.getElementById(e + "businessReqMob").value
    }
    var c = "";
    if (document.getElementById(e + "businessReqMail")) {
        c = document.getElementById(e + "businessReqMail").value
    }
    var b = "";
    if (document.getElementById(e + "businessReqLocality")) {
        b = document.getElementById(e + "businessReqLocality").value
    }
    var f = "";
    if (document.getElementById(e + "businessReqName")) {
        f = document.getElementById(e + "businessReqName").value
    }
    var d = "";
    if (a == "") {
        d = "Please enter your mobile number";
        alert(d);
        document.getElementById(e + "businessReqMob").focus();
        return d
    }
    if (a == mobileExampleText) {
        d = "Please enter your mobile number";
        alert(d);
        document.getElementById(e + "businessReqMob").value = "";
        document.getElementById(e + "businessReqMob").focus();
        return d
    }
    if (a.length > 10) {
        d = "Invalid Mobile Number";
        alert(d);
        document.getElementById(e + "businessReqMob").focus();
        return d
    }
    createCookie("lcfphnumber", a, 180);
    if ((f == null || f.trim() == "")) {
        f = "";
        if (document.getElementById(e + "businessReqName")) {
            document.getElementById(e + "businessReqName").value = ""
        }
    }
    if (f == nameExampleText && nameFlag) {
        f = "";
        if (document.getElementById(e + "businessReqName")) {
            document.getElementById(e + "businessReqName").value = ""
        }
    }
    if (f.length > 30) {
        d = "Your name should not exceed 30 characters";
        alert(d);
        document.getElementById(e + "businessReqName").focus();
        return d
    }
    if (!checkMobileNumForLCF(a)) {
        d = "Please enter correct mobile number!";
        alert(d);
        document.getElementById(e + "businessReqMob").focus();
        return d
    }
    if (h.length > 150) {
        d = "Please enter your requirements within 150 characters.";
        alert(d);
        document.getElementById(e + "businessReq").focus();
        return d
    }
    d = validateLcfAttributes(e);
    return d
}

function validateLcfAttributes(d) {
    d = typeof(d) != "undefined" ? d : "";
    clearLcfAttributeErrors(d);
    var b = 0;
    var c = "";
    while (document.getElementById(d + "lcfAttr" + b) != null) {
        if (document.getElementById(d + "lcfAttrType" + b) != null && document.getElementById(d + "lcfAttrType" + b).value == "multiselect" && document.getElementById(d + "lcfMandatoryAttr" + b) != null && document.getElementById(d + "lcfMandatoryAttr" + b).value == "1") {
            var a = true;
            j = 0;
            while (document.getElementById(d + "lcfAttr" + b + "_" + j) != null) {
                if (document.getElementById(d + "lcfAttr" + b + "_" + j).checked) {
                    a = false;
                    break
                }
                j++
            }
            if (a) {
                c = "Select at least one from: " + document.getElementById(d + "lcfAttrLbl" + b).value;
                showLcfAttributeErrors(c, document.getElementById(d + "lcfAttrErrorLabel" + b));
                return c
            }
        } else {
            if (document.getElementById(d + "lcfAttrType" + b) != null && document.getElementById(d + "lcfAttrType" + b).value == "radio" && document.getElementById(d + "lcfMandatoryAttr" + b) != null && document.getElementById(d + "lcfMandatoryAttr" + b).value == "1") {
                var a = true;
                j = 0;
                while (document.getElementById(d + "lcfAttr" + b + "_" + j) != null) {
                    if (document.getElementById(d + "lcfAttr" + b + "_" + j).checked) {
                        a = false;
                        break
                    }
                    j++
                }
                if (a) {
                    c = "Choose one from: " + document.getElementById(d + "lcfAttrLbl" + b).value;
                    showLcfAttributeErrors(c, document.getElementById(d + "lcfAttrErrorLabel" + b));
                    return c
                }
            } else {
                if (document.getElementById(d + "lcfAttrType" + b) != null && document.getElementById(d + "lcfAttrType" + b).value == "select" && document.getElementById(d + "lcfMandatoryAttr" + b) != null && document.getElementById(d + "lcfMandatoryAttr" + b).value == "1") {
                    var a = true;
                    if (document.getElementById(d + "lcfAttr" + b).value.length > 0) {
                        a = false
                    }
                    if (a) {
                        c = "Please select an option from: " + document.getElementById(d + "lcfAttrLbl" + b).value;
                        showLcfAttributeErrors(c, document.getElementById(d + "lcfAttrErrorLabel" + b));
                        return c
                    }
                } else {
                    if (document.getElementById(d + "lcfAttrType" + b) != null && (document.getElementById(d + "lcfAttrType" + b).value == "text" || document.getElementById(d + "lcfAttrType" + b).value == "textarea") && document.getElementById(d + "lcfMandatoryAttr" + b).value == "1") {
                        var a = true;
                        if (document.getElementById(d + "lcfAttr" + b).value.trim().length > 0) {
                            a = false
                        }
                        if (a) {
                            c = document.getElementById(d + "lcfAttrLbl" + b).value + " is required.";
                            showLcfAttributeErrors(c, document.getElementById(d + "lcfAttrErrorLabel" + b));
                            return c
                        }
                    }
                }
            }
        }
        b++
    }
    return c
}

function showLcfAttributeErrors(b, a) {
    a.innerHTML = b
}

function clearLcfAttributeErrors(b) {
    b = typeof(b) != "undefined" ? b : "";
    var a = 0;
    while (document.getElementById(b + "lcfAttrErrorLabel" + a) != null) {
        document.getElementById(b + "lcfAttrErrorLabel" + a).innerHTML = "";
        a++
    }
}

function checkMobileNumForLCF(c) {
    var d = /\d{10}$/;
    var a = c.match(d);
    var b = "";
    if (a != null) {
        b = a[1];
        return true
    } else {
        return false
    }
}

function hexEncode(e) {
    var d = "0123456789abcdef";
    var b = new Array();
    for (var c = 0; c < 256; c++) {
        b[c] = d.charAt(c >> 4) + d.charAt(c & 15)
    }
    var a = new Array();
    for (var c = 0; c < e.length; c++) {
        a[c] = b[e.charCodeAt(c)]
    }
    return a.join("")
}

function hexDecode(f) {
    var e = "0123456789abcdef";
    var b = new Array();
    for (var d = 0; d < 256; d++) {
        b[e.charAt(d >> 4) + e.charAt(d & 15)] = String.fromCharCode(d)
    }
    if (!f.match(/^[a-f0-9]*$/i)) {
        return false
    }
    if (f.length % 2) {
        f = "0" + f
    }
    var a = new Array();
    var c = 0;
    for (var d = 0; d < f.length; d += 2) {
        a[c++] = b[f.substr(d, 2)]
    }
    return a.join("")
}

function saveUserLCFNameMobile(b, f) {
    var c = new Date(new Date().getTime() + (180 * 24 * 60 * 60 * 1000)).toGMTString();
    var a = new Date().getTime();
    var e = b + "|" + f + "|" + a + "|" + a;
    var d = hexEncode(e);
    setSldCookie("lcf", d, c)
}

function submitContactMeFormLDP() {
    var b = validateFrm();
    var s = document.forms.contactMeFormBean.businessReqCategory.value;
    var m = "";
    if (document.getElementById("businessReqCategoryName")) {
        m = document.getElementById("businessReqCategoryName").value
    }
    var h = "";
    if (document.getElementById("lcfSourceType")) {
        h = document.getElementById("lcfSourceType").value
    }
    if (b.length > 0) {
        ga("send", "event", "lcfSource", "Failure", m + "|" + s + "|" + b)
    } else {
        var e = document.getElementById("contactMeHeading");
        var l = document.getElementById("contactMeFormBean");
        var r = "";
        if (document.forms.contactMeFormBean.businessReq) {
            r = document.forms.contactMeFormBean.businessReq.value
        }
        var c = document.forms.contactMeFormBean.businessReqMob.value;
        var q = document.forms.contactMeFormBean.businessReqMail.value;
        var g = document.forms.contactMeFormBean.businessReqLocality.value;
        var z = document.forms.contactMeFormBean.businessReqName.value;
        var t = document.forms.contactMeFormBean.city.value;
        if (q == emailExampleText) {
            q = ""
        }
        var n = "businessReq=" + encodeURIComponent(r) + "&name=" + encodeURIComponent(z) + "&mobileNumber=" + encodeURIComponent(c) + "&email=" + encodeURIComponent(q) + "&locality=" + encodeURIComponent(g) + "&category=" + encodeURIComponent(s) + "&contactMeUrl=" + encodeURIComponent(window.location.href) + "&city=" + encodeURIComponent(t);
        var v = 0;
        var f = n.length;
        while (document.getElementById("lcfAttr" + v) != null) {
            if (document.getElementById("lcfAttrType" + v) != null && (document.getElementById("lcfAttrType" + v).value == "multiselect" || document.getElementById("lcfAttrType" + v).value == "radio")) {
                n += "&lcfAttr" + v + "=";
                var u = 0;
                var p = false;
                while (document.getElementById("lcfAttr" + v + "_" + u) != null) {
                    if (document.getElementById("lcfAttr" + v + "_" + u).checked) {
                        n += encodeURIComponent(document.getElementById("lcfAttr" + v + "_" + u).value) + ",";
                        p = true
                    }
                    u++
                }
                if (p) {
                    n = n.substring(0, n.length - 1)
                }
            } else {
                if (document.getElementById("lcfAttrType" + v) != null && document.getElementById("lcfAttrType" + v).value == "checkbox") {
                    n += "&lcfAttr" + v;
                    if (document.getElementById("lcfAttr" + v).checked) {
                        n += "=" + encodeURIComponent(document.getElementById("lcfAttr" + v).value)
                    }
                } else {
                    n += "&lcfAttr" + v + "=" + encodeURIComponent(document.getElementById("lcfAttr" + v).value)
                }
            }
            n += "&lcfAttrLbl" + v + "=" + encodeURIComponent(document.getElementById("lcfAttrLbl" + v).value);
            n += "&lcfAttrId" + v + "=" + encodeURIComponent(document.getElementById("lcfAttrId" + v).value);
            if (document.getElementById("lcfMandatoryAttr" + v).value != null) {
                n += "&lcfMandatoryAttr" + v + "=" + encodeURIComponent(document.getElementById("lcfMandatoryAttr" + v).value)
            }
            v++
        }
        var a = n.substring(f);
        n += "&attrCount=" + v;
        var w = document.getElementById("contactMeDiv");
        w.style.display = "none";
        var d = document.getElementById("contactMeResponse");
        var y = new Image();
        y.src = getContextPath() + "/webres/img/loading.gif";
        y.alt = "sending";
        d.appendChild(y);
        d.style.display = "";
        var k = function(A) {
            if (A.indexOf("Success") != -1) {
                d.style.display = "none";
                w.style.display = "none";
                e.innerHTML = "Our executives are processing your requirements, please wait for a confirmation call."
            } else {
                if (A.indexOf("Please fill in the full details") != -1) {
                    d.style.display = "none";
                    w.style.display = "";
                    e.innerHTML = "Please fill in the full details"
                } else {
                    if (A.indexOf("Sorry, the email could not be sent.") != -1) {
                        d.style.display = "none";
                        w.style.display = "";
                        e.innerHTML = "Sorry, the email could not be sent. Please enter your correct details"
                    } else {
                        w.style.display = "none";
                        d.style.display = "";
                        d.style.color = "#ffffff";
                        d.style.lineHeight = "1.5em";
                        d.style.font = "bold 12px tahoma";
                        e.innerHTML = "";
                        d.innerHTML = A.responseText
                    }
                }
            }
            trackConversion()
        };
        var o = function(A) {
            d.innerHTML = "There was an error with your submission, please try later."
        };
        saveUserLCFNameMobile(z, c);
        $.ajax({
            type: "POST",
            url: getContextPath() + "/ContactMe/",
            data: n,
            success: k,
            failure: o
        });
        ga("send", "event", "lcfSource", "Submit", m + "|" + s + "|" + a);
        return false
    }
}

function submitContactMeFormSRP(w) {
    w = typeof(w) != "undefined" ? w : "";
    var b = validateFrm(w);
    var o = "";
    if (document.getElementById(w + "businessReqCategoryName")) {
        o = document.getElementById(w + "businessReqCategoryName").value
    }
    var l = "";
    if (document.getElementById(w + "lcfSourceType")) {
        l = document.getElementById(w + "lcfSourceType").value
    }
    var u = "";
    if (document.getElementById(w + "businessReqCategory")) {
        u = document.getElementById(w + "businessReqCategory").value
    }
    var g = "";
    if (document.getElementById(w + "lcfFormType")) {
        g = document.getElementById(w + "lcfFormType").value
    }
    var e = "";
    if (document.getElementById("lcfDeviceSource")) {
        e = document.getElementById("lcfDeviceSource").value
    }
    if (b.length > 0) {
        if (l == "LDP" && e == "desktop") {
            if (g == "Auto") {
                ga("send", "event", "lcfSource", "Desktop-LDP-Auto-Failure", o + "|" + u + "|" + b)
            } else {
                if (g == "Static") {
                    ga("send", "event", "lcfSource", "Desktop-LDP-Static-Failure", o + "|" + u + "|" + b)
                } else {
                    if (g == "Manual") {
                        ga("send", "event", "lcfSource", "Desktop-LDP-Manual-Failure", o + "|" + u + "|" + b)
                    }
                }
            }
        } else {
            if (l == "SRP" && e == "desktop") {
                if (g == "Auto") {
                    ga("send", "event", "lcfSource", "Desktop-SRP-Auto-Failure", o + "|" + u + "|" + b)
                } else {
                    if (g == "Static") {
                        ga("send", "event", "lcfSource", "Desktop-SRP-Static-Failure", o + "|" + u + "|" + b)
                    } else {
                        if (g == "Manual") {
                            ga("send", "event", "lcfSource", "Desktop-SRP-Manual-Failure", o + "|" + u + "|" + b)
                        }
                    }
                }
            } else {
                if (l == "LDP" && e == "mobile") {
                    if (g == "Auto") {
                        ga("send", "event", "lcfSource", "Mobile-LDP-Auto-Failure", o + "|" + u + "|" + b)
                    } else {
                        if (g == "Static") {
                            ga("send", "event", "lcfSource", "Mobile-LDP-Static-Failure", o + "|" + u + "|" + b)
                        } else {
                            if (g == "Manual") {
                                ga("send", "event", "lcfSource", "Mobile-LDP-Manual-Failure", o + "|" + u + "|" + b)
                            }
                        }
                    }
                } else {
                    if (l == "SRP" && e == "mobile") {
                        if (g == "Auto") {
                            ga("send", "event", "lcfSource", "Mobile-SRP-Auto-Failure", o + "|" + u + "|" + b)
                        } else {
                            if (g == "Static") {
                                ga("send", "event", "lcfSource", "Mobile-SRP-Static-Failure", o + "|" + u + "|" + b)
                            } else {
                                if (g == "Manual") {
                                    ga("send", "event", "lcfSource", "Mobile-SRP-Manual-Failure", o + "|" + u + "|" + b)
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        var f = document.getElementById(w + "contactMeHeading");
        var n = document.getElementById(w + "contactMeFormBean");
        if (!n) {
            alert("An error has occured");
            return
        }
        var t = "";
        if (document.getElementById(w + "businessReq")) {
            t = document.getElementById(w + "businessReq").value
        }
        var c = "";
        if (document.getElementById(w + "businessReqMob")) {
            c = document.getElementById(w + "businessReqMob").value
        }
        var s = "";
        if (document.getElementById(w + "businessReqMail")) {
            s = document.getElementById(w + "businessReqMail").value
        }
        var k = "";
        if (document.getElementById(w + "businessReqLocality")) {
            k = document.getElementById(w + "businessReqLocality").value
        }
        var B = "";
        if (document.getElementById(w + "businessReqSearchQuery")) {
            B = document.getElementById(w + "businessReqSearchQuery").value
        }
        var y = "";
        if (document.getElementById(w + "businessReqCity")) {
            y = document.getElementById(w + "businessReqCity").value
        }
        var D = "";
        if (document.getElementById(w + "businessReqName")) {
            D = document.getElementById(w + "businessReqName").value
        }
        if (s == emailExampleText) {
            s = ""
        }
        var p = "businessReq=" + encodeURIComponent(t) + "&name=" + encodeURIComponent(D) + "&mobileNumber=" + encodeURIComponent(c) + "&email=" + encodeURIComponent(s) + "&locality=" + encodeURIComponent(k) + "&category=" + encodeURIComponent(u) + "&searchQuery=" + encodeURIComponent(B) + "&contactMeUrl=" + encodeURIComponent(window.location.href) + "&city=" + encodeURIComponent(y);
        var z = 0;
        var h = p.length;
        while (document.getElementById(w + "lcfAttr" + z) != null) {
            if (document.getElementById(w + "lcfAttrType" + z) != null && (document.getElementById(w + "lcfAttrType" + z).value == "multiselect" || document.getElementById(w + "lcfAttrType" + z).value == "radio")) {
                p += "&lcfAttr" + z + "=";
                var v = 0;
                var r = false;
                while (document.getElementById(w + "lcfAttr" + z + "_" + v) != null) {
                    if (document.getElementById(w + "lcfAttr" + z + "_" + v).checked) {
                        p += encodeURIComponent(document.getElementById(w + "lcfAttr" + z + "_" + v).value) + ",";
                        r = true
                    }
                    v++
                }
                if (r) {
                    p = p.substring(0, p.length - 1)
                }
            } else {
                if (document.getElementById(w + "lcfAttrType" + z) != null && document.getElementById(w + "lcfAttrType" + z).value == "checkbox") {
                    p += "&lcfAttr" + z;
                    if (document.getElementById(w + "lcfAttr" + z).checked) {
                        p += "=" + encodeURIComponent(document.getElementById(w + "lcfAttr" + z).value)
                    }
                } else {
                    p += "&lcfAttr" + z + "=" + encodeURIComponent(document.getElementById(w + "lcfAttr" + z).value)
                }
            }
            p += "&lcfAttrLbl" + z + "=" + encodeURIComponent(document.getElementById(w + "lcfAttrLbl" + z).value);
            p += "&lcfAttrId" + z + "=" + encodeURIComponent(document.getElementById(w + "lcfAttrId" + z).value);
            if (document.getElementById(w + "lcfMandatoryAttr" + z).value != null) {
                p += "&lcfMandatoryAttr" + z + "=" + encodeURIComponent(document.getElementById(w + "lcfMandatoryAttr" + z).value)
            }
            z++
        }
        var a = p.substring(h);
        p += "&attrCount=" + z;
        p += "&formType=" + encodeURIComponent(w);
        if (w == "inline_") {
            if (document.getElementById(w + "relatedListingId")) {
                p += "&relatedListingId=" + document.getElementById(w + "relatedListingId").value
            }
            if (document.getElementById(w + "shareToMerchants")) {
                p += "&share=";
                if (document.getElementById(w + "shareToMerchants").checked) {
                    p += "1"
                } else {
                    p += "0"
                }
            } else {
                p += "&share=1"
            }
        }
        var A = document.getElementById(w + "lcfRequestDiv");
        A.style.display = "none";
        var d = getResponseDivForLCF(w);
        if (!d) {
            d = document.getElementById(w + "contactMeResponse")
        }
        var C = new Image();
        C.src = getContextPath() + "/webres/img/loading.gif";
        C.alt = "sending";
        d.appendChild(C);
        document.getElementById(w + "lcfResponseDiv").style.display = "";
        d.style.display = "";
        document.getElementById(w + "closeResponseButton").style.display = "";
        var m = function(E) {
            if (E.indexOf("Success") != -1) {
                A.style.display = "none";
                d.innerHTML = "Our executives are processing your requirements, please wait for a confirmation call. ";
                blockerLCFDivHide(null)
            } else {
                if (E.indexOf("Please fill in the full details") != -1) {
                    A.style.display = "";
                    d.innerHTML = "Please fill in the full details"
                } else {
                    if (E.indexOf("Sorry, the email could not be sent.") != -1) {
                        A.style.display = "";
                        d.innerHTML = "Sorry, the email could not be sent. Please enter your correct details"
                    } else {
                        if (E.indexOf("Sorry could not send sms.Try again later") != -1) {
                            A.style.display = "";
                            d.innerHTML = "Sorry could not send sms.Try again later"
                        } else {
                            if (E.indexOf("Boo Hoo. The SMS didn't go through.") != -1) {
                                d.style.display = "";
                                document.getElementById(w + "closeResponseButton").style.display = "";
                                d.innerHTML = "Boo Hoo. The SMS didn't go through."
                            } else {
                                d.style.display = "";
                                document.getElementById(w + "closeResponseButton").style.display = "";
                                d.innerHTML = E
                            }
                        }
                    }
                }
            }
            trackConversion()
        };
        var q = function(E) {
            d.innerHTML = "There was an error with your submission, please try later."
        };
        saveUserLCFNameMobile(D, c);
        $.ajax({
            type: "POST",
            url: getContextPath() + "/ContactMe/",
            data: p,
            success: m,
            failure: q
        });
        if (l == "LDP" && e == "desktop") {
            if (g == "Auto") {
                ga("send", "event", "lcfSource", "Desktop-LDP-Auto-Success", o + "|" + u + "|" + b)
            } else {
                if (g == "Static") {
                    ga("send", "event", "lcfSource", "Desktop-LDP-Static-Success", o + "|" + u + "|" + b)
                } else {
                    if (g == "Manual") {
                        ga("send", "event", "lcfSource", "Desktop-LDP-Manual-Success", o + "|" + u + "|" + b)
                    }
                }
            }
        } else {
            if (l == "SRP" && e == "desktop") {
                if (g == "Auto") {
                    ga("send", "event", "lcfSource", "Desktop-SRP-Auto-Success", o + "|" + u + "|" + b)
                } else {
                    if (g == "Static") {
                        ga("send", "event", "lcfSource", "Desktop-SRP-Static-Success", o + "|" + u + "|" + b)
                    } else {
                        if (g == "Manual") {
                            ga("send", "event", "lcfSource", "Desktop-SRP-Manual-Success", o + "|" + u + "|" + b)
                        }
                    }
                }
            } else {
                if (l == "LDP" && e == "mobile") {
                    if (g == "Auto") {
                        ga("send", "event", "lcfSource", "Mobile-LDP-Auto-Success", o + "|" + u + "|" + b)
                    } else {
                        if (g == "Static") {
                            ga("send", "event", "lcfSource", "Mobile-LDP-Static-Success", o + "|" + u + "|" + b)
                        } else {
                            if (g == "Manual") {
                                ga("send", "event", "lcfSource", "Mobile-LDP-Manual-Success", o + "|" + u + "|" + b)
                            }
                        }
                    }
                } else {
                    if (l == "SRP" && e == "mobile") {
                        if (g == "Auto") {
                            ga("send", "event", "lcfSource", "Mobile-SRP-Auto-Success", o + "|" + u + "|" + b)
                        } else {
                            if (g == "Static") {
                                ga("send", "event", "lcfSource", "Mobile-SRP-Static-Success", o + "|" + u + "|" + b)
                            } else {
                                if (g == "Manual") {
                                    ga("send", "event", "lcfSource", "Mobile-SRP-Manual-Success", o + "|" + u + "|" + b)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false
}

function validateSecretFrm(c) {
    c = typeof(c) != "undefined" ? c : "";
    var d = document.getElementById(c + "secretCode").value;
    var b = /[0-9]{4}/;
    var a = d.match(b);
    if (d == "") {
        alert("Please enter your secretCode number");
        document.getElementById(c + "secretCode").focus();
        return false
    }
    if (a == null) {
        alert("Incorrect Secret Code");
        document.getElementById(c + "secretCode").focus();
        return false
    }
    return true
}

function submitSecretCodeForm(f) {
    f = typeof(f) != "undefined" ? f : "";
    if (validateSecretFrm(f) == true) {
        var p = document.getElementById(f + "secretCodeFormBean");
        var d = document.getElementById(f + "secretCode").value;
        var a = document.getElementById(f + "leadId").value;
        var h = document.getElementById(f + "MD5String").value;
        var c = document.getElementById(f + "reSubmit").value;
        var e = document.getElementById(f + "attempt").value;
        var n = document.getElementById(f + "MobileNumber").value;
        var o = getResponseDivForLCF(f);
        if (!o) {
            o = document.getElementById(f + "contactMeResponse")
        }
        var m = document.getElementById(f + "lcfRequestDiv");
        m.style.display = "none";
        var k = "&secretCode=" + d + "&leadId=" + a + "&MD5String=" + h + "&mobileNumber=" + n;
        if (c == "reSubmit") {
            c = "reSubmitDone"
        }
        if (e != "") {
            k = k + "&attempt=" + e
        }
        if (c != "") {
            k = k + "&reSubmit=" + c
        }
        k = k + "&formType=" + f;
        var g = new Image();
        g.src = getContextPath() + "/webres/img/loading.gif";
        g.alt = "sending";
        o.appendChild(g);
        o.style.display = "";
        var l = function(q) {
            if (q.indexOf("Success") != -1) {
                m.style.display = "none";
                o.innerHTML = "Our executives are processing your requirements, please wait for a confirmation call. "
            } else {
                if (q.indexOf("Validation Failed") != -1) {
                    m.style.display = "none";
                    o.innerHTML = "Validation Failed!!!"
                } else {
                    if (q.indexOf("The SMS didn't go through") != -1) {
                        m.style.display = "none";
                        o.innerHTML = "Our executives are processing your requirements, please wait for a confirmation call."
                    } else {
                        if (q.indexOf("failure") != -1) {
                            m.style.display = "none";
                            o.innerHTML = q
                        } else {
                            m.style.display = "none";
                            o.innerHTML = "Your request has been validated.Our executives will get back to you shortly ";
                            blockerLCFDivHide(null)
                        }
                    }
                }
            }
        };
        var b = function(q) {
            o.innerHTML = "There was an error with your submission, please try later."
        };
        $.ajax({
            type: "POST",
            url: getContextPath() + "/SecretCode/",
            data: k,
            success: l,
            failure: b
        });
        return false
    }
}

function reSubmitSecretCodeForm(e) {
    e = typeof(e) != "undefined" ? e : "";
    var m = document.getElementById("secretCodeFormBean");
    var a = document.forms.secretCodeFormBean.leadId.value;
    var g = document.forms.secretCodeFormBean.MD5String.value;
    var l = document.forms.secretCodeFormBean.MobileNumber.value;
    var d = document.forms.secretCodeFormBean.reSubmit.value;
    if (d == "") {
        d = "reSubmit"
    }
    var b = "&reSubmit=" + d + "&mobileNumber=" + l + "&leadId=" + a + "&MD5String=" + g;
    var n = document.getElementById("contactMeResponse");
    var k = document.getElementById("contactMeDiv");
    k.style.display = "none";
    var n = document.getElementById("contactMeResponse");
    var f = new Image();
    f.src = getContextPath() + "/webres/img/loading.gif";
    f.alt = "sending";
    n.appendChild(f);
    n.style.display = "";
    var h = function(r) {
        if (r.indexOf("The SMS didn't go through.") != -1) {
            k.style.display = "none";
            var q = document.getElementById("contactMeResponse");
            var p = new Image();
            p.src = getContextPath() + "/webres/img/loading.gif";
            p.alt = "sending";
            q.appendChild(p);
            q.style.display = "";
            q.innerHTML = "Our executives are processing your requirements, please wait for a confirmation call."
        } else {
            k.style.display = "none";
            var q = document.getElementById("contactMeResponse");
            var p = new Image();
            p.src = getContextPath() + "/webres/img/loading.gif";
            p.alt = "sending";
            q.appendChild(p);
            q.style.display = "";
            q.innerHTML = r
        }
    };
    var c = function(p) {
        n.innerHTML = "There was an error with your submission, please try later."
    };
    $.ajax({
        type: "POST",
        url: getContextPath() + "/SecretCode/",
        data: b,
        success: h,
        failure: c
    });
    return false
}

function addListingSendOtp(f) {
    var d = "&contactNumber=" + f;
    var b = document.getElementById("otpresp");
    var a = document.getElementById("smsListingTable");
    var c = function(g) {
        if (g.indexOf("Error in sending SMS") != -1) {
            b.innerHTML = "Error in sending OTP. Please try again."
        } else {
            if (g.indexOf("verified") != -1) {
                b.innerHTML = "Your mobile number have already been verified in our system.";
                a.style.display = "none";
                document.getElementById("mobnumverify").style.display = "none";
                document.getElementById("mobnumverified").style.display = "";
                document.getElementById("numVerified").value = "true";
                setTimeout(function() {
                    $("#modalverifyotp").modal("hide")
                }, 1500)
            }
        }
    };
    var e = function(g) {
        b.innerHTML = "There was an error with your submission, please try later.";
        a.style.display = "none"
    };
    $.ajax({
        type: "POST",
        url: getContextPath() + "/VerifyUser/",
        data: d,
        success: c,
        failure: e
    });
    return false
}

function verifyotp() {
    var g = document.getElementById("contactNumber1").value;
    var d = document.getElementById("enterotp").value;
    var e = "&verify=true&contactNumber=" + g + "&otp=" + d;
    var b = document.getElementById("otpresp");
    var a = document.getElementById("smsListingTable");
    if (d == null || d.length <= 0) {
        b.innerHTML = "Please enter OTP";
        return false
    } else {
        if (d.length > 6) {
            b.innerHTML = "You have entered wrong OTP. Please try again with correct OTP.";
            return false
        }
    }
    var c = function(h) {
        if (h.indexOf("wrong OTP") != -1) {
            b.innerHTML = "You have entered wrong OTP. Please try again with correct OTP."
        } else {
            if (h.indexOf("verified") != -1) {
                b.innerHTML = "OTP verified";
                a.style.display = "none";
                document.getElementById("mobnumverify").style.display = "none";
                document.getElementById("mobnumverified").style.display = "";
                document.getElementById("numVerified").value = "true";
                setTimeout(function() {
                    $("#modalverifyotp").modal("hide")
                }, 1500)
            }
        }
    };
    var f = function(h) {
        b.innerHTML = "There was an error with your submission, please try later."
    };
    $.ajax({
        type: "POST",
        url: getContextPath() + "/VerifyUser/",
        data: e,
        success: c,
        failure: f
    });
    return false
}

function missedCallClick(b, d, a) {
    ga("send", "event", "lcfMissedCall", "Missed-Call-Clicked", b + "|" + d + "|" + a);
    var c = "tel:" + b;
    window.location.href = c
}

function submitContactMeFormIndependent() {
    var b = validateFrm();
    var s = document.forms.contactMeFormBean.businessReqCategory.value;
    var m = "";
    if (document.getElementById("businessReqCategoryName")) {
        m = document.getElementById("businessReqCategoryName").value
    }
    var h = "";
    if (document.getElementById("lcfSourceType")) {
        h = document.getElementById("lcfSourceType").value
    }
    if (b.length > 0) {
        ga("send", "event", "lcfSource", "Failure", m + "|" + s + "|" + b)
    } else {
        var e = document.getElementById("contactMeHeading");
        var l = document.getElementById("contactMeFormBean");
        var r = "";
        if (document.forms.contactMeFormBean.businessReq) {
            r = document.forms.contactMeFormBean.businessReq.value
        }
        var c = document.forms.contactMeFormBean.businessReqMob.value;
        var q = document.forms.contactMeFormBean.businessReqMail.value;
        var g = document.forms.contactMeFormBean.businessReqLocality.value;
        var y = document.forms.contactMeFormBean.businessReqSearchQuery.value;
        var t = document.forms.contactMeFormBean.city.value;
        var A = document.forms.contactMeFormBean.businessReqName.value;
        if (q == emailExampleText) {
            q = ""
        }
        var n = "businessReq=" + encodeURIComponent(r) + "&name=" + encodeURIComponent(A) + "&mobileNumber=" + encodeURIComponent(c) + "&email=" + encodeURIComponent(q) + "&locality=" + encodeURIComponent(g) + "&category=" + encodeURIComponent(s) + "&searchQuery=" + encodeURIComponent(y) + "&contactMeUrl=" + encodeURIComponent(window.location.href) + "&city=" + encodeURIComponent(t);
        var v = 0;
        var f = n.length;
        while (document.getElementById("lcfAttr" + v) != null) {
            if (document.getElementById("lcfAttrType" + v) != null && (document.getElementById("lcfAttrType" + v).value == "multiselect" || document.getElementById("lcfAttrType" + v).value == "radio")) {
                n += "&lcfAttr" + v + "=";
                var u = 0;
                var p = false;
                while (document.getElementById("lcfAttr" + v + "_" + u) != null) {
                    if (document.getElementById("lcfAttr" + v + "_" + u).checked) {
                        n += encodeURIComponent(document.getElementById("lcfAttr" + v + "_" + u).value) + ",";
                        p = true
                    }
                    u++
                }
                if (p) {
                    n = n.substring(0, n.length - 1)
                }
            } else {
                if (document.getElementById("lcfAttrType" + v) != null && document.getElementById("lcfAttrType" + v).value == "checkbox") {
                    n += "&lcfAttr" + v;
                    if (document.getElementById("lcfAttr" + v).checked) {
                        n += "=" + encodeURIComponent(document.getElementById("lcfAttr" + v).value)
                    }
                } else {
                    n += "&lcfAttr" + v + "=" + encodeURIComponent(document.getElementById("lcfAttr" + v).value)
                }
            }
            n += "&lcfAttrLbl" + v + "=" + encodeURIComponent(document.getElementById("lcfAttrLbl" + v).value);
            n += "&lcfAttrId" + v + "=" + encodeURIComponent(document.getElementById("lcfAttrId" + v).value);
            if (document.getElementById("lcfMandatoryAttr" + v).value != null) {
                n += "&lcfMandatoryAttr" + v + "=" + encodeURIComponent(document.getElementById("lcfMandatoryAttr" + v).value)
            }
            v++
        }
        var a = n.substring(f);
        n += "&attrCount=" + v;
        var w = document.getElementById("contactMeDiv");
        w.style.display = "none";
        var d = document.getElementById("contactMeResponse");
        var z = new Image();
        z.src = getContextPath() + "/webres/img/loading.gif";
        z.alt = "sending";
        document.getElementById("lcfResponseDiv").style.display = "";
        d.appendChild(z);
        d.align = "center";
        d.style.display = "";
        var k = function(B) {
            if (B.indexOf("Success") != -1) {
                d.style.display = "none";
                w.style.display = "none";
                e.innerHTML = "Our executives are processing your requirements, please wait for a confirmation call.  <img height='1' width='1' style='border-style:none;' alt='' src='http://www.googleadservices.com/pagead/conversion/1041396425/?value=10&amp;label=v8IDCJXT-gEQyeXJ8AM&amp;guid=ON&amp;script=0'/>"
            } else {
                if (B.indexOf("Please fill in the full details") != -1) {
                    d.style.display = "none";
                    w.style.display = "";
                    e.innerHTML = "Please fill in the full details"
                } else {
                    if (B.indexOf("Sorry, the email could not be sent.") != -1) {
                        d.style.display = "none";
                        w.style.display = "";
                        e.innerHTML = "Sorry, the email could not be sent. Please enter your correct details"
                    } else {
                        w.style.display = "none";
                        d.style.display = "";
                        d.style.color = "#000000";
                        d.style.lineHeight = "1.5em";
                        d.style.font = "bold 12px tahoma";
                        d.style.padding = "20px 5px 20px 5px";
                        e.innerHTML = "";
                        d.innerHTML = B
                    }
                }
            }
        };
        var o = function(B) {
            d.innerHTML = "There was an error with your submission, please try later."
        };
        saveUserLCFNameMobile(A, c);
        $.ajax({
            type: "POST",
            url: getContextPath() + "/ContactMe/",
            data: n,
            success: k,
            failure: o
        });
        ga("send", "event", "lcfSource", "Independent", m + "|" + s + "|" + a);
        return false
    }
}

function IsNumeric(b) {
    var d = "0123456789-.()";
    var c = true;
    var a;
    for (i = 0; i < b.length && c == true; i++) {
        a = b.charAt(i);
        if (d.indexOf(a) == -1) {
            c = false
        }
    }
    return c
}

function isValidEmail(a) {
    var b = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!b.test(a)) {
        return false
    }
    return true
}
var addthis_open_lazy_obj;
var addthis_open_lazy_str1;
var addthis_open_lazy_str2;
var addthis_open_lazy_str3;

function addthis_open_lazy(d, c, b, a) {
    addthis_open_lazy_obj = d;
    addthis_open_lazy_str1 = c;
    addthis_open_lazy_str2 = b;
    addthis_open_lazy_str3 = a;
    if (!window.addthis_disable_flash) {
        document.getElementById("addthis_external_script").src = "/webres/js/addthis_widget.js"
    }
    setTimeout("addthis_open_lazy2(1)", 500)
}

function addthis_open_lazy2(b) {
    if (b > 20) {
        return
    }
    if (!window.addthis_disable_flash) {
        var a = b + 1;
        setTimeout("addthis_open_lazy2(" + a + ")", 500)
    } else {
        addthis_open(addthis_open_lazy_obj, addthis_open_lazy_str1, addthis_open_lazy_str2, addthis_open_lazy_str3);
        setTimeout("addthis_close_auto()", 5000)
    }
}

function addthis_close_auto() {
    addthis_close()
}

function removeWhereChainWaterMark(a) {
    if (a.value.indexOf("Enter Locality") != -1) {
        a.value = ""
    }
    a.style.color = "black";
    a.style.fontWeight = "bold"
}

function chainSearch() {
    var b = document.getElementById("whereChain").value;
    var c = document.getElementById("chainSearchQueryString").value;
    var e = document.getElementById("city").value;
    var d = document.getElementById("catIds").value;
    b = filterNum(b.trim());
    c = filterNum(c.trim());
    if ((b == "") || (b.indexOf("Enter Locality") != -1)) {
        b = "-"
    }
    if (c == "") {
        c = "-"
    }
    var a = getContextURL() + "category/" + slugifyCity(e) + "/" + slugify(b) + "/" + slugify(c) + "/?category=" + d + "&v=listing";
    window.location.href = a;
    return false
}

function addLoadEvent(a) {
    var b = window.onload;
    if (typeof window.onload != "function") {
        window.onload = a
    } else {
        window.onload = function() {
            b();
            try {
                a()
            } catch (c) {}
        }
    }
}

function googleMakeMap() {
    var b = {
        zoom: 15,
        center: new google.maps.LatLng(listingGPS.latitude, listingGPS.longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var d = new google.maps.Map(document.getElementById("myMap"), b);
    var c = new google.maps.LatLng(listingGPS.latitude, listingGPS.longitude);
    var a = new google.maps.Marker({
        position: c,
        map: d,
        title: listingDetails.listingName + ", " + listingDetails.listingLocality + ", " + listingDetails.listingCity
    })
}

function loadMapStuff() {
    if (listingGPS) {
        var a = document.getElementById("mapScriptTag");
        if (document.getElementById("myMap")) {
            document.getElementById("myMap").style.display = ""
        }
        if (a) {
            a.src = "https://maps.google.com/maps/api/js?sensor=false&callback=googleMakeMap"
        }
        if (document.getElementById("mapLoadingMsg")) {
            document.getElementById("mapLoadingMsg").style.display = ""
        }
        return
    }
}

function submitComments(b) {
    var c = document.commentBean.description.value;
    var a = c.indexOf("Be the first to comment!");
    if (b == undefined) {
        $("#modalLogin").modal("show");
        createCookie("sc_" + listingHashId, "1", 1);
        setugcCookie("blkrP", "1", 1);
        return false
    }
    if (a > -1) {
        alert("Remember: Write first, then hit 'Submit'.");
        return false
    }
    if (c.trim().length == 0) {
        alert("Remember: Write first, then hit 'Submit'.");
        return false
    }
    if (c.trim().length > 5000) {
        alert("Oops! Maximum length(5000) exceeded");
        return false
    }
}

function createCookie(c, d, e) {
    var a = "";
    if (e) {
        var b = new Date();
        b.setTime(b.getTime() + (e * 24 * 60 * 60 * 1000));
        a = "; expires=" + b.toGMTString()
    }
    document.cookie = c + "=" + d + a + "; path=/"
}

function processPostRating(a) {
    var c = "rating_" + listingHashId;
    var b = getCookie(c);
    createCookie("rc_" + listingHashId, "", -1);
    if (a != undefined) {
        submitModalRatingUGC(b, listingHashId, a)
    }
}

function submitModalRatingUGC(d, c, a) {
    var b = {
        currentRating: d,
        listingHashId: c,
        userId: a
    };
    $.ajax({
        type: "POST",
        url: "/ListingRatingModal.do",
        data: b,
        dataType: "text",
        success: function(e) {
            if (e.indexOf("Double meter! You've already rated this page.") != -1) {
                alert("You've already rated this page")
            } else {
                if (e.indexOf("Hey. Don't be lazy. Log on, to use this feature.") != -1) {
                    alert("Log on, to use this feature")
                } else {
                    alert("Thanks for rating this listing")
                }
            }
        },
        failure: function(e) {
            alert("Oops! System error. try later")
        }
    })
}

function setFocus() {
    document.commentBean.description.focus()
}

function clearLCFRequirementsText(a) {
    if (a.innerHTML == "Enter your requirements here") {
        a.innerHTML = ""
    }
}

function chainListingRedirect(b) {
    var a = b.options[b.selectedIndex].value;
    if (a != null && a.trim() != "") {
        window.location.href = a
    }
    return
}

function processPostComment() {
    var b = document.commentBean.description.value;
    var a = b.indexOf("Be the first to comment!");
    if (a > -1) {
        return
    }
    if (b.trim().length == 0) {
        return
    }
    createCookie("sc_" + listingHashId, "", -1);
    document.commentBean.submit()
}

function disabletext(a) {
    return false
}

function reEnable() {
    return true
}

function disableCopyOnPage() {
    browser_version = parseInt(navigator.appVersion);
    browser_type = navigator.appName;
    var a = 0;
    if (document.getElementById("listngInfoDetBox") != null && document.getElementById("ldpAdrsDetails") != null) {
        if (browser_type == "Microsoft Internet Explorer" && (browser_version >= 4)) {
            document.getElementById("listngInfoDetBox").onselectstart = new Function("return false");
            document.getElementById("ldpAdrsDetails").onselectstart = new Function("return false")
        } else {
            if (browser_type == "Netscape" && (browser_version >= 4)) {
                document.getElementById("listngInfoDetBox").onmousedown = disabletext;
                document.getElementById("listngInfoDetBox").onclick = reEnable;
                document.getElementById("ldpAdrsDetails").onmousedown = disabletext;
                document.getElementById("ldpAdrsDetails").onclick = reEnable
            }
        }
    }
}

function showccPopup(a) {
    var b = true;
    if (b) {
        document.getElementById(a).style.display = "block"
    } else {
        if (document.all) {
            document.all[a].style.display = "block"
        } else {
            if (document.layers) {
                document.layers[a].style.display = "block"
            }
        }
    }
    setTimeout("autoHide()", 10000)
}

function hideccPopup(a) {
    var b = true;
    if (b && document.getElementById(a)) {
        document.getElementById(a).style.display = "none"
    } else {
        if (document.all && document.all[a]) {
            document.all[a].style.display = "none"
        } else {
            if (document.layers && document.layers[a]) {
                document.layers[a].style.display = "none"
            }
        }
    }
}

function autoHide() {
    document.getElementById("ccPopup").style.display = "none"
}

function initWhatBoxAC(f, c) {
    var b = 0;
    var a = 0;
    var d = 0;
    var e = 0;
    $("#what").on("keyup", function(k) {
        var h = k.keyCode;
        var g = document.getElementById("autoCompleteType").value;
        clearTimeout(e);
        e = setTimeout(initQueryHit(f, h, g), c)
    })
}

function initQueryHit(c, f, e) {
    var d = 2;
    var b = document.getElementById("what").value;
    var a = document.getElementById("countryName").value;
    var h = document.getElementById("where").value;
    if (f != 38 && f != 40 && f != 13 && f != 39 && f != 37) {
        if (b.length >= d) {
            $.ajax({
                type: "POST",
                cache: false,
                url: "/AutoCompleteNew.do",
                data: {
                    query: b,
                    city: c,
                    datatype: e,
                    country: a,
                    locality: h
                },
                dataType: "json",
                success: function(k) {
                    createDivBox(k, f)
                }
            })
        } else {
            document.getElementById("whatContainer").style.display = "none"
        }
    } else {
        var g = null;
        createDivBox(g, f)
    }
    $("html").click(function(k) {
        if (k.target.getAttribute("name") == "liWhat") {
            return false
        } else {
            document.getElementById("whatContainer").style.display = "none"
        }
    })
}

function createDivBox(d, h) {
    if (h != 38 && h != 40 && h != 13 && h != 39 && h != 37) {
        document.getElementById("whatContainer").style.display = "block";
        document.getElementById("whatContainer").classList.add("ac-container");
        var a = "";
        var c = "";
        var f = "";
        var g = "";
        keyCounter = 0;
        counterForKeyboardKey = 0;
        var l = document.getElementById("autoCompleteType").value;
        for (var e = 0; e < d.Suggestions.length; e++) {
            if (d.Suggestions[e].data_type == "keyword") {
                var k = '<li name="liWhat" data-type="' + d.Suggestions[e].data_type + '" id="r' + counterForKeyboardKey + '"  data-number="' + counterForKeyboardKey + '" data-value="' + d.Suggestions[e].name + '" data-id="' + d.Suggestions[e].random_id + '" data-locality="" onclick="loadInWhat(this.dataset.value,this.dataset.type,this.dataset.id,this.dataset.locality,this.dataset.number)">' + d.Suggestions[e].name + "</li>";
                a = a.concat(k);
                counterForKeyboardKey++
            } else {
                if (d.Suggestions[e].data_type == "listing") {
                    var k = '<li name="liWhat" data-type="' + d.Suggestions[e].data_type + '"  id="r' + counterForKeyboardKey + '" data-number="' + counterForKeyboardKey + '" data-value="' + d.Suggestions[e].name + '" data-id="' + d.Suggestions[e].random_id + '" data-locality="' + d.Suggestions[e].locality + '" onclick="loadInWhat(this.dataset.value,this.dataset.type,this.dataset.id,this.dataset.locality,this.dataset.number)">' + d.Suggestions[e].name + '<p style="color:#A4A4A4;margin-bottom:2px;display:inline;"> - ' + d.Suggestions[e].locality + "</p></li>";
                    g = g.concat(k);
                    counterForKeyboardKey++
                } else {
                    if (d.Suggestions[e].data_type == "movie") {
                        var k = '<li name="liWhat" data-type="' + d.Suggestions[e].data_type + '" id="r' + counterForKeyboardKey + '"  data-number="' + counterForKeyboardKey + '" data-value="' + d.Suggestions[e].name + '" data-id="' + d.Suggestions[e].movie_id + '" data-locality="" onclick="loadInWhat(this.dataset.value,this.dataset.type,this.dataset.id,this.dataset.locality,this.dataset.number)">' + d.Suggestions[e].name + '<p style="color:#A4A4A4;margin-bottom:2px;display:inline;"> - ' + d.Suggestions[e].language + "</p></li>";
                        c = c.concat(k);
                        counterForKeyboardKey++
                    } else {
                        if (d.Suggestions[e].data_type == "event") {
                            var k = '<li name="liWhat" data-type="' + d.Suggestions[e].data_type + '" id="r' + counterForKeyboardKey + '"  data-number="' + counterForKeyboardKey + '" data-value="' + d.Suggestions[e].name + '" data-id="" data-locality="" onclick="loadInWhat(this.dataset.value,this.dataset.type,this.dataset.id,this.dataset.locality,this.dataset.number)">' + d.Suggestions[e].name + "</li>";
                            f = f.concat(k);
                            counterForKeyboardKey++
                        }
                    }
                }
            }
        }
        if (a != "" && g != "" && c != "" && f != "") {
            document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Movies</div><div class="ac-bd" id="ac-bd"><ul>' + c + '</ul></div><div class="ac-hd">Events</div><div class="ac-bd" id="ac-bd"><ul>' + f + '</ul></div><div class="ac-hd">Businesses</div><div class="ac-bd" id="ac-bd"><ul>' + g + '</ul></div><div class="ac-hd">Searches</div><div class="ac-bd" id="ac-bd"><ul>' + a + "</ul></div></div>"
        } else {
            if (a != "" && g != "" && c != "" && f == "") {
                document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Movies</div><div class="ac-bd" id="ac-bd"><ul>' + c + '</ul></div><div class="ac-hd">Businesses</div><div class="ac-bd" id="ac-bd"><ul>' + g + '</ul></div><div class="ac-hd">Searches</div><div class="ac-bd" id="ac-bd"><ul>' + a + "</ul></div></div>"
            } else {
                if (a != "" && g != "" && c == "" && f != "") {
                    document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Events</div><div class="ac-bd" id="ac-bd"><ul>' + f + '</ul></div><div class="ac-hd">Businesses</div><div class="ac-bd" id="ac-bd"><ul>' + g + '</ul></div><div class="ac-hd">Searches</div><div class="ac-bd" id="ac-bd"><ul>' + a + "</ul></div></div>"
                } else {
                    if (a != "" && g == "" && c != "" && f != "") {
                        document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Movies</div><div class="ac-bd" id="ac-bd"><ul>' + c + '</ul></div><div class="ac-hd">Events</div><div class="ac-bd" id="ac-bd"><ul>' + f + '</ul></div><div class="ac-hd">Searches</div><div class="ac-bd" id="ac-bd"><ul>' + a + "</ul></div></div>"
                    } else {
                        if (a == "" && g != "" && c != "" && f != "") {
                            document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Movies</div><div class="ac-bd" id="ac-bd"><ul>' + c + '</ul></div><div class="ac-hd">Events</div><div class="ac-bd" id="ac-bd"><ul>' + f + '</ul></div><div class="ac-hd">Businesses</div><div class="ac-bd" id="ac-bd"><ul>' + g + "</ul></div></div>"
                        } else {
                            if (a != "" && g != "" && c == "" && f == "") {
                                document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Businesses</div><div class="ac-bd" id="ac-bd"><ul>' + g + '</ul></div><div class="ac-hd">Searches</div><div class="ac-bd" id="ac-bd"><ul>' + a + "</ul></div></div>"
                            } else {
                                if (a != "" && g == "" && c == "" && f != "") {
                                    document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Events</div><div class="ac-bd" id="ac-bd"><ul>' + f + '</ul></div><div class="ac-hd">Searches</div><div class="ac-bd" id="ac-bd"><ul>' + a + "</ul></div></div>"
                                } else {
                                    if (a == "" && g != "" && c != "" && f == "") {
                                        document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Movies</div><div class="ac-bd" id="ac-bd"><ul>' + c + '</ul></div><div class="ac-hd">Businesses</div><div class="ac-bd" id="ac-bd"><ul>' + g + "</ul></div></div>"
                                    } else {
                                        if (a != "" && g == "" && c != "" && f == "") {
                                            document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Movies</div><div class="ac-bd" id="ac-bd"><ul>' + c + '</ul></div><div class="ac-hd">Searches</div><div class="ac-bd" id="ac-bd"><ul>' + a + "</ul></div></div>"
                                        } else {
                                            if (a == "" && g != "" && c == "" && f != "") {
                                                document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Events</div><div class="ac-bd" id="ac-bd"><ul>' + f + '</ul></div><div class="ac-hd">Businesses</div><div class="ac-bd" id="ac-bd"><ul>' + g + "</ul></div></div>"
                                            } else {
                                                if (a == "" && g == "" && c != "" && f != "") {
                                                    document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Movies</div><div class="ac-bd" id="ac-bd"><ul>' + c + '</ul></div><div class="ac-hd">Events</div><div class="ac-bd" id="ac-bd"><ul>' + f + "</ul></div></div>"
                                                } else {
                                                    if (a == "" && g != "" && c == "" && f == "") {
                                                        document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Businesses</div><div class="ac-bd" id="ac-bd"><ul>' + g + "</ul></div></div>"
                                                    } else {
                                                        if (a != "" && g == "" && c == "" && f == "") {
                                                            document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Searches</div><div class="ac-bd" id="ac-bd"><ul>' + a + "</ul></div></div>"
                                                        } else {
                                                            if (a == "" && g == "" && c != "" && f == "") {
                                                                document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Movies</div><div class="ac-bd" id="ac-bd"><ul>' + c + "</ul></div></div>"
                                                            } else {
                                                                if (a == "" && g == "" && c == "" && f != "") {
                                                                    document.getElementById("whatContainer").innerHTML = '<div class="ac-content"><div class="ac-hd">Events</div><div class="ac-bd" id="ac-bd"><ul>' + f + "</ul></div></div>"
                                                                } else {
                                                                    if (a == "" && g == "" && c == "" && f == "") {
                                                                        document.getElementById("whatContainer").style.display = "none"
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (h == 38 || h == 40 || h == 13) {
            if (h == 40 && keyCounter < counterForKeyboardKey) {
                if (keyCounter > 0) {
                    countRem = keyCounter - 1;
                    document.getElementById("r" + countRem).classList.remove("ac-highlight")
                }
                document.getElementById("r" + keyCounter).classList.add("ac-highlight");
                document.getElementById("what").value = document.getElementById("r" + keyCounter).dataset.value;
                keyCounter++
            } else {
                if (h == 40 && keyCounter >= counterForKeyboardKey) {
                    countRem = keyCounter - 1;
                    document.getElementById("r" + countRem).classList.remove("ac-highlight");
                    keyCounter = 0;
                    document.getElementById("r" + keyCounter).classList.add("ac-highlight");
                    document.getElementById("what").value = document.getElementById("r" + keyCounter).dataset.value;
                    keyCounter++
                } else {
                    if (h == 38 && keyCounter <= counterForKeyboardKey && keyCounter != 1) {
                        keyCounter = keyCounter - 1;
                        if (keyCounter > 0) {
                            document.getElementById("r" + keyCounter).classList.remove("ac-highlight")
                        }
                        countRem = keyCounter - 1;
                        document.getElementById("r" + countRem).classList.add("ac-highlight");
                        document.getElementById("what").value = document.getElementById("r" + countRem).dataset.value
                    } else {
                        if (h == 38 && keyCounter == 1) {
                            document.getElementById("r0").classList.remove("ac-highlight");
                            countRem = counterForKeyboardKey - 1;
                            document.getElementById("r" + countRem).classList.add("ac-highlight");
                            document.getElementById("what").value = document.getElementById("r" + countRem).dataset.value;
                            keyCounter = counterForKeyboardKey
                        } else {
                            if (h == 13) {
                                var b = document.getElementsByClassName("ac-highlight");
                                if (b.length != 0) {
                                    loadInWhat(b[0].dataset.value, b[0].dataset.type, b[0].dataset.id, b[0].dataset.locality, b[0].dataset.number)
                                } else {
                                    document.getElementById("whatContainer").style.display = "none";
                                    document.getElementById("searchForm").submit()
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (document.getElementById("what").value.length <= 0) {
        document.getElementById("whatContainer").style.display = "none"
    }
}

function loadInWhat(a, b, e, d, c) {
    document.getElementById("whatContainer").style.display = "none";
    document.getElementById("what").value = a;
    document.getElementById("whatType").value = b;
    if (b == "listing") {
        document.getElementById("autoCompleteTypeSpecs").value = "LISTING"
    } else {
        if (b == "keyword") {
            document.getElementById("autoCompleteTypeSpecs").value = "LISTING"
        } else {
            if (b == "movie") {
                document.getElementById("autoCompleteTypeSpecs").value = "MOVIES"
            } else {
                if (b == "event") {
                    document.getElementById("autoCompleteTypeSpecs").value = "EVENTS"
                }
            }
        }
    }
    if (b == "listing") {
        document.getElementById("randomIdField").value = e
    } else {
        if (b == "movie") {
            document.getElementById("movieIdField").value = e
        }
    }
    document.getElementById("listingLocalityField").value = d;
    document.getElementById("searchForm").submit()
}

function initCitySBoxAC(c) {
    var b = 0;
    var a = 0;
    var d = 0;
    var e = 0;
    $("#promoCity").on("keyup", function(h) {
        var g = h.keyCode;
        var f = document.getElementById("promoCity").value;
        clearTimeout(e);
        e = setTimeout(initCityQueryHit(f, g), c)
    })
}

function initCityQueryHit(e, c) {
    var b = 2;
    var a = document.getElementById("promoCity").value.toLowerCase();
    if (c != 38 && c != 40 && c != 13 && c != 39 && c != 37) {
        if (a.length >= b) {
            $.ajax({
                type: "GET",
                cache: false,
                url: "/AutoCompleteCity.do",
                data: "cityinput=" + a,
                dataType: "json",
                success: function(f) {
                    createCityDivBox(f, c)
                }
            })
        } else {
            document.getElementById("citySContainer").style.display = "none"
        }
    } else {
        var d = null;
        createCityDivBox(d, c)
    }
}

function createCityDivBox(e, f) {
    var d = "";
    document.getElementById("citySContainer").style.display = "block";
    var b = document.getElementById("promoCity").value;
    for (var c = 0; c < e.length; c++) {
        var a = '<li name="liWhat" data-type="' + e[c] + '" data-value="' + e[c] + '" onclick="loadInSCity(this.dataset.value)">' + e[c] + "</li>";
        d = d.concat(a)
    }
    document.getElementById("citySContainer").innerHTML = '<div class="ac-content"><div class="ac-bd" id="ac-bd"><ul>' + d + "</ul></div></div>";
    if (document.getElementById("promoCity").value.length <= 0) {
        document.getElementById("citySContainer").style.display = "none"
    }
}

function loadInSCity(a) {
    document.getElementById("citySContainer").style.display = "none";
    document.getElementById("promoCity").value = a
}

function initLoc9(a) {
    if (a != null) {
        loc9 = new Array();
        var b = 0;
        for (i = 0; i < a.length; i++) {
            var d = a[i];
            var e = d.split(" ");
            for (j = 0; j < e.length; j++) {
                loc9[b] = e[j] + "-" + i;
                b++
            }
        }
    }
}

function initWhereBoxAC() {
    var b = 0;
    var a = 0;
    $("#where").on("keyup", function(d) {
        var c = d.keyCode;
        initQueryWhereHit(c)
    })
}

function initQueryWhereHit(d) {
    var a = [];
    var b = 1;
    var e = document.getElementById("where").value.toLowerCase();
    if (e.length >= b) {
        if (e != "" && e != " ") {
            for (var c = 0; c < loc.length; c++) {
                if (loc[c].toLowerCase().indexOf(e) == 0) {
                    a.push(loc[c])
                }
            }
        }
        if (a.length > 0) {
            createLocationDivBox(a, d)
        } else {
            document.getElementById("whereContainer").style.display = "none";
            if (d == 13) {
                document.getElementById("searchForm").submit()
            }
        }
    } else {
        document.getElementById("whereContainer").style.display = "none"
    }
    $("html").click(function(f) {
        if (f.target.getAttribute("name") == "liWhere") {
            return false
        } else {
            document.getElementById("whereContainer").style.display = "none"
        }
    })
}

function createLocationDivBox(g, c) {
    var d = 0;
    if (g.length > 10) {
        d = 10
    } else {
        d = g.length
    }
    if (c != 38 && c != 40 && c != 13) {
        keyCounterLoc = 0;
        var a = "";
        document.getElementById("whereContainer").style.display = "block";
        document.getElementById("whereContainer").classList.add("ac-container");
        for (var e = 0; e < d; e++) {
            var b = '<li name="liWhere" id="l' + e + '" data-value="' + g[e] + '" onclick="loadInWhere(this.dataset.value)">' + g[e] + "</li>";
            a = a.concat(b)
        }
        if (a != "") {
            document.getElementById("whereContainer").innerHTML = '<div class="ac-content"><div class="ac-bd" id="ac-bd"><ul>' + a + "</ul></div></div>"
        } else {
            if (a == "") {
                document.getElementById("whereContainer").style.display = "none"
            }
        }
    } else {
        if (c == 38 || c == 40 || c == 13) {
            if (c == 40 && keyCounterLoc < d) {
                if (keyCounterLoc > 0) {
                    countRem = keyCounterLoc - 1;
                    document.getElementById("l" + countRem).classList.remove("ac-highlight-loc")
                }
                document.getElementById("l" + keyCounterLoc).classList.add("ac-highlight-loc");
                keyCounterLoc++
            } else {
                if (c == 40 && keyCounterLoc >= d) {
                    countRem = d - 1;
                    document.getElementById("l" + countRem).classList.remove("ac-highlight-loc");
                    keyCounterLoc = 0;
                    document.getElementById("l" + keyCounterLoc).classList.add("ac-highlight-loc");
                    keyCounterLoc++
                } else {
                    if (c == 38 && keyCounterLoc <= d && keyCounterLoc != 1) {
                        keyCounterLoc = keyCounterLoc - 1;
                        if (keyCounterLoc > 0) {
                            document.getElementById("l" + keyCounterLoc).classList.remove("ac-highlight-loc")
                        }
                        countRem = keyCounterLoc - 1;
                        document.getElementById("l" + countRem).classList.add("ac-highlight-loc")
                    } else {
                        if (c == 38 && keyCounterLoc == 1) {
                            document.getElementById("l0").classList.remove("ac-highlight-loc");
                            countRem = d - 1;
                            document.getElementById("l" + countRem).classList.add("ac-highlight-loc");
                            keyCounterLoc = d
                        } else {
                            if (c == 13) {
                                var f = document.getElementsByClassName("ac-highlight-loc");
                                if (f.length != 0) {
                                    loadInWhere(f[0].dataset.value)
                                } else {
                                    document.getElementById("whereContainer").style.display = "none";
                                    document.getElementById("searchForm").submit()
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function loadInWhere(a) {
    document.getElementById("where").value = a;
    document.getElementById("whereContainer").style.display = "none";
    document.getElementById("what").focus();
    setCookieRevGeoLoc("revGeoLocality", a, 10)
}

function setCookieRevGeoLoc(b, f, c) {
    var e = new Date();
    e.setTime(e.getTime() + (c * 60 * 1000));
    var a = "expires=" + e.toUTCString();
    document.cookie = b + "=" + f + "; " + a + ";path=/"
}

function setCookie(b, f, c) {
    var e = new Date();
    e.setTime(e.getTime() + (c * 60 * 1000));
    var a = "expires=" + e.toUTCString();
    document.cookie = b + "=" + f + "; " + a + ";path=/"
}

function initQueryLocHit(e, g, c) {
    var a = [];
    var b = 1;
    var f = document.getElementById(g).value.toLowerCase();
    if (f.length >= b) {
        if (f != "" && f != " ") {
            for (var d = 0; d < loc.length; d++) {
                if (loc[d].toLowerCase().indexOf(f) == 0) {
                    a.push(loc[d])
                }
            }
        }
        if (a.length > 0) {
            createLocDivBox(a, e, g, c)
        }
    } else {
        document.getElementById(c).style.display = "none"
    }
}

function createLocDivBox(g, c, h, e) {
    var d = 0;
    if (g.length > 10) {
        d = 10
    } else {
        d = g.length
    }
    if (c != 38 && c != 40 && c != 13) {
        keyCounterLoc = 0;
        var a = "";
        document.getElementById(e).style.display = "block";
        document.getElementById(e).classList.add("ac-container");
        for (var f = 0; f < d; f++) {
            if (h == "businessReqLocality") {
                var b = '<li name="liWhere" id="l' + f + '" data-value="' + g[f] + "\" onclick=\"loadInLoc(this.dataset.value,'businessReqLocality','locContainer')\">" + g[f] + "</li>"
            } else {
                if (h == "localityInput") {
                    var b = '<li name="liWhere" id="l' + f + '" data-value="' + g[f] + "\" onclick=\"loadInLoc(this.dataset.value,'localityInput','localityContainer')\">" + g[f] + "</li>"
                } else {
                    if (h == "staticlcf_businessReqLocality") {
                        var b = '<li name="liWhere" id="l' + f + '" data-value="' + g[f] + "\" onclick=\"loadInLoc(this.dataset.value,'staticlcf_businessReqLocality','staticlcf_locContainer')\">" + g[f] + "</li>"
                    } else {
                        if (h == "b_businessReqLocality") {
                            var b = '<li name="liWhere" id="l' + f + '" data-value="' + g[f] + "\" onclick=\"loadInLoc(this.dataset.value,'b_businessReqLocality','b_locContainer')\">" + g[f] + "</li>"
                        }
                    }
                }
            }
            a = a.concat(b)
        }
        if (a != "") {
            document.getElementById(e).innerHTML = '<div class="ac-content"><div class="ac-bd" id="ac-bd"><ul>' + a + "</ul></div></div>"
        } else {
            if (a == "") {
                document.getElementById(e).style.display = "none"
            }
        }
    }
}

function loadInLoc(a, c, b) {
    document.getElementById(c).value = a;
    document.getElementById(b).style.display = "none"
}

function fbSideButtonIE6() {
    var c = navigator.appName;
    var b = navigator.appVersion;
    var e = document.documentElement.clientWidth;
    var f = document.documentElement.clientHeight;
    var a = 900;
    var d = (e - parseInt(a)) / 2;
    if (b.search("MSIE 6") != -1) {
        document.getElementById("sideBarFBButton").style.right = "-" + d + "px";
        document.getElementById("sideBarFBButton").style.top = f * 0.4 + "px";
        document.getElementById("sideBarFBContent").style.right = "-" + d + "px";
        document.getElementById("sideBarFBContent").style.top = f * 0.3 + "px"
    }
}
var gl_loc_search_example = null;

function setLocalitySearchQueryExample() {
    if (loc) {
        if (loc.length > 0) {
            gl_loc_search_example = loc[Math.floor(Math.random() * (loc.length - 1))]
        }
    }
    var a = document.getElementById("where");
    if (a.placeholder.trim() == "" || a.placeholder.indexOf("e.g.") != -1 || a.placeholder.indexOf("where in") != -1 || a.placeholder.indexOf("Where in") != -1) {
        a.placeholder = "Location e.g. " + gl_loc_search_example
    }
}

function hideMeShowOther(a, b) {
    document.getElementById(a).style.display = "none";
    document.getElementById(b).style.display = "inline";
    return false
}

function hideFbFanBox() {
    document.getElementById("sideBarFBContent").style.display = "none";
    document.getElementById("sideBarFBButton").style.display = "block";
    setSldCookie("fbFanBox", "1", "")
}

function displayFbFanBoxClick() {
    document.getElementById("sideBarFBContent").style.display = "";
    document.getElementById("sideBarFBButton").style.display = "none";
    setSldCookie("fbFanBox", "0", "")
}

function hideAllSubMenus() {
    var b = document.getElementById("menuTab");
    var a = b.getElementsByTagName("li");
    for (i = 0; i < a.length; i++) {
        if (document.getElementById(a[i].id.replace("menuTab", "sub_menu"))) {
            document.getElementById(a[i].id.replace("menuTab", "sub_menu")).className = "hide"
        }
    }
}

function showSubMenu(b) {
    var a = document.getElementById("hdnMenuTabId").value;
    if (document.getElementById(b)) {
        hideAllSubMenus();
        document.getElementById(b).className = "show"
    }
}

function highlightTabMenu(f) {
    var b = document.getElementById("hdnMenuTabId");
    var a = -1;
    if (b) {
        a = b.value
    }
    var e = document.getElementById(f);
    if (e) {
        e.className = "focusSR"
    }
    for (var d = 0; d < 15; d++) {
        var c = "menuTab_" + d;
        if (document.getElementById(c)) {
            if (c != a && c != f) {
                dehighlightTabMenu(c)
            }
        }
    }
}

function dehighlightTabMenu(d) {
    var b = document.getElementById("hdnMenuTabId");
    var a = -1;
    if (b) {
        a = b.value
    }
    var c = document.getElementById(d);
    if (c && d != a) {
        c.className = ""
    }
}

function selectTabMenu(d) {
    var a = document.getElementById("hdnMenuTabId");
    var b = document.getElementById(d);
    if (b) {
        b.className = "focusSR";
        a.value = d;
        var c = d.replace("menuTab_", "sub_menu_");
        showSubMenu(c)
    }
}

function hideTabbedMenu() {
    hideSubMenu()
}

function blockerLCFDivHide(e) {
    if (e != null && e != undefined) {
        e.style.display = "none"
    } else {
        e = document.getElementById("blockerLCFCloseButton");
        if (e != null) {
            e.style.display = "none"
        }
    }
    var a = document.getElementById("blockerLCFMask");
    if (a != null && a != undefined) {
        a.style.display = "none";
        var d = document.getElementById("isBlocker");
        if (d) {
            d.value = "0"
        }
    }
    var c = document.getElementById("lcfFormMsgDiv");
    if (c) {
        c.style.zIndex = ""
    }
    var b = document.getElementById("lcfFormDiv");
    if (b) {
        b.style.zIndex = ""
    }
}

function getCurrentWindowHeightWidth() {
    var a, b;
    if (self.innerHeight) {
        a = self.innerWidth;
        b = self.innerHeight
    } else {
        if (document.documentElement && document.documentElement.clientHeight) {
            a = document.documentElement.clientWidth;
            b = document.documentElement.clientHeight
        } else {
            if (document.body) {
                a = document.body.clientWidth;
                b = document.body.clientHeight
            }
        }
    }
    return {
        width: a,
        height: b
    }
}

function setMaskHeightAndWidth(a) {
    var c = getCurrentWindowHeightWidth();
    a.style.width = "100%";
    if (c != null && c.width != null) {
        if (c.width < 900) {
            a.style.width = "1300px"
        }
    }
    var b = document.getElementById("ALwrapper");
    if (b) {
        a.style.height = b.offsetHeight + "px"
    } else {
        a.style.height = "1500px"
    }
}

function blockerLCFDivShow(f) {
    if (readCookieGen("blkr" + f) != null) {
        return
    }
    var b = document.getElementById("blockerLCFCloseButton");
    if (b) {
        b.style.display = ""
    }
    var a = document.getElementById("blockerLCFMask");
    if (a) {
        a.style.display = "";
        var e = document.getElementById("isBlocker");
        if (e) {
            e.value = "1"
        }
    }
    setMaskHeightAndWidth(a);
    var d = document.getElementById("lcfFormMsgDiv");
    if (d) {
        d.style.zIndex = 1000
    }
    var c = document.getElementById("lcfFormDiv");
    if (c) {
        c.style.zIndex = 1000
    }
    if (document.getElementById("businessReqName")) {
        document.getElementById("businessReqName").focus()
    }
    if (f != "") {
        setSldCookie("blkr" + f, "1", "")
    }
}

function home_setActiveSubMenu(e, d) {
    var c = document.getElementById("tab" + e + "_submenu" + d);
    var b = document.getElementById("tab" + e + "_submenu_cnt" + d);
    var a = 1;
    while (a < 10) {
        if (document.getElementById("tab" + e + "_submenu" + a)) {
            document.getElementById("tab" + e + "_submenu" + a).className = ""
        }
        if (document.getElementById("tab" + e + "_submenu_cnt" + a)) {
            if (b) {
                document.getElementById("tab" + e + "_submenu_cnt" + a).style.display = "none"
            }
        }
        a++
    }
    if (c) {
        c.className = "activeHmSubTab";
        if (b) {
            b.style.display = ""
        }
    }
}

function CitySelectionActiveCity(a) {
    var b = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
    for (i = 0; i < 26; i++) {
        if (document.getElementById(b[i])) {
            document.getElementById(b[i]).style.color = "#666";
            document.getElementById(b[i]).style.backgroundColor = "#ced3e5"
        }
    }
    document.getElementById(a).style.backgroundColor = "#c00";
    document.getElementById(a).style.color = "#fff"
}

function selectLcfAttribute(b) {
    var a = document.getElementById(b);
    if (a.type == "radio") {
        a.checked = true
    } else {
        if (a.type == "checkbox") {
            if (a.checked) {
                a.checked = false
            } else {
                a.checked = true
            }
        }
    }
}

function replaceUrl(b, a) {
    a.setAttribute("href", b)
}

function toggleShowHideMerchantProducts(a, c) {
    var b = new Array("DivWebsite", "DivAdvertorial", "DivLeadGeneration", "DivMobile", "DivMultimedia", "DivPhoneService", "DivSpotlight", "DivWeb");
    for (i = 0; i < b.length; i++) {
        document.getElementById(b[i]).style.display = "none";
        if (b[i] == a) {
            document.getElementById(a).style.display = "block"
        }
        if (document.getElementById("submnu" + i)) {
            document.getElementById("submnu" + i).className = ""
        }
    }
    document.getElementById(c).className = "currentSub"
}
var inlineSRPFormId = "";
var srpInLineFormIdPrefix = "InlineForm";
var srpInlineDivIdPrefix = "ListItem";

function showSRPInlineContactForm(f, d) {
    if (f == inlineSRPFormId) {
        return
    }
    if (document.getElementById(srpInLineFormIdPrefix + inlineSRPFormId)) {
        hideInlineForm(inlineSRPFormId)
    }
    inlineSRPFormId = f;
    document.getElementById(srpInlineDivIdPrefix + f).style.background = "#efefef";
    if (document.getElementById(srpInLineFormIdPrefix + f)) {
        var c = document.getElementById(srpInLineFormIdPrefix + f);
        c.style.display = "";
        if (c.hasChildNodes()) {
            while (c.childNodes.length >= 1) {
                var e = c.firstChild;
                c.removeChild(e)
            }
        }
        var b = document.getElementById("inline_contactMeContainer");
        c.appendChild(b);
        var a = createInlineResponseDiv(f);
        c.insertBefore(b, a);
        if (document.getElementById("inline_relatedListingId")) {
            document.getElementById("inline_relatedListingId").value = f
        }
        if (document.getElementById("inline_businessReqLocality")) {
            document.getElementById("inline_businessReqLocality").value = d
        }
        if (document.getElementById("inline_contactMeDiv")) {
            document.getElementById("inline_contactMeDiv").style.display = ""
        }
    }
}

function hideInlineForm(e) {
    if (e == null) {
        e = inlineSRPFormId
    }
    var b = document.getElementById(srpInLineFormIdPrefix + e);
    if (b && b.hasChildNodes()) {
        var a = document.getElementById("inline_contactMeContainer");
        if (a) {
            var d = document.getElementById("inlineFormSection");
            if (d) {
                d.appendChild(a)
            }
        }
        while (b.childNodes.length >= 1) {
            var c = b.firstChild;
            b.removeChild(c)
        }
    }
    if (document.getElementById(srpInlineDivIdPrefix + e)) {
        document.getElementById(srpInlineDivIdPrefix + e).style.background = "#fff"
    }
    if (e == inlineSRPFormId) {
        inlineSRPFormId = ""
    }
}

function createInlineResponseDiv(c) {
    if (c == null) {
        c = inlineSRPFormId
    }
    var b = document.getElementById(srpInLineFormIdPrefix + c);
    var a = document.createElement("div");
    a.setAttribute("id", "inline_contactMeResponse" + c);
    a.setAttribute("class", "contactMeResponse");
    b.appendChild(a);
    return a
}

function getResponseDivForLCF(b) {
    var a = b + "contactMeResponse";
    if (b == "inline_") {
        a = a + inlineSRPFormId
    }
    return document.getElementById(a)
}

function SRPListItemMouseOut(a) {
    if (inlineSRPFormId == a) {
        document.getElementById("ListItem" + a).style.background = "#efefef"
    } else {
        document.getElementById("ListItem" + a).style.background = "#fff"
    }
}

function compareListings(d) {
    var a = getContextPath() + "/ajx/getListingCompareUrl?ids=" + d;
    var c = function(f) {
        if (f && f.length > 0) {
            self.location.href = f
        } else {
            var e = "/-lcmp-" + d;
            self.location.href = e
        }
    };
    var b = function(f) {
        var e = "/-lcmp-" + d;
        self.location.href = a
    };
    $.ajax({
        type: "GET",
        url: a,
        success: c,
        failure: b
    })
}

function compareSelected(e) {
    var c = 0;
    var b = 0;
    var a = "";
    while (document.getElementById(e + c)) {
        var d = document.getElementById(e + c);
        if (d.checked == true) {
            b++;
            if (b != 1) {
                a += "-"
            }
            a += d.value
        }
        c++
    }
    if (b > 1 && b < 4) {
        compareListings(a)
    } else {
        if (b <= 1) {
            alert("You need to select atleast 2 listings to compare")
        } else {
            alert("You can only select a maximum of 3 listings to compare at a time")
        }
    }
    return false
}

function ru(c) {
    var b = c;
    if (c.indexOf("?") == -1) {
        b = b + "?"
    } else {
        b = b + "&"
    }
    var a = window.location.href;
    if (a.indexOf("#") != -1) {
        a = a.substring(0, a.indexOf("#"))
    }
    b = b + "ru=" + encodeURIComponent(a);
    window.location.href = b;
    return false
}
var openid = function() {
    this.login = function(c) {
        var a = window.location.href;
        if (a.indexOf("#") != -1) {
            a = a.substring(0, a.indexOf("#"))
        }
        if (a.indexOf("loginpage") != -1 || a.indexOf("forgetpswd") != -1) {
            a = "https://" + getFullURLServerName()
        }
        var b = "/openid/login/" + c + "/?jump=" + encodeURIComponent(a);
        b = "https://" + getFullURLServerName() + b;
        window.location.href = b
    }
};

function login2(b) {
    var a = new openid();
    a.login(b)
}

function reportWebError(f, g) {
    var d = "Thank you!";
    var b = getContextPath() + "/ajx/weberror?status=" + f + "&url=" + encodeURIComponent(g);
    var c = Math.floor(new Date().getTime());
    b = b + "&r=" + c;
    var a = document.getElementById("web_error_div");
    var e = function(h) {
        if (a != null || a != undefined) {
            a.innerHTML = d
        } else {
            alert(d)
        }
    };
    if (a != null || a != undefined) {
        a.innerHTML = "Processing........."
    }
    $.ajax({
        type: "GET",
        url: b,
        success: e,
        failure: e
    })
}
Array.prototype.contains = function(b) {
    for (var a = 0; a < this.length; a++) {
        if (this[a].toUpperCase() == b.toUpperCase()) {
            return true
        }
    }
    return false
};

function selectCityDropDown(a) {
    var c = document.citySForm;
    var b = c.promoCity.value.trim();
    if (b == "") {
        document.getElementById("citySearchError").innerHTML = "Please enter city";
        return false
    }
    if (!cities.contains(b)) {
        document.getElementById("citySearchError").innerHTML = "Please select city from drop down and press enter";
        return false
    }
    b = b.split(",")[0];
    selectIntCity(b, a);
    return false
}

function hideMeShowOther(b, a) {
    document.getElementById(b).style.display = "none";
    document.getElementById(a).style.display = "block"
}

function stopRKey(c, a) {
    var b = a.keyCode ? a.keyCode : a.which ? a.which : a.charCode;
    if (b == 13) {
        return false
    } else {
        return true
    }
}

function validatePaymentForm(b, a, e, c) {
    if (!isFieldEmpty(b) & !isEmailIdValid(b)) {
        alert("Please enter a valid email address.");
        return false
    }
    if (isFieldEmpty(a)) {
        alert("Mobile number is empty. Please enter the number.");
        return false
    }
    if (!isFieldEmpty(a) & !isValueInteger(a.value)) {
        alert("enter the valid mobile number");
        return false
    }
    if (!isFieldEmpty(e) & !isValueInteger(e.value)) {
        alert("enter the valid postal code");
        return false
    }
    if (isFieldEmpty(c)) {
        var d = "Please enter the amount";
        alert(d);
        c.focus();
        return false
    }
    if (!isValueInteger(c.value)) {
        alert("enter the valid amount");
        return flase
    }
    return true
}

function isFieldEmpty(a) {
    if (a.value.trim().length == 0) {
        return true
    }
    return false
}

function isEmailIdValid(b) {
    var a = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (b.value.search(a) == -1) {
        return false
    }
    return true
}

function isValueInteger(b) {
    var a = /^\d+$/;
    return a.test(b)
}

function getPaymentGatewayTransactionId() {
    var email = document.getElementById("email");
    var mobileNo = document.getElementById("mno");
    var pcode = document.getElementById("pcode");
    var amount = document.getElementById("amount");
    var listingid = document.getElementById("Listing_Id");
    var isValid = validatePaymentForm(email, mobileNo, pcode, amount);
    if (isValid == false) {
        return false
    }
    xmlhttp = createXHR();
    try {
        if (xmlhttp == null) {
            return
        }
        var url = window.location.protocol + "//" + window.location.host + "/ccavenue/ccavenuetransaction/";
        var params = "amount=" + amount.value + "&id=" + listingid.value;
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.setRequestHeader("Content-length", url.length);
        xmlhttp.setRequestHeader("Connection", "close");
        xmlhttp.send(params);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var text = xmlhttp.responseText;
                if (text == "failure") {
                    form.status.value = "Could not get orderid!"
                } else {
                    var resp = eval("(" + text + ")");
                    if (resp.Amount == "0" || resp.Amount == "0.0") {
                        xmlhttp2 = createXHR();
                        try {
                            if (xmlhttp2 == null) {
                                return
                            }
                            var url = resp.Redirect_Url;
                            var params = "Order_Id=" + resp.Order_Id + "&Merchant_Id=" + resp.MerchantId + "&billing_cust_email=" + emailId + "&AuthDesc=Y&Checksum=true&Amount=0&nb_order_no=EMPTY&internalCall=true";
                            if (isdebug) {
                                alert(url + params)
                            }
                            window.location.href = url + "?" + params
                        } catch (err) {
                            alert(err)
                        }
                    } else {
                        document.getElementsByName("Merchant_Id")[0].value = resp.MerchantId;
                        document.getElementsByName("Amount")[0].value = resp.Amount;
                        document.getElementsByName("Order_Id")[0].value = resp.Order_Id;
                        document.getElementsByName("Redirect_Url")[0].value = resp.Redirect_Url;
                        document.getElementsByName("Checksum")[0].value = resp.CheckSum;
                        document.getElementsByName("billing_cust_name")[0].value = document.getElementById("name").value;
                        document.getElementsByName("billing_cust_state")[0].value = document.getElementById("state").value;
                        document.getElementsByName("billing_zip_code")[0].value = document.getElementById("pcode").value;
                        document.getElementsByName("billing_cust_tel")[0].value = document.getElementById("mno").value;
                        document.getElementsByName("billing_cust_email")[0].value = document.getElementById("email").value;
                        document.getElementsByName("billing_cust_address")[0].value = document.getElementById("address").value;
                        document.getElementsByName("billing_cust_city")[0].value = document.getElementById("city").value;
                        document.getElementById("dealtranfrm").submit()
                    }
                }
            }
        }
    } catch (err) {
        alert(err)
    }
    return false
}

function getListings() {
    var lname = document.getElementById("lname");
    var city = document.getElementById("cityac");
    var ydiv = document.getElementById("listings");
    if (isFieldEmpty(city)) {
        alert("City is empty. Please enter the City");
        return false
    }
    if (isFieldEmpty(lname)) {
        alert("Listing name is empty. Please enter the listing");
        return false
    }
    show_loading_sign(ydiv);
    xmlhttp = createXHR();
    try {
        if (xmlhttp == null) {
            return
        }
        var url = window.location.protocol + "//" + window.location.host + "/subscriptions/listingnames/";
        var regurl = window.location.protocol + "//" + window.location.host;
        var params = "lname=" + lname.value + "&city=" + city.value;
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.setRequestHeader("Content-length", url.length);
        xmlhttp.setRequestHeader("Connection", "close");
        xmlhttp.send(params);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var text = xmlhttp.responseText;
                if (text == "failure") {
                    form.status.value = "Could not get orderid!"
                } else {
                    var resp = eval("(" + text + ")");
                    var temp = "";
                    if ("result" in resp) {
                        var listinginfoarray = resp.result;
                        if (listinginfoarray.length > 0) {
                            temp += "<div id='divTable'><div class='divTableHeaders'><div class='divTableCell'>Listing Name</div> <div class='divTableCell'>Locality</div><div class='divTableCell'>Own the Listing</div><div class='divTableCell'>Wrong OwnerShip</div></div>";
                            for (var i = 0; i < listinginfoarray.length; i++) {
                                temp += "<div class='divTableRow'>";
                                var lname = listinginfoarray[i].lname;
                                var randomId = listinginfoarray[i].random_id;
                                var locality = listinginfoarray[i].locality;
                                var lowned = listinginfoarray[i].lowned;
                                temp += "<div class='divTableCell'>" + lname + "</div>";
                                temp += "<div class='divTableCell'>" + locality + "</div>";
                                if (lowned == "true") {
                                    temp += "<div class='divTableCell'>&nbsp;</div>";
                                    temp += "<div class='divTableCell'><a href=\"javascript:void(0)\" rel='nofollow' onclick = \"getModalContent(wrongOwnerModalShow,'wrongOwnership.jsp','wrongOwnerDlg',new Array('" + randomId + "'))\">Report</a></div>"
                                } else {
                                    temp += "<div class='divTableCell'><a href='" + regurl + "/ms/registerandown/" + randomId + "/'>Click Here</a></div>";
                                    temp += "<div class='divTableCell'>&nbsp;</div>"
                                }
                                temp += "</div>"
                            }
                            temp += "</div>"
                        } else {
                            temp = ""
                        }
                    }
                    document.getElementById("listings").innerHTML = temp
                }
            }
        }
    } catch (err) {
        alert(err)
    }
    return false
}

function trackConversion() {
    var a = "city=" + al_gl_city + "&page_type=" + al_gl_pageType + "&cat_id=" + al_gl_categoryId + "&keyword=" + al_gl_keyword;
    a = a + "&where=" + al_gl_locality;
    if (al_gl_pageType == "LISTING_DETAIL") {
        a = a + "&listingId=" + listingHashId
    }
    ifrm = document.createElement("IFRAME");
    ifrm.setAttribute("src", window.location.protocol + "//" + window.location.host + "/track/conversion?convValue=" + encodeURIComponent(a));
    ifrm.style.width = "1px";
    ifrm.style.height = "1px";
    ifrm.id = "google_tracker";
    document.body.appendChild(ifrm)
}

function toggle_listname_block() {
    var c = document.getElementById("listsubyescheckbox");
    var b = document.getElementById("noradiocheckbox");
    var a = window.location.protocol + "//" + window.location.host + "/Bangalore/addlisting";
    if (c.checked) {
        document.getElementById("listsubarea").style.display = "block"
    } else {
        if (b.checked) {
            document.getElementById("listsubarea").style.display = "none";
            window.location.href = a
        }
    }
}

function show_loading_sign(b) {
    var a = "<div id='loader' style='line-height: 115px; text-align: center;'><img alt='activity indicator' src='/webres/img/ajax-loader.gif'></div>";
    b.innerHTML = a
}

function pingAlexaServers(f) {
    var c = readCookieGen("aid");
    var a = isSupportedBrowser();
    if (c != null && a) {
        try {
            var b = String(Math.floor(Math.random() * 1000000000000000)) + String((new Date).getTime());
            var g = Math.floor(Math.random() * 100001);
            var d = "https://data.alexa.com/data/" + c + "?cli=10&ver=alxf-2.18&dat=ns&cdt=rq%3D0%26wid%3D" + g + "%26t%3D0%26ss%3D" + encodeURIComponent(screen.width + "x" + screen.height) + "%26bw%3D" + encodeURIComponent(window.outerWidth) + "%26winid%3D" + b + "%26s%3D200%26m%3DGET&ref=&url=" + encodeURIComponent(f);
            ifrm = document.createElement("IFRAME");
            ifrm.setAttribute("src", d);
            ifrm.style.width = "1px";
            ifrm.style.height = "1px";
            ifrm.id = "alexa_tracker";
            document.body.appendChild(ifrm)
        } catch (e) {}
    }
}

function isSupportedBrowser() {
    var a = navigator.userAgent.toLowerCase();
    if (YAHOO.env.ua.gecko > 0) {
        return true
    } else {
        if (YAHOO.env.ua.ie > 0) {
            return true
        } else {
            return false
        }
    }
}

function shareOnFacebook(a) {
    var b = "https://www.facebook.com/sharer.php?app_id=178317605922&u=" + encodeURIComponent(a);
    window.open(b, "_blank", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes");
    return false
}

function shareOnGoogle(a) {
    var b = "https://plus.google.com/share?url=" + encodeURIComponent(a);
    window.open(b, "_blank", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes");
    return false
}

function shareOnTwitter(a, c) {
    var b = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(a) + "&text=" + encodeURIComponent(c) + "&via=asklaila";
    window.open(b, "_blank", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes");
    return false
}

function googleLogout() {
    gapi.auth.signOut();
    location.reload()
}

function googleLogin() {
    var a = {
        clientid: "986369440248-tu4lnd7sdfppgou1nl52epn8b9s6p1oh.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        callback: "loginCallback",
        requestvisibleactions: "http://schema.org/AddAction",
        scope: "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read"
    };
    gapi.auth.signIn(a)
}

function loginCallback(a) {
    if (a.status["signed_in"]) {
        var b = gapi.client.plus.people.get({
            userId: "me"
        });
        b.execute(function(f) {
            var d = "";
            if (f.emails) {
                for (i = 0; i < f.emails.length; i++) {
                    if (f.emails[i]["type"] == "account") {
                        d = f.emails[i]["value"]
                    }
                }
            }
            var c = {
                logintypeG: "GOOGLE",
                emailIDG: d,
                fullnameG: f.displayName,
                firstnameG: f.name["givenName"],
                lastnameG: f.name["familyName"],
                genderG: f.gender,
                profilepictureG: f.image["url"],
                idG: f.id
            };
            var e = $.ajax({
                url: "/openid/response/",
                data: c,
                type: "POST"
            }).done(function(h, k, g) {}).always(function(g, k, h) {
                location.reload()
            })
        })
    }
}

function onLoadCallback() {
    gapi.client.load("plus", "v1", function() {})
}(function() {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.src = "https://apis.google.com/js/client.js?onload=onLoadCallback";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b)
})();

function ShowCityMenu(a) {
    document.getElementById(a).style.visibility = "Visible"
}

function HideCityMenu(a) {
    document.getElementById(a).style.visibility = "Hidden"
}

function MenuCitySelect(a) {
    document.getElementById(a).style.backgroundColor = "#bec3e3";
    document.getElementById("spn_" + a).className = "list_hvr"
}

function MenuCityDeselect(a) {
    document.getElementById(a).style.backgroundColor = "#e4e7f6";
    document.getElementById("spn_" + a).className = "list_nor"
}

function fixListing(a) {
    document.getElementById("fixHashId").value = a;
    document.getElementById("fixListingDlgForm").style.display = "block";
    document.getElementById("resultFixListing").style.display = "none";
    document.getElementById("resultFixListingCD").style.display = "none"
}
var fixLTimer = 3;

function fixLTimerCountDown() {
    if (fixLTimer > 0) {
        var a = document.getElementById("resultFixListingCD");
        a.style.display = "";
        a.innerHTML = "This message will self destruct in " + fixLTimer + " seconds";
        fixLTimer = fixLTimer - 1;
        var b = window.setTimeout("fixLTimerCountDown()", 1000)
    } else {
        $("#modalFixListing").modal("hide");
        fixLTimer = 3
    }
}

function fixLCheck() {
    var a = document.getElementById("fixListingContents").value;
    if (a.length <= 0) {
        return false
    }
    var b = $("#fixListingDlgForm");
    $.ajax({
        type: b.attr("method"),
        url: b.attr("action"),
        data: b.serialize(),
        success: function(d) {
            document.getElementById("fixListingDlgForm").style.display = "none";
            if (d.indexOf("Success") != -1) {
                document.fixListingDlgForm.reset();
                var c = document.getElementById("resultFixListing");
                c.style.display = "";
                c.innerHTML = "Thank you for reporting. We will try to fix the issue ASAP.";
                fixLTimerCountDown()
            }
        },
        failure: function(c) {
            alert(c)
        }
    })
}
browser_version = parseInt(navigator.appVersion);
browser_type = navigator.appName;
var childNodeIndex = 0;
if (browser_type == "Microsoft Internet Explorer" && (browser_version >= 4)) {
    childNodeIndex = 0
} else {
    if (browser_type == "Netscape" && (browser_version >= 4)) {
        childNodeIndex = 1
    }
}

function hoverOn(a) {
    a.childNodes[childNodeIndex].style.backgroundImage = "url('/webres/img/utl.png')"
}

function hoverOff(a) {
    a.childNodes[childNodeIndex].style.backgroundImage = "url('/webres/img/utl_dull.png')"
}

function highlgtOn(a) {
    document.getElementById(a).className = "commentUserProfiles"
}

function highlgtOff(a) {
    document.getElementById(a).className = "commentUserProfile"
}

function regHere() {
    document.getElementById("logEmail").style.display = "none";
    document.getElementById("logPass").style.display = "none";
    document.getElementById("regMobile").style.display = "";
    document.getElementById("loginHere").style.display = "";
    document.getElementById("btnRegister").style.display = "";
    document.getElementById("logRemember").style.display = "none";
    document.getElementById("regHere").style.display = "none";
    document.getElementById("loginRes").style.display = "none";
    document.getElementById("forgetPass").style.display = "none";
    document.getElementById("modaltitleLogin").style.display = "none";
    document.getElementById("modaltitleRegis").style.display = "";
    document.getElementById("modaltitleForget").style.display = "none";
    document.getElementById("errdiv").style.display = "none";
    document.getElementById("successdiv").style.display = "none"
}

function loginHere() {
    document.getElementById("logEmail").style.display = "";
    document.getElementById("logPass").style.display = "";
    document.getElementById("logRemember").style.display = "";
    document.getElementById("regHere").style.display = "";
    document.getElementById("loginRes").style.display = "";
    document.getElementById("forgetPass").style.display = "";
    document.getElementById("regMobile").style.display = "none";
    document.getElementById("loginHere").style.display = "none";
    document.getElementById("btnRegister").style.display = "none";
    document.getElementById("modaltitleLogin").style.display = "";
    document.getElementById("modaltitleRegis").style.display = "none";
    document.getElementById("modaltitleForget").style.display = "none";
    document.getElementById("errdiv").style.display = "none";
    document.getElementById("successdiv").style.display = "none"
}

function backToLogin() {
    document.getElementById("logEmail").style.display = "";
    document.getElementById("logPass").style.display = "";
    document.getElementById("logRemember").style.display = "";
    document.getElementById("regHere").style.display = "";
    document.getElementById("loginRes").style.display = "";
    document.getElementById("forgetPass").style.display = "";
    document.getElementById("regMobile").style.display = "none";
    document.getElementById("loginHere").style.display = "none";
    document.getElementById("btnRegister").style.display = "none";
    document.getElementById("backToLogin").style.display = "none";
    document.getElementById("forgotPassView").style.display = "none";
    document.getElementById("modaltitleLogin").style.display = "";
    document.getElementById("modaltitleRegis").style.display = "none";
    document.getElementById("modaltitleForget").style.display = "none";
    document.getElementById("errdiv").style.display = "none";
    document.getElementById("successdiv").style.display = "none"
}

function forgetPass() {
    document.getElementById("logEmail").style.display = "none";
    document.getElementById("logPass").style.display = "none";
    document.getElementById("logRemember").style.display = "none";
    document.getElementById("regHere").style.display = "none";
    document.getElementById("loginRes").style.display = "none";
    document.getElementById("forgetPass").style.display = "none";
    document.getElementById("regMobile").style.display = "none";
    document.getElementById("loginHere").style.display = "none";
    document.getElementById("btnRegister").style.display = "none";
    document.getElementById("backToLogin").style.display = "";
    document.getElementById("forgotPassView").style.display = "";
    document.getElementById("modaltitleLogin").style.display = "none";
    document.getElementById("modaltitleRegis").style.display = "none";
    document.getElementById("modaltitleForget").style.display = "";
    document.getElementById("errdiv").style.display = "none";
    document.getElementById("successdiv").style.display = "none"
}

function validateSubmitPwdResetForm() {
    var c = document.getElementById("PwdResetEmail");
    var a = document.getElementById("errdiv");
    a.style.display = "block";
    if (c.value.trim().length > 0) {
        if (!isValidEmail(c.value)) {
            $("#forgotp").button("reset");
            a.innerHTML = "Invalid Email Id";
            c.focus();
            return false
        }
    } else {
        $("#forgotp").button("reset");
        a.innerHTML = "Please enter email id";
        c.focus();
        return false
    }
    a.style.display = "none";
    $("#forgotp").button("loading");
    var b = $("#forgetPwdForm");
    $.ajax({
        type: b.attr("method"),
        url: b.attr("action"),
        data: b.serialize(),
        success: function(d) {
            parseResp(d)
        },
        failure: function(d) {}
    })
}

function isValidPhoneNo(a) {
    if (a.value.trim().length == 10) {
        return true
    }
    return false
}

function validateSubmitLoginForm() {
    var c = document.getElementById("loginEmail");
    var b = document.getElementById("loginPassword");
    var a = document.getElementById("errdiv");
    a.style.display = "block";
    if (emptyField(c)) {
        a.innerHTML = "Please enter email id";
        c.focus();
        return false
    }
    if (!isValidEmail(c.value)) {
        a.innerHTML = "Invalid email id";
        c.focus();
        return false
    }
    if (emptyField(b)) {
        a.innerHTML = "Please enter your correct password";
        b.focus();
        return false
    }
    if (document.getElementById("loginPassword").value != "<%=enpass.getValue()%>") {
        document.getElementById("pass").value = hex_md5(document.getElementById("loginPassword").value);
        document.getElementById("loginPassword").value = hex_md5(document.getElementById("loginPassword").value).substring(0, document.getElementById("loginPassword").value.length)
    }
    a.style.display = "none";
    var d = $("#loginForm");
    $.ajax({
        type: d.attr("method"),
        url: d.attr("action"),
        data: d.serialize(),
        success: function(e) {
            parseResp(e)
        },
        failure: function(e) {}
    })
}

function emptyField(a) {
    if (a.value.trim().length == 0) {
        return true
    }
    return false
}

function validateSubmitRegisterForm() {
    var f = document.getElementById("regemail").value;
    var d = document.getElementById("regpwd").value;
    var g = document.getElementById("regpwd2").value;
    var c = document.getElementById("regmob").value;
    var h = document.getElementById("regnm").value;
    var e = document.getElementById("agreeTnC").checked;
    var a = document.getElementById("errdiv");
    a.style.display = "block";
    if (f.trim().length == 0) {
        $("#btnRegister").button("reset");
        a.innerHTML = "Please enter your email id";
        return false
    }
    if (f.trim().length > 0) {
        if (!isValidEmail(f)) {
            $("#btnRegister").button("reset");
            a.innerHTML = "Invalid Email ID";
            return false
        }
    }
    if (d.trim().length == 0) {
        $("#btnRegister").button("reset");
        a.innerHTML = "Please enter a password";
        return false
    }
    if (g.trim().length == 0) {
        $("#btnRegister").button("reset");
        a.innerHTML = "Please enter the password again";
        return false
    }
    if (isNaN(c)) {
        $("#btnRegister").button("reset");
        a.innerHTML = "Mobile number not valid";
        return false
    }
    if (h.trim().length > 10) {
        $("#btnRegister").button("reset");
        a.innerHTML = "Please keep nick name less than 10 characters";
        return false
    }
    if (e == false) {
        $("#btnRegister").button("reset");
        a.innerHTML = "You have to accept the terms and conditions before you can register";
        return false
    }
    a.style.display = "none";
    $("#btnRegister").button("loading");
    var b = $("#userRegForm");
    $.ajax({
        type: b.attr("method"),
        url: b.attr("action"),
        data: b.serialize(),
        success: function(k) {
            parseResp(k)
        },
        failure: function(k) {}
    })
}

function getFullURLServerName() {
    return "<%=(String)request.getAttribute(Constants.CONST_SERVER_NAME_PORT)%>"
}

function parseResp(a) {
    var b = JSON.parse(a);
    if (b.statusSource != null && b.statusSource == "LOGIN") {
        if (b.statusType != null && b.statusType == "SUCCESS") {
            document.getElementById("successdiv").innerHTML = b.statusMessage;
            document.getElementById("successdiv").style.display = "block";
            if (b.statusSourceType != null && b.statusSourceType == "LOGIN_FORGETPWD") {
                $("#forgotp").button("reset");
                document.getElementById("forgotPassView").style.display = "none"
            } else {
                if (b.statusSourceType != null && b.statusSourceType == "LOGIN_REGISTER") {
                    $("#btnRegister").button("reset");
                    document.getElementById("regMobile").style.display = "none"
                }
            }
            if (b.statusSourceType != null && b.statusSourceType == "LOGIN_LOGIN") {
                location.reload()
            }
        } else {
            if (b.statusType != null && b.statusType == "ERROR") {
                if (b.statusSourceType != null && b.statusSourceType == "LOGIN_FORGETPWD") {
                    $("#forgotp").button("reset")
                } else {
                    if (b.statusSourceType != null && b.statusSourceType == "LOGIN_REGISTER") {
                        $("#btnRegister").button("reset")
                    }
                }
                document.getElementById("errdiv").innerHTML = b.statusMessage;
                document.getElementById("errdiv").style.display = "block"
            }
        }
    }
}
var hexcase = 0;
var b64pad = "";
var chrsz = 8;

function hex_md5(a) {
    return binl2hex(core_md5(str2binl(a), a.length * chrsz))
}

function b64_md5(a) {
    return binl2b64(core_md5(str2binl(a), a.length * chrsz))
}

function str_md5(a) {
    return binl2str(core_md5(str2binl(a), a.length * chrsz))
}

function hex_hmac_md5(a, b) {
    return binl2hex(core_hmac_md5(a, b))
}

function b64_hmac_md5(a, b) {
    return binl2b64(core_hmac_md5(a, b))
}

function str_hmac_md5(a, b) {
    return binl2str(core_hmac_md5(a, b))
}

function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72"
}

function core_md5(q, l) {
    q[l >> 5] |= 128 << ((l) % 32);
    q[(((l + 64) >>> 9) << 4) + 14] = l;
    var p = 1732584193;
    var o = -271733879;
    var n = -1732584194;
    var m = 271733878;
    for (var g = 0; g < q.length; g += 16) {
        var k = p;
        var h = o;
        var f = n;
        var e = m;
        p = md5_ff(p, o, n, m, q[g + 0], 7, -680876936);
        m = md5_ff(m, p, o, n, q[g + 1], 12, -389564586);
        n = md5_ff(n, m, p, o, q[g + 2], 17, 606105819);
        o = md5_ff(o, n, m, p, q[g + 3], 22, -1044525330);
        p = md5_ff(p, o, n, m, q[g + 4], 7, -176418897);
        m = md5_ff(m, p, o, n, q[g + 5], 12, 1200080426);
        n = md5_ff(n, m, p, o, q[g + 6], 17, -1473231341);
        o = md5_ff(o, n, m, p, q[g + 7], 22, -45705983);
        p = md5_ff(p, o, n, m, q[g + 8], 7, 1770035416);
        m = md5_ff(m, p, o, n, q[g + 9], 12, -1958414417);
        n = md5_ff(n, m, p, o, q[g + 10], 17, -42063);
        o = md5_ff(o, n, m, p, q[g + 11], 22, -1990404162);
        p = md5_ff(p, o, n, m, q[g + 12], 7, 1804603682);
        m = md5_ff(m, p, o, n, q[g + 13], 12, -40341101);
        n = md5_ff(n, m, p, o, q[g + 14], 17, -1502002290);
        o = md5_ff(o, n, m, p, q[g + 15], 22, 1236535329);
        p = md5_gg(p, o, n, m, q[g + 1], 5, -165796510);
        m = md5_gg(m, p, o, n, q[g + 6], 9, -1069501632);
        n = md5_gg(n, m, p, o, q[g + 11], 14, 643717713);
        o = md5_gg(o, n, m, p, q[g + 0], 20, -373897302);
        p = md5_gg(p, o, n, m, q[g + 5], 5, -701558691);
        m = md5_gg(m, p, o, n, q[g + 10], 9, 38016083);
        n = md5_gg(n, m, p, o, q[g + 15], 14, -660478335);
        o = md5_gg(o, n, m, p, q[g + 4], 20, -405537848);
        p = md5_gg(p, o, n, m, q[g + 9], 5, 568446438);
        m = md5_gg(m, p, o, n, q[g + 14], 9, -1019803690);
        n = md5_gg(n, m, p, o, q[g + 3], 14, -187363961);
        o = md5_gg(o, n, m, p, q[g + 8], 20, 1163531501);
        p = md5_gg(p, o, n, m, q[g + 13], 5, -1444681467);
        m = md5_gg(m, p, o, n, q[g + 2], 9, -51403784);
        n = md5_gg(n, m, p, o, q[g + 7], 14, 1735328473);
        o = md5_gg(o, n, m, p, q[g + 12], 20, -1926607734);
        p = md5_hh(p, o, n, m, q[g + 5], 4, -378558);
        m = md5_hh(m, p, o, n, q[g + 8], 11, -2022574463);
        n = md5_hh(n, m, p, o, q[g + 11], 16, 1839030562);
        o = md5_hh(o, n, m, p, q[g + 14], 23, -35309556);
        p = md5_hh(p, o, n, m, q[g + 1], 4, -1530992060);
        m = md5_hh(m, p, o, n, q[g + 4], 11, 1272893353);
        n = md5_hh(n, m, p, o, q[g + 7], 16, -155497632);
        o = md5_hh(o, n, m, p, q[g + 10], 23, -1094730640);
        p = md5_hh(p, o, n, m, q[g + 13], 4, 681279174);
        m = md5_hh(m, p, o, n, q[g + 0], 11, -358537222);
        n = md5_hh(n, m, p, o, q[g + 3], 16, -722521979);
        o = md5_hh(o, n, m, p, q[g + 6], 23, 76029189);
        p = md5_hh(p, o, n, m, q[g + 9], 4, -640364487);
        m = md5_hh(m, p, o, n, q[g + 12], 11, -421815835);
        n = md5_hh(n, m, p, o, q[g + 15], 16, 530742520);
        o = md5_hh(o, n, m, p, q[g + 2], 23, -995338651);
        p = md5_ii(p, o, n, m, q[g + 0], 6, -198630844);
        m = md5_ii(m, p, o, n, q[g + 7], 10, 1126891415);
        n = md5_ii(n, m, p, o, q[g + 14], 15, -1416354905);
        o = md5_ii(o, n, m, p, q[g + 5], 21, -57434055);
        p = md5_ii(p, o, n, m, q[g + 12], 6, 1700485571);
        m = md5_ii(m, p, o, n, q[g + 3], 10, -1894986606);
        n = md5_ii(n, m, p, o, q[g + 10], 15, -1051523);
        o = md5_ii(o, n, m, p, q[g + 1], 21, -2054922799);
        p = md5_ii(p, o, n, m, q[g + 8], 6, 1873313359);
        m = md5_ii(m, p, o, n, q[g + 15], 10, -30611744);
        n = md5_ii(n, m, p, o, q[g + 6], 15, -1560198380);
        o = md5_ii(o, n, m, p, q[g + 13], 21, 1309151649);
        p = md5_ii(p, o, n, m, q[g + 4], 6, -145523070);
        m = md5_ii(m, p, o, n, q[g + 11], 10, -1120210379);
        n = md5_ii(n, m, p, o, q[g + 2], 15, 718787259);
        o = md5_ii(o, n, m, p, q[g + 9], 21, -343485551);
        p = safe_add(p, k);
        o = safe_add(o, h);
        n = safe_add(n, f);
        m = safe_add(m, e)
    }
    return Array(p, o, n, m)
}

function md5_cmn(h, e, d, c, g, f) {
    return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d)
}

function md5_ff(g, f, m, l, e, k, h) {
    return md5_cmn((f & m) | ((~f) & l), g, f, e, k, h)
}

function md5_gg(g, f, m, l, e, k, h) {
    return md5_cmn((f & l) | (m & (~l)), g, f, e, k, h)
}

function md5_hh(g, f, m, l, e, k, h) {
    return md5_cmn(f ^ m ^ l, g, f, e, k, h)
}

function md5_ii(g, f, m, l, e, k, h) {
    return md5_cmn(m ^ (f | (~l)), g, f, e, k, h)
}

function core_hmac_md5(c, f) {
    var e = str2binl(c);
    if (e.length > 16) {
        e = core_md5(e, c.length * chrsz)
    }
    var a = Array(16),
        d = Array(16);
    for (var b = 0; b < 16; b++) {
        a[b] = e[b] ^ 909522486;
        d[b] = e[b] ^ 1549556828
    }
    var g = core_md5(a.concat(str2binl(f)), 512 + f.length * chrsz);
    return core_md5(d.concat(g), 512 + 128)
}

function safe_add(a, d) {
    var c = (a & 65535) + (d & 65535);
    var b = (a >> 16) + (d >> 16) + (c >> 16);
    return (b << 16) | (c & 65535)
}

function bit_rol(a, b) {
    return (a << b) | (a >>> (32 - b))
}

function str2binl(d) {
    var c = Array();
    var a = (1 << chrsz) - 1;
    for (var b = 0; b < d.length * chrsz; b += chrsz) {
        c[b >> 5] |= (d.charCodeAt(b / chrsz) & a) << (b % 32)
    }
    return c
}

function binl2str(c) {
    var d = "";
    var a = (1 << chrsz) - 1;
    for (var b = 0; b < c.length * 32; b += chrsz) {
        d += String.fromCharCode((c[b >> 5] >>> (b % 32)) & a)
    }
    return d
}

function binl2hex(c) {
    var b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var d = "";
    for (var a = 0; a < c.length * 4; a++) {
        d += b.charAt((c[a >> 2] >> ((a % 4) * 8 + 4)) & 15) + b.charAt((c[a >> 2] >> ((a % 4) * 8)) & 15)
    }
    return d
}

function binl2b64(d) {
    var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var f = "";
    for (var b = 0; b < d.length * 4; b += 3) {
        var e = (((d[b >> 2] >> 8 * (b % 4)) & 255) << 16) | (((d[b + 1 >> 2] >> 8 * ((b + 1) % 4)) & 255) << 8) | ((d[b + 2 >> 2] >> 8 * ((b + 2) % 4)) & 255);
        for (var a = 0; a < 4; a++) {
            if (b * 8 + a * 6 > d.length * 32) {
                f += b64pad
            } else {
                f += c.charAt((e >> 6 * (3 - a)) & 63)
            }
        }
    }
    return f
}

function ratingModal(b, d) {
    var c = document.forms.listingRatingFormModal.currentRating;
    c.value = b;
    var a = document.getElementById("currentRatingModal");
    if (c.value == 1) {
        createCookie("rating_" + d, b, 1);
        a.style.width = "20%"
    } else {
        if (c.value == 2) {
            createCookie("rating_" + d, b, 1);
            a.style.width = "40%"
        } else {
            if (c.value == 3) {
                createCookie("rating_" + d, b, 1);
                a.style.width = "60%"
            } else {
                if (c.value == 4) {
                    createCookie("rating_" + d, b, 1);
                    a.style.width = "80%"
                } else {
                    if (c.value == 5) {
                        createCookie("rating_" + d, b, 1);
                        a.style.width = "100%"
                    }
                }
            }
        }
    }
    submitModalRating()
}
var handleRatingCancel = function() {
    $("#modalRateListing").modal("hide")
};
var prePopMobNum = "";
var isSponsoredListing = false;
var srpLdp = "SRP";

function initSMSUrl() {
    var b = window.location.href;
    var a = document.getElementById("smsListingUrl");
    mailSubject = b;
    if (document.getElementById("smsListingUrl") != null) {
        document.getElementById("smsListingUrl").value = mailSubject
    }
}

function showSMSPreview(b) {
    var a = createXHR();
    var c = getContextPath() + "/SMSPreview.do?listingHashId=" + b;
    a.open("GET", c, true);
    a.onreadystatechange = function() {
        if (a.readyState == 4) {
            displaySMSPreview(a.responseText)
        }
    };
    a.send(null)
}

function displaySMSPreview(a) {
    var b = document.getElementById("smsPreview");
    b.innerHTML = a
}

function smsListingModalShow(c, e, b) {
    document.getElementById("isSrpListing").value = b;
    if (isSponsoredListing) {
        document.getElementById("isSponsoredListing").value = "1";
        isSponsoredListing = false
    } else {
        document.getElementById("isSponsoredListing").value = "0"
    }
    initSMSUrl();
    showSMSPreview(c);
    document.getElementById("smsListingTable").style.display = "block";
    var a = document.getElementById("smsMobileNumber");
    if (e == 0) {
        a.value = prePopMobNum
    } else {
        a.value = e;
        prePopMobNum = e
    }
    var d = document.smsListingForm.listingHashId;
    d.value = c;
    document.getElementById("smsListingFeedback").style.display = "none";
    document.getElementById("smsListingFeedbackCD").style.display = "none";
    document.getElementById("smsListingForm").style.display = "block"
}
var smsTimer = 3;

function smsTimerCountDown() {
    if (smsTimer > 0) {
        var a = document.getElementById("smsListingFeedbackCD");
        a.style.display = "";
        a.innerHTML = "This message will self destruct in " + smsTimer + " seconds";
        smsTimer = smsTimer - 1;
        var b = window.setTimeout("smsTimerCountDown()", 1000)
    } else {
        $("#modalSmsListing").modal("hide");
        smsTimer = 3
    }
}

function sendSMS() {
    var d = $("#smsListingForm");
    var b = document.getElementById("smsMobileNumber").value;
    if (b == "") {
        var a = document.getElementById("smsListingFeedback");
        a.style.display = "";
        a.innerHTML = "To make it work, you need to enter a mobile number first.";
        return false
    }
    var c = document.getElementById("smsListingFeedback");
    c.style.display = "";
    c.innerHTML = "<IMG SRC='/webres/img/loading.gif'>";
    $.ajax({
        type: d.attr("method"),
        url: d.attr("action"),
        data: d.serialize(),
        success: function(e) {
            $("#smsListingFeedback").html(e);
            var f = document.getElementById("smsListingFeedback");
            f.style.display = "";
            if (e == "Success") {
                smsMobNumber = document.getElementById("smsMobileNumber").value;
                document.smsListingForm.reset();
                document.getElementById("smsListingForm").style.display = "none";
                f.innerHTML = "The SMS with listing details has been sent.";
                smsTimerCountDown()
            } else {
                if (e.indexOf("The mobile number can not be less than 10 characters.") != -1) {
                    f.innerHTML = "Please enter a 10 digit mobile number"
                } else {
                    if (e.indexOf("Nice mobile number. But it is not valid. Try again.") != -1) {
                        f.innerHTML = "Nice mobile number. But it is not valid. Try again."
                    } else {
                        if (e.indexOf("Boo Hoo. The SMS didn't go through.") != -1) {
                            f.innerHTML = "Boo Hoo. The SMS didn't go through."
                        } else {
                            if (e.indexOf("Sorry! you have registered for DO NOT DISTURB (DND) service, So we can't send you SMS.") != -1) {
                                f.innerHTML = "Sorry! you have registered for DO NOT DISTURB (DND) service, So we can't send you SMS."
                            } else {
                                if (e.indexOf("Too many messages have been sent to this number recently. Please try again later!") != -1) {
                                    f.innerHTML = "Too many messages have been sent to this number recently. Please try again later!"
                                } else {
                                    if (e.indexOf("The word that you entered did not match the verification word. Please try again!") != -1) {
                                        f.innerHTML = "Tch. Tch. You did not enter the correct verification code. Please try again."
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        failure: function(e) {
            feedbackDiv.innerHTML = "Oops, please try after some time."
        }
    })
};