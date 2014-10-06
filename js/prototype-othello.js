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

var mousex;
var mousey;
var noworder;//AI:1 player:2

function Backdata()
{
	this.x = new Array(0 , 0 , 0 , 0 , 0 , 0 , 0 , 0);
	this.y = new Array(0 , 0 , 0 , 0 , 0 , 0 , 0 , 0);
	this.flip_number = new Array(0 , 0 , 0 , 0 , 0 , 0 , 0 , 0);
}

function Btree()
{
	this.children = new Btree();
	this.value = 0;
	this.num = 0;
	this.posy = 0;
	this.posx = 0;
}

function boardload()
{
	window.document.onkeydown = function ()
	{
		if(window.event.keyCode == 13)
		{
			return false;
		}

		return true;
	}

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

	output();
}

function start()
{
	var allcheck = 0;
	var messege = "";

	pname = document.config.pname.value;

	if (pname === "")
	{
		document.getElementById("pname").style.border = "solid 1px #FF0000";
		document.getElementById("alertpname").textContent = "名前を入力してください。";
		document.getElementById("alertpname").style.display = "block";
	}
	else
	{
		allcheck += 1;
		document.getElementById("pname").style.border = "hidden 1px #FF0000";
		document.getElementById("alertpname").style.display = "none";
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
		document.getElementById("level").style.border = "hidden 1px #FF0000";
		document.getElementById("alertlevel").style.display = "none";
	}
	else
	{
		document.getElementById("level").style.border = "solid 1px #FF0000";
		document.getElementById("alertlevel").textContent = "レベルを選んでください。";
		document.getElementById("alertlevel").style.display = "block";
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
		document.getElementById("porder").style.border = "hidden 1px #FF0000";
		document.getElementById("alertporder").style.display = "none";
	}
	else
	{
		document.getElementById("porder").style.border = "solid 1px #FF0000";
		document.getElementById("alertporder").textContent = "先手か後手か選んでください。";
		document.getElementById("alertporder").style.display = "block";
	}

	if (allcheck == 3)
	{
		document.getElementById("title").style.display = "none";
		document.getElementById("main").style.display = "block";
	}

	document.getElementById("result").style.display = "none";
	document.getElementById("message").style.visibility = "hidden";
}

function backtitle()
{
	document.getElementById("title").style.display = "block";
	document.getElementById("main").style.display = "none";
	document.getElementById("alertpname").style.display = "none";
	document.getElementById("alertlevel").style.display = "none";
	document.getElementById("alertporder").style.display = "none";
	document.getElementById("pname").style.border = "hidden 1px #FF0000";
	document.getElementById("level").style.border = "hidden 1px #FF0000";
	document.getElementById("porder").style.border = "hidden 1px #FF0000";

	document.config.pname.value = "";
	document.config.elements[levelchecked].checked = null;
	document.config.elements[porderchecked].checked = null;
}

function coordinate(event)
{
	if (!event)
	{
		event = window.event;
	}

	if (document.all)
	{
		mousex = event.offsetX;
		mousey = event.offsetY;
	}
	else
	{
		mousex = event.layerX;
		mousey = event.layerY;
	}

	return [mousex , mousey];
}

function black()
{
	context.beginPath();
	context.fillStyle = "#000000";
	context.arc(37.5 , 37.5 , 30 , 0 , Math.PI * 2 , true);
	context.fill();

	blackpiece.src = othello.toDataURL();
}

function white()
{
	context.beginPath();
	context.fillStyle = "#FFFFFF";
	context.arc(37.5 , 37.5 , 30 , 0 , Math.PI * 2 , true);
	context.fill();

	whitepiece.src = othello.toDataURL();
}

function main(event)
{
	coordinate(event);
	myturn();
	output();
}

function myturn()
{
	var w;
	var h;
	var ret;
	var dummy = new Backdata();

	h = Math.floor((mousey + 70) / 75);
	w = Math.floor((mousex + 70) / 75);

	h--;
	w--;

	if (gameboard[h][w] == 0)
	{
		ret = flip(h , w , porder , dummy);

		if (ret == 1)
		{
			gameboard[h][w] = porder;
			document.getElementById("message").style.visibility = "hidden";
		}
		else
		{
			document.getElementById("message").style.visibility = "visible";
		}
	}
	else
	{
		document.getElementById("message").style.visibility = "visible";
	}
}

function enemyturn()
{

}

function flip(h , w , order , data)
{
	return 1;
}

function output()
{
	for (var i = 0;i < 8;i++)
	{
		for (var j = 0;j < 8;j++)
		{
			if (gameboard[i][j] == 1)
			{
				context.drawImage(blackpiece , 75 * j + 5 , 75 * i + 5);
			}
			else if (gameboard[i][j] == 2)
			{
				context.drawImage(whitepiece , 75 * j + 5 , 75 * i + 5);
			}
		}
	}
}

function checkstate()
{

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

function append_child()
{

}

function search_tree()
{

}

function minimax()
{

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
