$(document).ready(function () {




    // ----------- app state

    var timesAttacked = 0

    var easy = {
        name: "easy",
        pronoun: "Darth Sidious",
        healthPoints: 100,
        attackPower: 100,
        counterAttackPower: 50,
        attackPowerGrowth: 25
    };

    var normal = {
        name: "normal",
        pronoun: "Obi-Wan Kenobi",
        healthPoints: 150,
        attackPower: 30,
        counterAttackPower: 30,
        attackPowerGrowth: 10,
    };

    var heroic = {
        name: "heroic",
        pronoun: "Chewbacca",
        healthPoints: 200,
        attackPower: 20,
        counterAttackPower: 10,
        attackPowerGrowth: 15
    };
    var legendary = {
        name: "legendary",
        pronoun: "Luke Skywalker",
        healthPoints: 150,
        attackPower: 4,
        counterAttackPower: 20,
        attackPowerGrowth: undefined
    };

    var characterArr = [easy, normal, heroic, legendary];
    var characterNameArr = [easy.name, normal.name, heroic.name, legendary.name];

    var isCharacterSelected = Boolean(false);
    var isEnemySelected = Boolean(false);
    var gameOver = Boolean(false);
    var yourCharacter = undefined;
    var opponentCharacter = undefined;
    var wins = 0






    $("#easy-hp").text(easy.healthPoints)
    $("#normal-hp").text(normal.healthPoints)
    $("#heroic-hp").text(heroic.healthPoints)
    $("#legendary-hp").text(legendary.healthPoints)

    $("#game-notes").css("visibility", "hidden")
    $("#restart").css("visibility", "hidden")



    // ----------- the character clicking


    $(".character").click(function (e) {


        console.log("This.parent: "+this.parent)



        if (isCharacterSelected === false) {

            $(".character").addClass("enemy-available");
            $(this).removeClass("enemy-available").addClass("your-character");

            $("#your-character").append($(this).parent())

            $($(".enemy-available").parent()).appendTo("#enemies-available");
            
            $("#your-character").find("*").css("border-color", "#7578ff")
            $("#enemies-available").find("*").css("border-color", "#88ff4f")



            for (var i = 0; i < characterNameArr.length; i++) {
                var you = $(this).attr("id")
                console.log("you: " + you);
                console.log("characterNameArr: " + characterNameArr[i]);

                if (characterNameArr[i] === you) {
                    yourCharacter = characterArr[i];

                }

            }

            console.log("you final: " + yourCharacter.name)
            isCharacterSelected = true;

        }

        if (isEnemySelected === false && $(this).hasClass("enemy-available")) {

            $(this).addClass("enemy-current");
            $("#defender").append($(this).parent());
            $("#defender").find("*").css("border-color", "red")

            for (var i = 0; i < characterNameArr.length; i++) {
                var you = $(this).attr("id")
                console.log("you: " + you);
                console.log("characterNameArr: " + characterNameArr[i]);

                if (characterNameArr[i] === you) {
                    opponentCharacter = characterArr[i];

                }

            }

            $("#game-notes").css("visibility", "visible")

            console.log("opponent final: " + opponentCharacter.name)
            $("#game-notes").text("You have challenged " + opponentCharacter.pronoun + " . May the Force be with you.")

            isEnemySelected = true;

            



        }


    });

    // ----------- the attack button


    $(".btn").click(function (e) {

        console.log(isCharacterSelected)
        console.log(isEnemySelected)
        console.log(gameOver)

        var you = yourCharacter
        var opponent = opponentCharacter

        if (isCharacterSelected === true && isEnemySelected === true && gameOver === false && opponent.healthPoints > 0 && you.healthPoints > 0) {

            $("#game-notes").show()

            timesAttacked++


            legendary.attackPowerGrowth = you.attackPower

            opponent.healthPoints -= you.attackPower;
            you.healthPoints -= opponent.counterAttackPower;
            $("#game-notes").text("You attacked " + opponent.pronoun + " for " + you.attackPower + " damage. " + opponent.pronoun + " attacked you back for " + opponent.counterAttackPower + " damage.")
            you.attackPower += you.attackPowerGrowth;

        

            $("#easy-hp").text(easy.healthPoints)
            $("#normal-hp").text(normal.healthPoints)
            $("#heroic-hp").text(heroic.healthPoints)
            $("#legendary-hp").text(legendary.healthPoints)

            if (opponent.healthPoints <= 0 && you.healthPoints > 0 && gameOver === false) {
                wins++;
                $("#defender").empty()
                if (wins < 3) {

                    $("#game-notes").text("You have defeated " + opponent.pronoun + " . You can choose to fight another enemy.")
                    isEnemySelected = false;
                }
            }

        }

        else {
            $("#game-notes").text("No enemy here.")
        }

        if (you.healthPoints <= 0) {
            $("#game-notes").text("You lose.")
            gameOver === true;
            $("#restart").css("visibility", "visible")

        }

        if (wins === 3) {
            $("#game-notes").text("You win!")
            gameOver === true;
            $("#restart").css("visibility", "visible")

        }


    });


    $("#restart").click(function (e) {

        window.location.reload();

    });

    // ----------- functions





    // --------- initialize application



});