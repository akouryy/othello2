var pname;
var level;
var porder;//first:1 second:2

var levelchecked;
var porderchecked;

var othello;
var context;

var blackpiece = new Image();
var whitepiece = new Image();

var gameboard = [[0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
                 [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
                 [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
                 [0 , 0 , 0 , 2 , 1 , 0 , 0 , 0],
                 [0 , 0 , 0 , 1 , 2 , 0 , 0 , 0],
                 [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
                 [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
                 [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]];//empty:0 brack:1 white:2

var mouse = {x : null , y : null};
var noworder;//AI:1 player:2

function boardload()
{
	othello = document.getElementById("board");

	context = othello.getContext("2d");

	black(context);
	white(context);

	context.beginPath();

	context.fillStyle = "forestgreen";
	context.lineWidth = 10;
	context.lineCap = "square";
	context.strokeStyle = "#333333";

	context.moveTo(5 , 5);
	context.lineTo(5 , 600);
	context.lineTo(600 , 600);
	context.lineTo(600 , 5);
	context.closePath();

	context.stroke();
	context.fill();

	for (var i = 1;i <= 7;i++)
	{
		context.beginPath();

		context.lineWidth = 5;
		context.strokeStyle = "#333333";

		context.moveTo(75 * i + 5 , 5);
		context.lineTo(75 * i + 5 , 600);

		context.stroke();
	}

	for (var i = 1;i <= 7;i++)
	{
		context.beginPath();

		context.lineWidth = 5;
		context.strokeStyle = "#333333";

		context.moveTo(5 , 75 * i + 5);
		context.lineTo(600 , 75 * i + 5);

		context.stroke();
	}

	output(context);
}

function start()
{
	var allcheck = 0;
	var messege = "";

	pname = document.config.pname.value;

	if (pname === "")
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

	var pordercheck = 0;

	for (var i = 6;i < 8;i++)
	{
		if (document.config.elements[i].checked)
		{
			pordercheck = 1;
			porder = i - 5;
			porderchecked = i;
		}
	}

	if (pordercheck == 1)
	{
		allcheck += 1;
	}
	else
	{
		messege += "先手か後手か選んでください。\n";
	}

	if (allcheck == 3)
	{
		document.getElementById("title").style.display = "none";
		document.getElementById("main").style.display = "block";
	}
	else
	{
		alert(messege);
	}

	gameboard = [[0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
                 [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
                 [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
                 [0 , 0 , 0 , 2 , 1 , 0 , 0 , 0],
                 [0 , 0 , 0 , 1 , 2 , 0 , 0 , 0],
                 [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
                 [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
                 [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]];
}

function backtitle()
{
	document.getElementById("title").style.display = "block";
	document.getElementById("main").style.display = "none";

	document.config.pname.value = "";
	document.config.elements[levelchecked].checked = null;
	document.config.elements[porderchecked].checked = null;
}

function black()
{
	context.beginPath();
	context.fillStyle = "#000000";
	context.arc(30 , 30 , 30 , 0 , Math.PI * 2 , true);
	context.fill();

	blackpiece.src = othello.toDataURL();
}

function white()
{
	context.beginPath();
	context.fillStyle = "#FFFFFF";
	context.arc(30 , 30 , 30 , 0 , Math.PI * 2 , true);
	context.fill();

	whitepiece.src = othello.toDataURL();
}

function output()
{
	for (var i = 0;i < 8;i++)
	{
		for (var j = 0;j < 8;j++)
		{
			if (gameboard[i][j] == 1)
			{
				context.drawImage(blackpiece , 75 * j + 12.5 , 75 * i + 12.5);
			}
			else if (gameboard[i][j] == 2)
			{
				context.drawImage(whitepiece , 75 * j + 12.5 , 75 * i + 12.5);
			}
		}
	}
}

function ordercount(order)
{
	var count;

	for (var i = 0;i < 8;i++)
	{
		for (var j = 0;j < 8;j++)
		{
			if (gameboard[i][j] == order)
			{
				count++;
			}
		}
	}

	return count;
}

function chenge(order)
{
	if (order == 1)
	{
		return 2;
	}
	else if (order == 2)
	{
		return 1;
	}
}

function gameset()
{
	var pscore = 0;
	var ascore = 0;

	for (var i = 0;i < 8;i++)
	{
		for (var j = 0;j < 8;j++)
		{
			if (gameboard[i][j] == porder)
			{
				pscore++;
			}
			else if (gameboard[i][j] == chenge(porder))
			{
				ascore++;
			}
		}
	}

	if (pscore > ascore)
	{
		document.getElementById("result").textContent = (pscore + "対" + ascore + "で" + pname + "さんの勝ちです。");
	}
	else if (pscore < ascore)
	{
		document.getElementById("result").textContent = (pscore + "対" + ascore + "で" + pname + "さんの負けです。");
	}
	else
	{
		document.getElementById("result").textContent = (pscore + "対" + ascore + "で引き分けです。");
	}

	document.getElementById("result").style.display = "block";
}
