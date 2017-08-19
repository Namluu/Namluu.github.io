<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="css/style.css" />
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <script src="js/viewer.js"></script>
    <script src="js/custom.js"></script>
</head>
<body>

    <input type="hidden" name="gameId" value="<?php echo $_GET['game'] ?>">
    <ul class="eventsListUl viewUl" id="videoBlock" data-list="2">
        <li class="clear">
            <div class="line colM1"></div>
            <div class="nameCon">
                <div class="sport" id="sport"></div>
                <a href="#" class="name" id="teamVS"></a>
                <div class="liga" id="liga"></div>
            </div>
            <div class="videoCon">
                <div id="video-player"></div>
                <iframe src="//sportstream365.com/viewer/frame/?game=<?php echo $_GET['game'] ?>&header=1&autoplay=1&width=560&height=460" width="560" height="460" frameborder="0" scrolling="no"></iframe>
            </div>
            <div class="moreCon">
            <div class="clear">
                <a href="#" class="moreBut fl" data-but="2">Nhận mã số</a>
            </div>
            <div class="moreBlock">
                <span class="name" id="streamId"></span>
            </div>

        </li>
    </ul>

    <script>
    $(function(){
        viewer._init();
    })
    </script>
</body>
</html>