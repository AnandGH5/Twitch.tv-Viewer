
$(document).ready(function() {  
  twitch(); 
}); 
function twitch(){
  const channels = ["freecodecamp","food","OgamingSC2","noobs2ninjas","nightblue3", "fakeaccount"];
  
  var url="https://api.twitch.tv/kraken/streams/";
  var channelurl="https://api.twitch.tv/kraken/channels/";
  var client_id="rmkupo0alwe5dze8z66jiryuvws1wd";
  var game=[];
  var viewers=[];
  var description=[];
  var logo=[];
  var selflink=[];
  var netviews=[];
  var followers=[];
  
  for(var i=0;i<channels.length;i++){ 
     var url1=url+channels[i]+"?client_id="+client_id;
     var url2=channelurl+channels[i]+"?client_id="+client_id;
     var state;
     var desc;
    
      $.ajax({
  url: url1,
  dataType: 'json',
  async: false,
  success: function(data){
    if(data.stream){
         state='<div class="box online">';
         game.push(data.stream.game);
         viewers.push(data.stream.viewers);
      }
    else{
         game.push("Offline!");
         viewers.push("No");
         state='<div class="box offline">';
      }
   }
});
      
 $.ajax({
  url: url2,
  dataType: 'json',
  async: false,
  success: function(data) {
    description.push(data.status);
    logo.push(data.logo);
    selflink.push(data.url);
    netviews.push(data.views);
    followers.push(data.followers); 
    desc= description[i]+"</span><br>";
   }
 });
    if(game[i]=="Offline!")
      desc="</span>";
      
          if(logo[i])
           $("#mainbody").append(state+'<article class="media"><a href="'+selflink[i]+'"><div class="media-left"><figure class="image is-128x128"><img id="dp" src="'+logo[i]+'"></figure></div> </a><p><strong>'+"&nbsp<span class=\"fa fa-user-circle\" aria-hidden=\"true\"></span>&nbsp"+channels[i] +'</strong> <br><a href="'+selflink[i]+'">@'+channels[i]+'</a><br><span>'+"&nbsp<i class=\"fa fa-tags\" aria-hidden=\"true\"></i>&nbsp"+game[i]+'</span> <br><span>'+"&nbsp<i class=\"fa fa-eye\" aria-hidden=\"true\"></i>&nbsp"+netviews[i]+'</span><br><span>'+"&nbsp<i class=\"fa fa-user\" aria-hidden=\"true\"></i>&nbsp"+followers[i]+'</span><br><span>'+"&nbsp"+desc+'<span>'+"&nbsp"+viewers[i]+" viewers currently watching."+'</span></p></article></div>');
      else
        {
           $("#mainbody").append(state+'<article class="media"><div class="media-left"><figure class="image is-128x128"><i class="fa fa-exclamation-circle" aria-hidden="true"></i></figure></div><p><strong>'+"&nbsp<span class=\"fa fa-user-circle\" aria-hidden=\"true\"></span>&nbsp"+channels[i] +'</strong><br><span>Channel Doesn\'t exist!</span></p></article></div>');
        }
     } 
   $("#mainbody").append("<br>");
  return;
}

function offline(){
    setstate("offline");
    $(".online").hide();
    $(".offline").show();
}

function online(){
   setstate("online");
   $(".offline").hide();
   $(".online").show();  
}

function al(){
    setstate("all");
    $(".offline").show();
    $(".online").show();
}

function setstate(newvalue){
   $("#all").removeClass("is-active");
   $("#online").removeClass("is-active");
   $("#offline").removeClass("is-active");
   $("#"+newvalue).addClass("is-active");
}