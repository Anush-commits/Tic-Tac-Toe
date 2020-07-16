const board = document.getElementById('board').children;
const play = document.getElementById('newgame');
let newgame = false;
let turn = 0, first = 'X', second = 'O', winner = null, arr = [], humanScore = 0, compScore = 0;
const Finner = `<h1> ${first}</h1>`, SInner = `<h1 class='s'> ${second}</h1>`;
function lookAtHorizon(result, txt) {
  for (let f = 0; f < board.length; f++) {
    for (let w = 0; w < board[f].children.length; w++) {
      const cell = board[f].children[w];
      if (cell.textContent == txt) {
        let mycell = cell.parentNode.id;
        let arr = [...board[mycell].children].map(e => {
          if (e.textContent == txt) {
            return e.parentNode.id
          }
        }).filter(t => t !== undefined)
        if (arr.length !== 1) result = arr
      }
    }
  }
  return result;
}

function lookAtLeft(result, txt) {
  for (let i = 0; i < board.length; i++) {
    if (board[i].children[i].textContent == txt) result.push(board[i].children[i].id)
  }
  return result
}
function lookAtVertic(result, txt) {
  for (let i = 0; i < board.length; i++) {
    const element = board[i].children;
    for (let t = 0; t < element.length; t++) {
      if (element[t].textContent == txt) {
        let mycell = element[t].id;
        let arr = [...board].map(e => {
          if (e.children[mycell].textContent == txt) {
            return mycell
          }
        }).filter(t => t !== undefined);
        if (arr.length !== 1) result = arr;
      }
    }
  }
  return result
}
function lookAtRight(result, txt) {
  let n = 2;
  for (let t = 0; t < board.length; t++) {
    if (board[t].children[n].textContent == txt) result.push(board[t].children[n].id);
    n--;
  }
  return result;
}
for (let t = 0; t < board.length; t++) {
  const children = board[t].children;
  for (let a = 0; a < children.length; a++) {
    const cell = children[a];
    cell.addEventListener('click', function () {

      if (turn == 0 && winner == null && this.textContent == '') {
        this.innerHTML = `<h1>${first}</h1>`;
        turn++;
      }
   console.log(turn)
   if(turn > 0) {
     setTimeout(() => {
       
     
        let right = false, n = 2;
        for (let i = 0; i < board.length; i++) {
          const element = board[i].children[n];
          right = [...board[i].children].every(e => element.textContent !== '')
          n--;
        }
        if (lookAtVertic([], second).length == 2 && [...board].find(e => e.children[lookAtVertic([], second)[0]].textContent == '') && [...board].every(t => t.children[lookAtVertic([], second)[0]].textContent !== first)) {
          [...board].find(e => e.children[lookAtVertic([], second)[0]].textContent == '').children[lookAtVertic([], second)[0]].innerHTML = `<h1 id='s'>${second}</h1>`;
        }
        else if (lookAtHorizon([], second).length == 2 && [...board[lookAtHorizon([], second)[0]].children].every(y => y.textContent !== first)) {
          [...board[lookAtHorizon([], second)[0]].children].find(y => y.textContent == '').innerHTML = `<h1 id='s'>${second}</h1>`;
        }
        else if (lookAtHorizon([], first).length == 2 && ![...board[lookAtHorizon([], first)[0]].children].every(e => e.textContent !== '')) {
          [...board[lookAtHorizon([], first)[0]].children].find(t => t.textContent == '').innerHTML = `<h1 id='s'>${second}</h1>`;
        } else if (lookAtLeft([], first).length == 2 && ![...board].every((t, ind) => t.children[ind].textContent !== '')) {
          [...board].findIndex((t, ind) => { if (t.children[ind].textContent == '') t.children[ind].innerHTML = `<h1 id='s'>${second}</h1>` });
        } else if (lookAtVertic([], first).length == 2 && [...board].find(e => e.children[lookAtVertic([], first)[0]].textContent == '')) {
          [...board].find(e => e.children[lookAtVertic([], first)[0]].textContent == '').children[lookAtVertic([], first)[0]].innerHTML = `<h1 id='s'>${second}</h1>`;
        } else if (lookAtRight([], first).length == 2 && [...board].find(e => e.children[lookAtRight([], first)[0]].textContent == '') && !right) {
          let n = 2;
          for (let t = 0; t < board.length; t++) {
            if (board[t].children[n].textContent == '') board[t].children[n].innerHTML = `<h1 id='s'>${second}</h1>`
            n--;
          }
        } else {
          if ([...board].every((t, i) => t.children[i].textContent !== first)) {
            for (let a = 0; a < board.length; a++) {
              const element = board[a].children[a];
              if (element.textContent == '') {
                element.innerHTML = `<h1 id='s'>${second}</h1>`;
                break;
              }
            }
          }
          else if (true) {
            let n = 2;
            for (let t = 0; t < board.length; t++) {
              if (board[t].children[n].textContent == '') {
                board[t].children[n].innerHTML = `<h1 id='s'>${second}</h1>`;
                break;
              }
              else if (![...board[t].children].every(r => r.textContent !== '')) {
                [...board[t].children].find(e => e.textContent == '' ? e.innerHTML = `<h1 id='s'>${second}</h1>` : null);
                break;
              }
              n--;
            }
          }
        }

        if (lookAtRight([], first).length == 3 || lookAtLeft([], first).length == 3 || lookAtHorizon([], first).length == 3 || lookAtVertic([], first).length == 3) {
          winner = first;
        }
       else if (lookAtRight([], second).length == 3 || lookAtLeft([], second).length == 3 || lookAtHorizon([], second).length == 3 || lookAtVertic([], second).length == 3) {
          winner = second;
        }     else if ([...board].every(e => [...e.children].every(r => r.textContent !== '')) && winner == null) {
          setTimeout(() => {
            [...board].forEach(e => [...e.children].forEach(t => t.innerHTML = ''))
          }, 300);
        }
        turn--;
      }, 500);

        }
      setTimeout(() => {
        if (winner !== null) {
          [...board].forEach(e => [...e.children].forEach(t => t.innerHTML = ''))
          if (winner == first) {
            humanScore++;
            console.log('the first');
            winner = null;
          }
        else if (winner == second) {
            compScore++;
            console.log('the second');
            turn = 1;
           let randCell = Math.floor(Math.random()*3);
           [...board[randCell].children].find(e => e.textContent == '' ? e.innerHTML = `<h1 id='s'>${second}</h1>` : null);
           turn = 0; winner = null;
          } 
        }
        if (humanScore !== 0) {
         document.getElementById('humanScore').innerHTML = humanScore;
        }   if (compScore !== 0) {
          document.getElementById('compScore').innerHTML = compScore;
         }
      }, 1000);

    })
  }
}
