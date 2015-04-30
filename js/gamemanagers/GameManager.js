game.ExperienceManager = Object.extend({
   init: function(x, y, settings){
       this.alwaysUpdate = true;
       this.gameover = false;
   },
   
   update: function(){
       //okay so this will look at the data stuff and if we win obviously rhere will be a message alerting that you won.
       if(game.data.win === true && !this.gameover){
           this.gameOver(true);
           alert ("YOU WIN!");
       }else if(game.data.win === false && !this.gameover){
           this.gameOver(false);
           //vise versa for if you lose
           alert ("YOU LOSE!");
       }
       
       return true;
   },
   
   gameOver: function(win){
       if(win){
        game.data.exp += 10;   
        //if the player wins then wew gain 10 ppoints of experience
       }else{
        game.data.exp += 1; 
        //if the player loses we only get 1 point
       }
       this.gameover = true;
       me.save.exp = game.data.exp; //saves the experience
       
            $.ajax({
            type: "POST",
            url: "php/controller/save-user.php",
            data: {
               exp: game.data.exp,
               exp1: game.data.exp1,
               exp2: game.data.exp2,
               exp3: game.data.exp3,
               exp4: game.data.exp4, 
            },
            dataType: "text"
        })
                .success(function(response) {
                    if (response === "true") {
                        me.state.change(me.state.MENU);
                    } else {
                        alert(response);
                    }
                })
                .fail(function(response) {
                    alert: ("Fail");
                });
    }
   
});




