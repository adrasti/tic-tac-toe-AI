(function game() {
    let playerX = [];
    let playerO = [];

    let tout = 0;
    let ctout = 0;

    let tiles = document.querySelectorAll('.tile');
    let grid = document.querySelector("#grid");
    let humans = document.querySelectorAll('.human');
    let inputs = document.querySelectorAll("input");

    let oddTurn = true;
    let gameended = false;

    let XcomputerPlayer = false;
    let OcomputerPlayer = false;


    tiles.forEach(e => {
        e.addEventListener("click", selectTile);
    });
    humans.forEach(e => {
        e.addEventListener("click", switchComputer);
    }); 
    inputs.forEach(e => {
        e.addEventListener("click", () => {
            reset();
            makeComputerMove();
        })
    });

    function selectTile(e) {
        if(typeof(e) == "object") {
            if(oddTurn) {
                playerX.push(index(e.target))
                render(e.target, true);
                oddTurn = !oddTurn;
                setHoverClass();
                check4win('X');
                makeComputerMove();
            } else {
                playerO.push(index(e.target))
                render(e.target, false);
                oddTurn = !oddTurn;
                setHoverClass();
                check4win('O');
                makeComputerMove();
            }
        } else {
            if(oddTurn) {
                playerX.push(e)
                render(tiles[e-1], true);
                oddTurn = !oddTurn;
                setHoverClass();
                check4win('X');
                makeComputerMove();
            } else {
                playerO.push(e)
                render(tiles[e-1], false);
                oddTurn = !oddTurn;
                setHoverClass();
                check4win('O');
                makeComputerMove();
            }
        }  
    }

    function render(el, m) {
        if(m === true) {
            el.classList.add('X');
            el.removeEventListener("click", selectTile);
        } else {
            el.classList.add('O');
            el.removeEventListener("click", selectTile);
        }

    }

    function setHoverClass() {
        grid.classList.remove('X');
        grid.classList.remove('O');
        if(oddTurn) {
            grid.classList.add('X');
        } else grid.classList.add('O');
    }

    function setNoClickClass() {
        clearTimeout(ctout);
        grid.classList.add('noclick');
        ctout = setTimeout(() => {
            grid.classList.remove('noclick');
        }, 820);
    }

    function reset() {
        clearTimeout(tout);
        playerX = []
        playerO = []
        tiles.forEach(e => {
            e.classList.remove('X');
            e.classList.remove('O');
        });
        tiles.forEach(e => {
            e.addEventListener("click", selectTile);
        });
        oddTurn = true;
        setHoverClass();
        gameended = false;
    }

    function check4win(mark) {
        if(mark === "X") {
            if(check(playerX) === true) {
                alertWin('Player "X" won!');
                gameended = true;
                return;
            }
        } else {
            if(check(playerO) === true){
                alertWin('Player "O" won!');
                gameended = true;
                return;
            }
        }
        if(!isMovesLeft(playerX, playerO)){
            alertWin("It's a tie!");
            gameended = true;
        }
    }
    function switchComputer(e) {
       if(e.target.classList.contains('human')) {
           if(e.target.parentNode.id === "playerX") {
            XcomputerPlayer = !XcomputerPlayer; 
            document.getElementById('buttons1').style.display = "flex";
           } else {
                OcomputerPlayer = !OcomputerPlayer;
                document.getElementById('buttons2').style.display = "flex";
           }
           e.target.classList.remove('human');
           e.target.classList.add('comp');
       } else {
            if(e.target.classList.contains('comp')) {
                if(e.target.parentNode.id === "playerX") {
                    XcomputerPlayer = !XcomputerPlayer; 
                    document.getElementById('buttons1').style.display = "none";
                } else{
                    OcomputerPlayer = !OcomputerPlayer;
                    document.getElementById('buttons2').style.display = "none";
                }

                e.target.classList.remove('comp');
                e.target.classList.add('human');
            }
            clearTimeout(tout);
       }
       reset();
       makeComputerMove();
    }
    function makeComputerMove() {
        if(gameended){
            return;
        }
        if(XcomputerPlayer) {
            if(b1.checked){
                if(oddTurn) {
                    setNoClickClass()
                    tout = setTimeout(() => {
                        selectTile(findBestMove(playerX, playerO));
                    }, 800);
                    return;
                }
            } else {
                if(oddTurn) {
                    setNoClickClass()
                    tout = setTimeout(() => {
                        selectTile(findRandomMove(playerX, playerO));
                    }, 800);
                    return;
                }
            }
        }
        if(OcomputerPlayer) {
            if(!oddTurn) {
                if(b2.checked){
                    if(!oddTurn) {
                        setNoClickClass()
                        tout = setTimeout(() => {
                            selectTile(findBestMove(playerO, playerX));
                        }, 800);
                    }
                } else {
                    if(!oddTurn) {
                        setNoClickClass()
                        tout = setTimeout(() => {
                            selectTile(findRandomMove(playerX, playerO));
                        }, 800);
                    }
                }
            }
        }
    }
    function alertWin(message){
        let winscreen = document.querySelector('#alert');
        winscreen.style.display = "flex";
        document.getElementById('message').innerText = message;
        document.addEventListener('keydown', a)
        document.getElementById('ok').addEventListener('click', a);
        function a(e){
            console.log(e)
            if(e.type == "keydown"){
                if(e.key == 'Enter'){
                    winscreen.style.display = "none";
                    reset();
                    makeComputerMove();
                    document.removeEventListener('keydown', a)
                }
            } else {
                winscreen.style.display = "none";
                    reset();
                    makeComputerMove();
                    document.removeEventListener('keydown', a);
            }
        }
    }
})()



function index(el) {
    if (!el) return -1;
    var i = 1;
    while (el = el.previousElementSibling) {
      i++;
    }
    return i;
  }
  
function check(arr) {
    arr.sort((a,b) => {return a - b});
    function check3(a) {
        if(comparesorted(a, [1, 2, 3]) || comparesorted(a, [4, 5, 6]) || comparesorted(a, [7, 8, 9]) || comparesorted(a, [1, 4, 7]) ||
        comparesorted(a, [2, 5, 8]) || comparesorted(a, [3, 6, 9]) || comparesorted(a, [1, 5, 9]) || comparesorted(a, [3, 5, 7])) {
            return true;
        } else return false;
    }
    function check4(a) {
        let triple = [];
        for(let i = 0; i < 4; i++) {
            triple = [];
            for(let k = 0; k < 4; k++) {
                if(k !== i) triple.push(a[k])
            }
            if(check3(triple) === true) return true;
        }
        return false;
    }
    function check5(a){
        let quad = [];
        for(let i = 0; i < 5; i++) {
            quad = [];
            for(let k = 0; k < 5; k++) {
                if(k !== i) quad.push(a[k])
            }
            if(check4(quad) === true) return true;
        }
        return false;
    }
    if(arr.length > 2) {
        if(arr.length === 3) {
            return check3(arr)
        } else if(arr.length === 4) {
            return check4(arr);
        } else return check5(arr)
    }
}

function comparesorted(a, b) {
    for(let i = 0; i < 3; i++) {
        if(a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

//____________Computer logic________________




function isMovesLeft(X, O) {
    return(!(O.length + X.length === 9));
}

function evaluate(Pl, Op) {
    if(check(Pl)) {
        return 10;
    }
    if(check(Op)) {
        return -10;
    }
    return 0;
}

function minimax(Pl, Op, ismax) {
    let score = evaluate(Pl, Op);
    if(score === 10) {
        return score;
    }
    if(score === -10){
        return score;
    }
    if(!isMovesLeft(Pl, Op)){
        return 0;
    }

    if(ismax) {
        let best = -1000;
        for(let i = 1; i < 10; i++){
            if(!(Pl.includes(i) || Op.includes(i))) {
                Pl.push(i);
                best = Math.max(best, minimax(Pl, Op, !ismax));
                Pl.splice(Pl.indexOf(i), 1);
            }
        }
        return best;
    } else {
        let best = 1000;
        for(let i = 1; i < 10; i++){
            if(!(Pl.includes(i) || Op.includes(i))) {
                Op.push(i);
                best = Math.min(best, minimax(Pl, Op, !ismax));
                Op.splice(Op.indexOf(i), 1);
            }
        }
        return best;
    }
}

function findBestMove(Pl, Op) {
    let bestVal = -1000;
    let bestMove = 1;
    for(let i = 1; i < 10; i++){
        if(!(Pl.includes(i) || Op.includes(i))) {
            Pl.push(i);
            let moveVal = minimax(Pl, Op, false);
            Pl.splice(Pl.indexOf(i), 1);
            if(moveVal > bestVal){
                bestVal = moveVal;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function findRandomMove(Pl, Op) {
    let a = [];
    for(let i = 1; i < 10; i++){
        if(!(Pl.includes(i) || Op.includes(i))) {
            a.push(i);
        }
    }
    return a[Math.floor((Math.random() * a.length))];
}

