var pname;
var level;
var order;
var levelchecked;
var orderchecked;
var othello;

function load()
{
	othello = document.getElementById("board");

	if (othello.getContext)
	{
		var border = othello.getContext("2d");

		border.beginPath();

		border.fillStyle = "forestgreen";
		border.lineWidth = 10;
		border.lineCap = "square";
		border.strokeStyle = "#333333";

		border.moveTo(5,5);
		border.lineTo(5,565);
		border.lineTo(565,565);
		border.lineTo(565,5);
		border.closePath();

		border.stroke();
		border.fill();

		for (var i=1;i <= 7;i++)
		{
			border.beginPath();

			border.lineWidth = 5;
			border.strokeStyle = "#333333";

			border.moveTo(5 + 70 * i,5);
			border.lineTo(5 + 70 * i,565);

			border.stroke();
		}

		for (var i=1;i <= 7;i++)
		{
			border.beginPath();

			border.lineWidth = 5;
			border.strokeStyle = "#333333";

			border.moveTo(5,5 + 70 * i);
			border.lineTo(565,5 + 70 * i);

			border.stroke();
		}
	}
}

function start()
{
	var allcheck = 0;
	var messege = "";

	pname = document.config.pname.value;

	if (pname == "")
	{
		messege += "名前を入力してください。\n";
	}
	else
	{
		allcheck += 1;
	}

	var levelcheck = 0;

	for (var i = 1;i < 6; i++)
	{
		if (document.config.elements[i].checked)
		{
			levelcheck = 1;
			level = i;
			levelchecked = i;
		}
	}

	if (levelcheck == 1)
	{
		allcheck += 1;
	}
	else
	{
		messege += "レベルを選んでください。\n";
	}

	var ordercheck = 0;

	for (var i = 6;i < 8;i++)
	{
		if (document.config.elements[i].checked)
		{
			ordercheck = 1;
			order = i - 5;
			orderchecked = i;
		}
	}

	if (ordercheck == 1)
	{
		allcheck += 1;
	}
	else
	{
		messege += "先手か後手か選んでください。\n"
	}

	if (allcheck == 3)
	{
		document.getElementById("title").style.display="none";
		document.getElementById("main").style.display="block";
	}
	else
	{
		alert(messege);
	}
}

function backtitle()
{
	document.getElementById("title").style.display="block";
	document.getElementById("main").style.display="none";

	document.config.pname.value = "";
	document.config.elements[levelchecked].checked = null;
	document.config.elements[orderchecked].checked = null;
}
