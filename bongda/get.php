<?php
$file = file_get_contents('http://sportstream365.com/LiveFeed/GetLeftMenuShort?sports=1&lng=vi&partner=24');

echo "Thời gian cập nhật ".gmdate('Y-m-d H:i:s')."<br>";
echo 'Trận đấu đã được cập nhật, data:'.file_put_contents(dirname(__FILE__).'/LiveFeed.json', $file);
?>
<p><a href="<?php echo $_SERVER['HTTP_REFERER'] ?>">Quay lại trang danh sách trận đấu</a></p>