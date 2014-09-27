//name.c

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

void decode(char *aftername , const char *beforename);

int main(void)
{
	long x;
	char input[1000] , str[100] , fname[100] , beforename[100];
	FILE *file;

	scanf("%s", input);
	sscanf(input , "name=%s" , beforename);
	char *aftername = malloc(strlen(beforename) + 1);

	decode(aftername , beforename);
	sprintf(fname , "%s.txt" , aftername);

	file = fopen(fname , "ab+");
	fseek(file , 0 , SEEK_END);
	x = ftell(file);

	if (x != 0)
	{
		//HTML:名前を再入力させる
		printf("Content-type: text/html; charset=UTF-8\n\n");
	}
	else
	{
		//HTML:ゲーム画面に移る
		printf("Content-type: text/html; charset=UTF-8\n\n");
	}

	fclose(file);

	return 0;
}

void decode(char *aftername , const char *beforename)
{
	char a , b;

	while(*beforename)
	{
		if ((*beforename == '%') && ((a = beforename[1]) && (b = beforename[2])) && (isxdigit(beforename[1]) && isxdigit(beforename[2])))
		{
			if (a >= 'a')
			{
				a -= 'a'-'A';
			}

			if (a >= 'A')
			{
				a -= ('A' - 10);
			}
			else
			{
				a -= '0';
			}

			if (b >= 'a')
			{
				b -= 'a'-'A';
			}

			if (b >= 'A')
			{
				b -= ('A' - 10);
			}
			else
			{
				b -= '0';
			}

			*aftername++ = 16 * a + b;
			beforename += 3;
		}
		else
		{
			*aftername++ = *beforename++;
		}
	}

	*aftername++ = '\0';
}
