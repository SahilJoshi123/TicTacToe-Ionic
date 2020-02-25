import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";


@Component({
  selector: 'app-two-player',
  templateUrl: './two-player.page.html',
  styleUrls: ['./two-player.page.scss'],
})
export class TwoPlayerPage {
  public currentPlayer = "Player One";

  public count = 1;

  public playerOneScore = 0;
  public playerTwoScore = 0;

  public playerOneWins = 0;
  public playerTwoWins = 0;

  public lastMove = { currentPlayer: "", tilePosition: "" };

  public wins = [7, 56, 448, 73, 146, 292, 273, 84];

  constructor(private alertCtrl: AlertController) {}


  checkWin(score: number) {
    let flag = 0;
    for (var i = 0; i < this.wins.length; i++) {
      if ((this.wins[i] & score) === this.wins[i]) {
        flag = 1;
        if (this.currentPlayer == "Player Two") {
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
              message: "Player Two Wins",
              buttons: [
                {
                  text: "Ok",
                  handler: () => {
                    this.playerTwoWins += 1;
                    this.newGame();
                  }
                }
              ]
            })
            .then(alertEl => {
              alertEl.present();
            });
        }
      }
    }
    if (this.count == 10 && flag == 0) {
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
      return;
    }
  }

  onClick(ind: string) {
    this.count += 1;
    var tile = <HTMLInputElement>document.getElementById(ind);
    if (this.count % 2 == 0) {
      this.currentPlayer = "Player Two";
      tile.disabled = true;
      tile.style.color = "darkblue";
      tile.textContent = "X";
      this.playerOneScore += Number(ind);
      this.lastMove.currentPlayer = "1";
      this.lastMove.tilePosition = ind;
      console.log("player 1 score: "+this.playerOneScore)
      this.checkWin(this.playerOneScore);
    } else if (this.count % 2 != 0) {
      this.currentPlayer = "Player One";
      tile.disabled = true;
      this.playerTwoScore += Number(ind);
      tile.textContent = "O";
      tile.style.color = "red";

      this.lastMove.currentPlayer = "2";
      this.lastMove.tilePosition = ind;

      console.log("player 2 score: "+this.playerTwoScore)

      this.checkWin(this.playerTwoScore);
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
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
    this.count = 1;
    this.currentPlayer = "Player One";
  }

  onUndo() {
    if(this.lastMove.currentPlayer === "1"){
      var tile = <HTMLInputElement>document.getElementById(this.lastMove.tilePosition)
      tile.textContent = "";
      tile.disabled = false;
      this.playerOneScore -= Number(this.lastMove.tilePosition)
      this.count -= 1;
      this.currentPlayer = "Player One";
      console.log("player 1 score: "+this.playerOneScore)
    }
    else{
      var tile = <HTMLInputElement>document.getElementById(this.lastMove.tilePosition)
      tile.textContent = "";
      tile.disabled = false;
      this.playerTwoScore -= Number(this.lastMove.tilePosition)
      this.count -= 1;
      this.currentPlayer = "Player Two";
      console.log("player 2 score: "+this.playerTwoScore)
    }
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
