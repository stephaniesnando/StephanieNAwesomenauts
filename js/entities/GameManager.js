game.GameTimerManager = Object.extend({
    init: function(x, y, settings){
       this.now = new Date().getTime();
       this.lastCreep = new Date().getTime();
       this.paused = false;
       this.alwaysUpdate = true;
    },
    
    update: function(){
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();
        
        return true;
    },
    
    goldTimerCheck: function(){
        if(Math.round(this.now/1000)%20 === 0 && (this.now - this.lastCreep >= 1000)){
            game.data.gold += (game.data.exp1+1);
            console.log("Current gold: " + game.data.gold);
        }   
    },
    
    creepTimerCheck: function(){
        if(Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 1000)){
            this.lastCreep = this.now;
            var creep = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creep, 5);
        }
    }
});

game.HeroDeathManager = Object.extend({
    init: function(x, y, settings){
        this.alwaysUpdate = true;
    },
    
    update: function(){
        if(game.data.player.dead){
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10 , 0);
        }
    }
    
    
});

game.ExperienceManager = Object.extend({
   init: function(x, y, settings){
       this.alwaysUpdate = true;
       this.gameover = false;
   },
   
   update: function(){
       if(game.data.win === true && !this.gameover){
           this.gameOver(true);
       }else if(game.data.win === false && !this.gameover){
           this.gameOver(false);
       }
       
       return true;
   },
   
   gameOver: function(win){
       if(win){
        game.data.exp += 10;   
       }else{
        game.data.exp += 1; 
       }
       this.gameover = true;
       me.save.exp = game.data.exp;
       //For teesting purposes only
       me.save.exp2 = 4;
   }
   
});

game.SpendGold = Object.extend({
   init: function(x, y, settings){
       this.now = new Date().getTime();
       this.lastBuy = new Date().getTime();
       this.paused = false;
       this.alwaysUpdate = true;
       this.updateWhenPaused = true;
       this.buying = false;
   },
   
   update: function(){
       this.now = new Date().getTime();
       
      if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >= 1000){
          this.lastBuy = this.now;
          if(!this.buying){
              this.startBuying();
          }else{
              this.stopBuying();
          }
      } 
       
    return true;
   },
   
   startBuying: function(){
       this.buying = true;
       me.state.pause(me.state.PLAY);
       game.data.pausePos = me.game.viewport.localToWorld(0, 0);
       game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
       game.data.buyscreen.updateWhenPaused = true;
       game.data.buyscreen.setOpacity(0.8);
       me.game.world.addChild(game.data.buyscreen, 34);
       game.data.player.body.setVelocity(0, 0);
   },
   
   stopBuying: function(){
       this.buying = false;
       me.state.resume(me.state.PLAY);
       game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
       me.game.world.removeChild(game.data.buyscreen);
   }
   
});


