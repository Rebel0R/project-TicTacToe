let player1 = "";
let player2 = "";
let rodadas = 1;
const tabuleiro = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const form = document.querySelector(".form-players");
const restart = document.querySelector("#reset-button");

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  const playerX = document.getElementById("name-player1");
  const playerO = document.getElementById("name-player2");
  if (playerX.value === "" || playerO.value === "") {
    alert("Campos vázios detectados!\nPreencha os campos corretamente!");
    return;
  }
  player1 = playerX.value;
  player2 = playerO.value;
  alert("Jogador1: " + player1 + " cadastrado!\nJogador2: " + player2 + " cadastrado!");
  playerX.value = "";
  playerO.value = "";
  document.getElementById("title-players").innerText = "Regras do Jogo:";
  document.querySelector("#rules").style.display = "block";
  document.querySelector(".board").style.display = "grid";
  form.style.display = "none";
  document.querySelector("#player-turn").value = player1;
});

document.querySelectorAll(".space-board").forEach(function (key) {
  key.addEventListener("click", function () {
    if (rodadas % 2 !== 0) {
      key.innerText = "X";
      document.querySelector("#player-turn").value = player2;
    } else {
      key.innerText = "O";
      document.querySelector("#player-turn").value = player1;
    }
    rodadas += 1;
    this.disabled = true;
    this.style.pointerEvents = "none";
    this.style.backgroundColor = "#1f2883";
    const campo = this.dataset.value;
    switch (parseInt(campo)) {
      case 0:
        tabuleiro[0][0] = this.innerText;
        break;
      case 1:
        tabuleiro[0][1] = this.innerText;
        break;
      case 2:
        tabuleiro[0][2] = this.innerText;
        break;
      case 10:
        tabuleiro[1][0] = this.innerText;
        break;
      case 11:
        tabuleiro[1][1] = this.innerText;
        break;
      case 12:
        tabuleiro[1][2] = this.innerText;
        break;
      case 20:
        tabuleiro[2][0] = this.innerText;
        break;
      case 21:
        tabuleiro[2][1] = this.innerText;
        break;
      case 22:
        tabuleiro[2][2] = this.innerText;
        break;
      default:
        console.log("Erro!");
    }
    const regiaoVitoria = verificarVitoria();
    if (regiaoVitoria.length > 0) {
      marcarVitoria(regiaoVitoria);
      document.querySelector(".selected-player").style.display = "none";
      if (rodadas % 2 === 0) {
        document.getElementById("title-players").innerText =
          "Parabéns, " + player2 + "! Você venceu!🎉";
      } else {
        document.getElementById("title-players").innerText =
          "Parabéns, " + player1 + "! Você venceu!🎉";
      }
      restart.style.display = "block";
    } else if (!tabuleiro.flat().includes("")) {
      document.getElementById("title-players").innerText = "Deu Velha!";
      restart.style.display = "block";
    }
  });
});

restart.addEventListener("click", function () {
  document.location.reload(true);
});

function marcarVitoria(regions) {
  regions.forEach(function (region) {
    document.querySelector('button[data-value="' + region + '"]').style.backgroundColor = "#008000";
    console.log(rodadas);
    rodadas = rodadas - 1;
  });
}

function verificarVitoria() {
  const regVit = [];
  //realizando verificações em linha
  if (
    tabuleiro[0][0] &&
    tabuleiro[0][0] === tabuleiro[0][1] &&
    tabuleiro[0][0] === tabuleiro[0][2]
  ) {
    regVit.push("00", "01", "02");
  }
  if (
    tabuleiro[1][0] &&
    tabuleiro[1][0] === tabuleiro[1][1] &&
    tabuleiro[1][0] === tabuleiro[1][2]
  ) {
    regVit.push("10", "11", "12");
  }
  if (
    tabuleiro[2][0] &&
    tabuleiro[2][0] === tabuleiro[2][1] &&
    tabuleiro[2][0] === tabuleiro[2][2]
  ) {
    regVit.push("20", "21", "22");
  }
  //realizando verificaçã em coluna
  if (
    tabuleiro[0][0] &&
    tabuleiro[0][0] === tabuleiro[1][0] &&
    tabuleiro[0][0] === tabuleiro[2][0]
  ) {
    regVit.push("00", "10", "20");
  }
  if (
    tabuleiro[0][1] &&
    tabuleiro[0][1] === tabuleiro[1][1] &&
    tabuleiro[0][1] === tabuleiro[2][1]
  ) {
    regVit.push("01", "11", "21");
  }
  if (
    tabuleiro[0][2] &&
    tabuleiro[0][2] === tabuleiro[1][2] &&
    tabuleiro[0][2] === tabuleiro[2][2]
  ) {
    regVit.push("02", "12", "22");
  }
  //realizando verificações nas diagonais
  if (
    tabuleiro[0][0] &&
    tabuleiro[0][0] === tabuleiro[1][1] &&
    tabuleiro[0][0] === tabuleiro[2][2]
  ) {
    regVit.push("00", "11", "22");
  }
  if (
    tabuleiro[0][2] &&
    tabuleiro[0][2] === tabuleiro[1][1] &&
    tabuleiro[0][2] === tabuleiro[2][0]
  ) {
    regVit.push("02", "11", "20");
  }
  return regVit;
}
