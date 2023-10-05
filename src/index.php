<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Budget Blaster</title>
<link href="styles/styles.css" rel="stylesheet" type="text/css" />
</head>
<body>
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" valign="middle"><div class="page">
        <div class="top border"></div>
		<div id="canvas">
        <img src="images/logos/version-1-0.png" hspace="25" vspace="25" style="position:absolute; left:0px" />
        <div id="visitors">
          <p align="center">Visitors<br>
            <?php include("hit-counter.php"); ?>
          </p>
<script>function fbs_click() {u=location.href;t=document.title;window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;}</script><style> html .fb_share_button { display: -moz-inline-block; display:inline-block; border-radius: 10px; -moz-border-radius: 10px; padding:5px 20px 5px 5px; height:15px; border:2px solid #000000; background:url(http://static.ak.facebook.com/images/share/facebook_share_icon.gif?6:26981) no-repeat top right; } html .fb_share_button:hover { color:#fff; border-color:#295582; background:#3b5998 url(http://static.ak.facebook.com/images/share/facebook_share_icon.gif?6:26981) no-repeat top right; text-decoration:none; }</style><p class="label"><a rel="nofollow" href="http://www.facebook.com/share.php?u=http%3A%2F%2Fwww.stopwalker.org%2F" class="fb_share_button" onClick="return fbs_click()" target="_blank" style="text-decoration:none; color:#000000">Share</a></p>
        </div>
        <p align="center"> Scott Walker &amp; Co. Presents</p>
        <p align="center"><img src="images/logos/budget.png" width="240" height="60"></p>
        <p align="center"><img src="images/logos/blaster.png" width="225" height="50"></p>
        <p align="center">The Video Game</p>
        <p align="center"><img src="images/capitol/capitol.png"></p>
        <p align="center">
          <input type="submit" name="Submit" value="Continue" id="continueButton">
        </p>
        <p align="center">Rated M : Mature Audiences Only - Contains Depictions of Sociopolitical Violence </p>
		</div>
        <div class="bottom border"></div>
      </div></td>
  </tr>
</table>
</body>
<script language="javascript" type="text/javascript" src="scripts/jquery.js"></script>
<script language="javascript" type="text/javascript" src="scripts/index.js"></script>
<script language="javascript" type="text/javascript">
//<![CDATA//
window.onload = function() {
  document.getElementById("continueButton").onclick = function() {
    window.location = "intro.html";
  }
  
  var canvas = new Canvas("canvas");
    
  // add spaceship
  //
  window.setTimeout(function() {
    var spaceship = new SpaceShip(new Vector3(-1, 0, 3), 1, new Vector2(1, 0), true, true);
    spaceship.hWrap = false;
    canvas.load(spaceship);
    spaceship.disableMouse();
	spaceship.setThrust(.5);
    spaceship.start(30);
  
    // remove spaceship
	//
	var interval = window.setInterval(function() {
	  if (spaceship.location.x > 1) {
		window.clearInterval(interval);
	    canvas.unload(spaceship);
	  }
	}, 100);
  }, 2000);
}
//]]>
</script>
</html>
