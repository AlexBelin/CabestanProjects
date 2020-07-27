var ContentHTML = null;
// Events listeners ============
document.getElementById('code-html').addEventListener('keyup', function(){
    document.getElementById('link-unique').value = '';
    document.getElementById('preview').innerHTML = this.value;
    ContentHTML = document.createElement(null);
    ContentHTML.innerHTML = this.value;
});

document.getElementById('button-n2').addEventListener('mouseup', function(){
    if(document.getElementById('advanced-treatment').checked){
        AdvancedTreatment();
    }
    BasicTreatment();
    ImagesLocationsInjection();
    ParseLinks('N2');
    var _PixelsTrack = '<img src="https://mm.eulerian.net/dynview/sofinco/pix.gif?eml-publisher=sofinco&eml-name=' + document.getElementById("campaign-name").value + '&eemail={EMAIL}" border="0" width="1" height="1" /><img src="https://mmtro.com/i?tagid=6549673-7656665c048eac04dc64d8ff68101f13&idc=56570&email={EMAIL}&rtgeidcampaign={CODEOFFRECOMMERCIALE}&rtgeclienttype={SEGMENTMENAGE}" border="0" width="1" height="1" />';//pixels tracks creation
    ContentHTML.innerHTML += _PixelsTrack;//pixels tracks added to contentHTML
    Update();
});

document.getElementById('button-n0-n1').addEventListener('mouseup', function(){
    if(document.getElementById('advanced-treatment').checked){
        AdvancedTreatment();
    }
    BasicTreatment();
    ImagesLocationsInjection();
    ParseLinks('N1');
    Update();
});

document.getElementById('link-unique').addEventListener('keyup', function(){
    var DispayLink = document.createElement('div');
    DispayLink.classList.add('display-link');
    DispayLink.innerHTML = EncodeLink(this.value, 'N2');
    document.getElementById('preview').innerHTML = '';
    document.getElementById('preview').appendChild(DispayLink);
    document.getElementById('code-html').value = ''
});
// =============================

function Update(){
    document.getElementById('code-html').value = ContentHTML.innerHTML.toString().replace(/&amp;/g, '&');
    document.getElementById('preview').innerHTML = ContentHTML.innerHTML;
}

function BasicTreatment(){
    ContentHTML.innerHTML = ContentHTML.innerHTML.toString().replace(/&amp;/g, '&').replace(/(?<!href\=\")(https:\/\/|http:\/\/)/g, '').replace(/(?<=affiche\spas\scorrectement.+|visualisez.+|visualiser.+)(href\=\"[A-Za-z{}#\/\.\:0-9\[\]\%\$]+\")/g, 'href="{MirrorPage}"').replace(/(?<=d&eacute;sabonner.+|désabonner.+|ne\ssouhaitez\splus\srecevoir.+)(href\=\"[A-Za-z{}#\/\.\:0-9\[\]\%\$]+\")/g, 'href="{OptoutLink}"').replace(/http:\/\/sofinco1\.cab05\.net\/DS13062014094024\.cfm/g, '{OptoutLink}');
}

function AdvancedTreatment(){
    ContentHTML.innerHTML = ContentHTML.innerHTML.toString().replace(/(?<part1>([C|c]lient)+(|\s|&nbsp;|\w+)+\:(|\s|&nbsp;)+(|\<[A-Za-z0-9\s\-\#\:\"\;\=\']+\>)+)(|\s|&nbsp;)(([Xx]+(\s|&nbsp;|)+)+|(\[#[A-Za-z\s]+#\]))/g, '$<part1>{CUSTOMERIDPERSO}');
    ContentHTML.innerHTML = ContentHTML.innerHTML.toString().replace(/(?<part1>([C|c]ontrat)+(|\s|&nbsp;|\w+)+\:(|\s|&nbsp;)+(|\<[A-Za-z0-9\s\-\#\:\"\;\=\']+\>)+)(|\s|&nbsp;)(([Xx]+(\s|&nbsp;|)+)+|(\[#[A-Za-z\s]+#\]))/g, '$<part1>{NUMCONTRATPERSO1}');
    ContentHTML.innerHTML = ContentHTML.innerHTML.toString().replace(/(?<part1>([C|c]ode)+(|\s|&nbsp;|\w+)+\:(|\s|&nbsp;)+(|\<[A-Za-z0-9\s\-\#\:\"\;\=\']+\>)+)(|\s|&nbsp;)(([Xx]+(\s|&nbsp;|)+)+|(\[#[A-Za-z\s]+#\]))/g, '$<part1>{CODEOFFRECOMMERCIALE}');
    ContentHTML.innerHTML = ContentHTML.innerHTML.toString().replace(/(([Xx]+(|\s|&nbsp;))+|(\[#[A-Za-z\s]+#\])+|(\w+))(?<part1>(|\<(|\/)[A-Za-z0-9\s\-\#\:\"\;\=\']+\>)+(|\s|&nbsp;)(euros|&euro;|€|&#x20AC;))/g, '{MONTANTCAPITALDEVISE}$<part1>');
    ContentHTML.innerHTML = ContentHTML.innerHTML.toString().replace(/(Cher|Chère|Ch&egrave;re).+(|\s|&nbsp;)+\,/g, '[{CONDCHERCIVNOM}],');
    ContentHTML.innerHTML = ContentHTML.innerHTML.toString().replace(/(Monsieur|Mr|Madame|Mme|Mademoiselle|Mlle|Melle).+\,/g, '[{CONDCIVNOM}],');
}

function ImagesLocationsInjection(){
    if(document.getElementById('images-location').value != ''){
        ContentHTML.innerHTML = ContentHTML.innerHTML.toString().replace(/src\=\"[\w\/]+\//g, 'src="' + document.getElementById('images-location').value.replace('sofinco1.cab05.net', '{TRACKINGDOMAIN}'));
    }
}

function ParseLinks(Level){
    var _AllLinks = ContentHTML.querySelectorAll('a');
    for(link in _AllLinks){
        try {
            if((_AllLinks[link].getAttribute('href').indexOf('mailto:') == -1) && (_AllLinks[link].getAttribute('href').indexOf('sofinco-informations-legales') == -1) && ((_AllLinks[link].getAttribute('href').indexOf('sofinco.fr') != -1) || (_AllLinks[link].getAttribute('href').indexOf('tel:') != -1))){
                _AllLinks[link].setAttribute('href', EncodeLink(_AllLinks[link].getAttribute('href'), Level));
            }
        } 
        catch(error) {
            console.log(error);
        }
    }
}

function EncodeLink(Link, Level){
    var EncodedLink = '';
    if(Link.indexOf('tel:') != -1){
        EncodedLink = Link.replace(/tel:/g, 'http://sofinco1.cab05.net/tracktel.cfm?tel=').replace(/ /g, '').replace(/\+/g, '');
    }
    else{
        if(Level == 'N2'){
            var SubLink = '';
            EncodedLink += document.getElementById('mmtro').value + encodeURIComponent(document.getElementById('eulerian').value.replace('[CampaignName]', document.getElementById('campaign-name').value));
            if(document.getElementById('parameters').value != ''){
                if(Link.indexOf('?') == -1){
                    SubLink = encodeURIComponent(encodeURIComponent(Link + '?' + document.getElementById('parameters').value));
                }
                else{
                    SubLink = encodeURIComponent(encodeURIComponent(Link + '&' + document.getElementById('parameters').value));
                }
            }
            else{
                SubLink = encodeURIComponent(encodeURIComponent(Link));
            }
            EncodedLink += SubLink;
            EncodedLink = EncodedLink.replace(/&amp;/g, '&').replace('%7B', '{').replace('%7D', '}');
        }
        else{
            EncodedLink = Link;
        }
    }
    return EncodedLink;
}