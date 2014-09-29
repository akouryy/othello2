var pname;
var level;
var order;

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
	}
	else
	{
		alert(messege);
	}
}
