import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-vs-computer",
  templateUrl: "./vs-computer.page.html",
  styleUrls: ["./vs-computer.page.scss"]
})
export class VsComputerPage {
  public currentPlayer = "Your Turn";

  public count = 0;

  public playerOneScore = 0;
  public computerScore = 0;

  public playerOneWins = 0;
  public computerWins = 0;

  public lastMove = { userMove: "", computerMove: "" };

  public wins = [7, 56, 448, 73, 146, 292, 273, 84];

  public availMoves: number[] = [1, 2, 4, 8, 16, 32, 64, 128, 256];

  constructor(private alertCtrl: AlertController) {}

  checkWin(score: number) {
    let flag = 0;
    for (var i = 0; i < this.wins.length; i++) {
      if ((this.wins[i] & score) === this.wins[i]) {
        flag = 1;
        if (this.currentPlayer == "Computer") {
          this.alertCtrl
            .create({
              header: "Game Over",
              message: "Player One Wins",
              buttons: [
                {
                  text: "Ok",
                  handler: () => {
                    this.playerOneWins += 1;
                    this.newGame();
                  }
                }
              ]
            })
            .then(alertEl => {
              alertEl.present();
            });
        } else {
          this.alertCtrl
            .create({
              header: "Game Over",
              message: "Computer Wins",
              buttons: [
                {
                  text: "Ok",
                  handler: () => {
                    this.computerWins += 1;
                    this.newGame();
                  }
                }
              ]
            })
            .then(alertEl => {
              alertEl.present();
            });
        }
        return true;
      }
    }
    if (this.count == 9 && flag == 0) {
      this.alertCtrl
        .create({
          header: "Game Over",
          message: "It's a Draw",
          buttons: [
            {
              text: "Ok",
              handler: () => {
                this.newGame();
              }
            }
          ]
        })
        .then(alertEl => {
          alertEl.present();
        });
      return true;
    }
    return false;
  }

  onClick(ind: string) {
    var tile = <HTMLInputElement>document.getElementById(ind);
    this.currentPlayer = "Computer";
    tile.disabled = true;
    tile.style.color = "darkblue";
    tile.textContent = "X";
    this.playerOneScore += Number(ind);
    this.lastMove.userMove = ind;
    this.availMoves = this.availMoves.filter(data => data != Number(ind));
    console.log("player 1 score: " + this.playerOneScore);
    this.count += 1;
    if (!this.checkWin(this.playerOneScore) && this.count<10) {
      this.computerMove();
    }
  }

  move: number;
  computerMove(): number {
    this.calculateMove();
    let move = this.move;
    this.availMoves = this.availMoves.filter(data => data != move);
    var tile = <HTMLInputElement>document.getElementById(String(move));
    this.lastMove.computerMove = String(move);
    this.count += 1;
    this.currentPlayer = "Your Turn";
    tile.disabled = true;
    this.computerScore += move;
    tile.textContent = "O";
    tile.style.color = "red";

    console.log("player 2 score: " + this.computerScore);

    this.checkWin(this.computerScore);
    return;
  }

  calculateMove() {
    let flag = false;
    console.log(
      "player1: " + this.playerOneScore + "  computer: " + this.computerScore
    );
    this.wins.forEach(element => {
      if (
        this.availMoves.some(
          x => x == Math.abs((this.computerScore & element) - element)
        )
      ) {
        flag = true;
        this.move = Math.abs((this.computerScore & element) - element);
      }

      else if (
        this.availMoves.some(
          x => x == Math.abs((this.playerOneScore & element) - element)
        )
      ) {
        flag = true;
        this.move = Math.abs((this.playerOneScore & element) - element);
      }
    });
    
    if (!flag) {
      this.move = this.availMoves[
        Math.floor(Math.random() * this.availMoves.length)
      ];
    }
  }

  newGame() {
    for (var i = 1; i < 512; i * 2) {
      var tile = <HTMLInputElement>document.getElementById(i.toString());

      tile.textContent = "";
      tile.disabled = false;
      tile.style.backgroundColor = "white";
      i += i;
    }
    this.availMoves = [1, 2, 4, 8, 16, 32, 64, 128, 256];
    this.playerOneScore = 0;
    this.computerScore = 0;
    this.count = 1;
    this.currentPlayer = "Player One";
  }

  onUndo() {
    var tile = <HTMLInputElement>(
      document.getElementById(this.lastMove.userMove)
    );
    tile.textContent = "";
    tile.disabled = false;
    this.playerOneScore -= Number(this.lastMove.userMove);

    var tile = <HTMLInputElement>(
      document.getElementById(this.lastMove.computerMove)
    );
    tile.textContent = "";
    tile.disabled = false;
    this.computerScore -= Number(this.lastMove.computerMove);
    this.count -= 1;
    this.currentPlayer = "Your Turn";
    console.log("player 1 score: " + this.playerOneScore);
  }

  onNewGame() {
    this.alertCtrl
      .create({
        header: "Are you sure?",
        message: "Start a New Game?",
        buttons: [
          {
            text: "Yes",
            handler: () => {
              this.newGame();
            }
          },
          {
            text: "No",
            role: "Cancel"
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }
}
