<html>
    <head>
        <title>CAA</title>
        <link rel="stylesheet" type="text/css" href="theme.css">
    </head>

    <body>
        <div class="top">
            <header>
                <h1>Clean Air Anywhere</h1>
                <p>A tool to check and interpret pollutants around you</p>
            </header>
        </div>

        <input type="hidden" name="lonI" value="">
        <input type="hidden" name="latI" value="">

        <script type="text/javascript" src="setlocation.js"></script>

        <div class="content">
            <!-- <h2>Pollutant readout</h2> -->
            <h3>Local warnings</h3>
            <div id="warnings"></div>
            <h3>Recent comments</h3>
            <div id="comments">
                <ul>
                <?php
                $myFile = fopen("commentlog.txt", 'r');
                $dataRead = fread($myFile, filesize("commentlog.txt"));
                fclose($myFile);
                $dataSplit = explode("\n", $dataRead);
                for ($i=count($dataSplit)-1; $i>max(0, count($dataSplit)-6); $i--) {
                    $newData = explode("|", $dataSplit[$i-1]);
                    echo "<li>" . $newData[0] . "</li>";
                }
                ?>
                </ul>
            </div>
            <h3>Submit comment</h3>
            <form action="comments.php" method="POST" id="commentForm">
                <input type="text" name="comment" size=40>
                <input type="hidden" name="lat" value="">
                <input type="hidden" name="lon" value="">
                <input type="submit" value="Submit">
            </form>
            <p>Note: Comments submitted will contain location data</p>
            <h3>Pollutant breakdown</h3>
            <div id="readout"></div>
            <h3>Current location</h3>
            <div id="current-location"></div>
        </div>
        
        <input type="hidden" name="comments" value="">

        <div class="bottom-padding"></div>

        <div class="footer">
            <footer>
                <!-- <p>Made by </p><a href="https://github.com/morzack/">@morzack</a> -->
            </footer>
        </div>
    </body>

    <script type="text/javascript" src="readout.js"></script>
</html>
