
var userTurn=1;
var board=[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
var available=9;

window.onload = function(){
	setListeners();
	resetBoard();
};

function resetBoard()
{
	for(var i=0;i<9;i++){
		board[Math.floor(i/3)][i%3]=-1;
	}
	available=9;
	updateBoard();
	
}

function Won(player)
{
	for (var i = 0; i < 3; i++) {
    if (board[i][0] == player && board[i][1] == player && board[i][2] == player) {
      return true;
    }

    if (board[0][i] == player && board[1][i] == player && board[2][i] == player) {
      return true;
    }
  }

  if (board[0][0] == player && board[1][1] == player && board[2][2] == player) {
      return true;
  }

  if (board[0][2] == player && board[1][1] == player && board[2][0] == player) {
      return true;
  }

  return false;
}

function updateBoard()
{
	var cell;
	
	for(var i=0;i<3;i++)
		for(var j=0;j<3;j++)
			{
				cell =document.getElementById(i*3+j);
				if(board[i][j]==-1)
					cell.src="blank.jpg";
				else if(board[i][j]==0)
					cell.src="O.jpg";
				else
					cell.src="X.jpg";
			}
	if(Won(1))
		{alert("Player Won");resetBoard();}
	
	if(Won(0))
		{alert("Computer Won");resetBoard();}
		
	if(available < 1)
		{alert("Draw");resetBoard();}
		
}

function userClick(cell)
{
	if(userTurn==0)
		return;
	
	if(setAt(cell,1))
		swapTurn();
}

function setListeners(){
	var cells = document.getElementsByTagName("img"); 
	for (var i = 0; i < cells.length; i++) { 
			cells[i].onclick = onclick = function(){
			userClick(this);
		}
	}
};


function setAt(cell,player)
{
	var id = parseInt(cell.id);
	if(board[Math.floor(id/3)][id%3]==-1)
	{
		board[Math.floor(id/3)][id%3]=player;
		
		available=available-1;
		updateBoard();
		return true;
	}
	else
	{
		alert("That is not a valid position. It is already occupied : "+id);
		return false;
	}
	return false;
}

function swapTurn()
{
	if(userTurn==1)
		{document.getElementById("turn").innerHTML="Computer";userTurn=0;window.setTimeout(computerMove,400);}
	else 
		{document.getElementById("turn").innerHTML="Player";userTurn=1;};
}

function computerMove()
{
	var randomPosition= Math.floor(Math.random() * (9));
	
	if(available >1)
	while(board[Math.floor(randomPosition/3)][randomPosition%3]!=-1)
	{
		randomPosition= Math.floor(Math.random() * (9));
	}
	if(available ==1)
	{
		for(var i=0;i<3;i++)
			for(var j=0;j<3;j++)
				if(board[i][j]==-1)
					randomPosition=i*3+j;
	}
	
	setAt(document.getElementById(randomPosition),0);
	swapTurn();
}