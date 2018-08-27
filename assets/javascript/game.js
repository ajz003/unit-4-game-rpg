$(document).ready(function () {

    // ----------- app state

    var timesAttacked = 0

    var easy = {
        name: "easy",
        healthPoints: 200,
        attackPower: 30,
        counterAttackPower: 30,
        attackPowerGrowth: 10
    };

    var normal = {
        name: "normal",
        healthPoints: 150,
        attackPower: 15,
        counterAttackPower: 20,
        attackPowerGrowth: 10,
    };

    var heroic = {
        name: "heroic",
        healthPoints: 120,
        attackPower: 8,
        counterAttackPower: 10,
        attackPowerGrowth: 8
    };
    var legendary = {
        name: "legendary",
        healthPoints: 100,
        attackPower: 1,
        counterAttackPower: 5,
        attackPowerGrowth: undefined
    };

    var characterArr = [easy, normal, heroic, legendary];
    var characterNameArr = [easy.name, normal.name, heroic.name, legendary.name];

    var isCharacterSelected = Boolean(false);
    var isEnemySelected = Boolean(false);
    var yourCharacter = undefined;
    var opponentCharacter = undefined;
    var wins = 0






    $("#easy-hp").text(easy.healthPoints)
    $("#normal-hp").text(normal.healthPoints)
    $("#heroic-hp").text(heroic.healthPoints)
    $("#legendary-hp").text(legendary.healthPoints)



    // ----------- the game


    $(".character").click(function (e) {


        if (isCharacterSelected === false) {

            $(".character").addClass("enemy-available");
            $(this).removeClass("enemy-available").addClass("your-character");
            $("#your-character").append($(this).parent())

            $($(".enemy-available").parent()).appendTo("#enemies-available");



            for (var i = 0; i < characterNameArr.length; i++) {
                var you = $(this).attr("id")
                console.log("you: "+you);
                console.log("characterNameArr: "+characterNameArr[i]);

                if (characterNameArr[i] === you) {
                    yourCharacter = characterArr[i];            

                }

            }

            console.log("you final: "+ yourCharacter.name)
            isCharacterSelected = true;

        }

        if (isEnemySelected === false && $(this).hasClass("enemy-available")) {

            $(this).addClass("enemy-current");
            $("#defender").append($(this).parent());

            for (var i = 0; i < characterNameArr.length; i++) {
                var you = $(this).attr("id")
                console.log("you: "+you);
                console.log("characterNameArr: "+characterNameArr[i]);

                if (characterNameArr[i] === you) {
                    opponentCharacter = characterArr[i];            

                }

            }

            console.log("opponent final: "+ opponentCharacter.name)

            isEnemySelected = true;



        }


    });



    $(".btn").click(function (e) {

        if (isCharacterSelected === true && isEnemySelected === true) {

            timesAttacked++
            var you = yourCharacter
            var opponent = opponentCharacter

            legendary.attackPowerGrowth = you.attackPower

                opponent.healthPoints -= you.attackPower;
                you.healthPoints -= opponent.counterAttackPower;
                you.attackPower += you.attackPowerGrowth;

                console.log("opp hp: "+opponent.healthPoints);
                console.log("opp cap: "+opponent.counterAttackPower);
                console.log("you hp: "+you.healthPoints);
                console.log("you ap: "+you.attackPower);


            if (opponent.healthPoints <= 0) {
            wins++;
            $("#defender").empty()
            isEnemySelected = false;

            }


            if (you.healthPoints <= 0) {
                alert("You lose.")
            }

            if (wins === 3) {
                alert("You win!")
            }
        }

    });





    // ----------- functions







    // --------- initialize application



});