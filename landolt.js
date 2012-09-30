function sizeByDistanceAndAngle (distance, angle) {
	return Math.tan(angle / 2) * (2 * distance);
}

$(function () {
	var canvas = document.getElementById('visual-acuity');
	var ctx = canvas.getContext('2d');

	function drawLandoltCircle (x, y, size) {
		ctx.save();
		ctx.translate(x ,y);
		ctx.lineWidth = size;
		ctx.beginPath();
		ctx.arc(0, 0, 2.5 * size - (size / 2), 0, Math.PI * 2, false);
		ctx.stroke();
		ctx.rotate( (Math.PI * 2) / 8 * ~~(Math.random() * 8));
		ctx.clearRect(0, -(size / 2), size * 2.5 + size, size);
		ctx.restore();
	}

	$('#dpi, #distance').change(function () {
		var dpi      = +$('#dpi').val();
		var mm       = dpi / 25.4;
		var distance = +$('#distance').val();
		var unit     = sizeByDistanceAndAngle(distance * 1000, Math.PI * 2 / 360 / 60);
		$('#distance-n').text(distance);
		$('#dpi-n').text(dpi);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var w = 20; // 20mm
		ctx.fillRect(10, 10, ~~(w * mm), 2);
		ctx.fillRect(10, 10, 1, 10);
		ctx.fillRect(10 + ~~(w * mm), 10, 1, 10);
		ctx.font = "8px Arial";
		ctx.fillText(~~(w / 10) + 'cm', 10, 8);

		ctx.save();
		var vas = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.2, 1.5, 2.0, 2.5, 3.0];
		var f = function (o) {
			var fontSize = distance * 10 * mm;
			ctx.font = fontSize + "px Arial";

			var x = (unit * mm / 0.1) * 4 * o + (fontSize * 2), y = 50;
			for (var i = 0, it; (it = vas[i]); i++) {
				var size = unit * mm / it;
				var rad  = size * 2.5 + (size / 2);
				drawLandoltCircle(x, y + rad, size);
				ctx.fillText(it.toFixed(1), 10, y + rad + (fontSize / 3));
				y += (rad * 2) + fontSize;
			}
		};
		f(1);
		f(3);
		f(5);
	}).change();
});
