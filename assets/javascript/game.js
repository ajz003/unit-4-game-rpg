$(document).ready(function () {

    // ----------- app state (sound effects)

    var attack1 = new Audio("assets/audio/clash1.wav");
    var attack2 = new Audio("assets/audio/clash2.wav");
    var attack3 = new Audio("assets/audio/clash3.wav");
    var attack4 = new Audio("assets/audio/clash4.wav");

    var start = new Audio("assets/audio/start.wav");
    var start2 = new Audio("assets/audio/enemy.wav");

    var loss1 = new Audio("assets/audio/laughfuzzball.mp3");
    var loss2 = new Audio("assets/audio/WilhelmScream.mp3");
    var loss3 = new Audio("assets/audio/chosenone.mp3");

    var victory = new Audio("assets/audio/star-wars-theme.mp3");

    var attackSounds = [attack1, attack2, attack3, attack4];
    var lossSounds = [loss1, loss2, loss3];

    // ----------- app state (character stats)

    var timesAttacked = 0

    var easy = {
        name: "easy",
        pronoun: "Darth Sidious",
        healthPoints: 100,
        attackPower: 75,
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

    // ----------- app state (character selections + Text Set-up)

    var isCharacterSelected = false;
    var isEnemySelected = false;
    var gameOver = false;
    var yourCharacter = undefined;
    var opponentCharacter = undefined;
    var wins = 0

    $("#easy-hp").text(easy.healthPoints)
    $("#normal-hp").text(normal.healthPoints)
    $("#heroic-hp").text(heroic.healthPoints)
    $("#legendary-hp").text(legendary.healthPoints)

    $("#game-notes").css("visibility", "hidden")
    $("#restart").css("visibility", "hidden")

    // ----------- Character Select

    $(".character").click(function (e) {

        if (isCharacterSelected === false) {

            $(".character").addClass("enemy-available");
            $(this).removeClass("enemy-available").addClass("your-character");

            $("#your-character").append($(this).parent())

            $($(".enemy-available").parent()).appendTo("#enemies-available");

            $("#your-character").find("*").css("border-color", "#7578ff")
            $("#enemies-available").find("*").css("border-color", "#88ff4f")

            start.play();

            for (var i = 0; i < characterNameArr.length; i++) {
                var you = $(this).attr("id")

                if (characterNameArr[i] === you) {
                    yourCharacter = characterArr[i];

                }

            }

            isCharacterSelected = true;

        }

        // ----------- Opponent Select

        if (isEnemySelected === false && $(this).hasClass("enemy-available")) {

            $("#game-notes").css("visibility", "visible")

            $(this).addClass("enemy-current");
            $("#defender").append($(this).parent());
            $("#defender").find("*").css("border-color", "red")

            start2.play();

            for (var i = 0; i < characterNameArr.length; i++) {
                var you = $(this).attr("id")

                if (characterNameArr[i] === you) {
                    opponentCharacter = characterArr[i];

                }

            }
            isEnemySelected = true;

            $("#game-notes").text("You have challenged " + opponentCharacter.pronoun + " . May the Force be with you.")

        }

    });

    // ----------- Attack Button

    $(".btn").click(function (e) {

        var you = yourCharacter
        var opponent = opponentCharacter

        if (isCharacterSelected === true && isEnemySelected === true && gameOver === false && opponent.healthPoints > 0 && you.healthPoints > 0) {

            var x = (Math.floor(Math.random() * 4))
            attackSounds[x].play();

            timesAttacked++

            legendary.attackPowerGrowth = you.attackPower // This gives Luke exponential Attack Power Growth!

            opponent.healthPoints -= you.attackPower;
            you.healthPoints -= opponent.counterAttackPower;
            $("#game-notes").text("You attacked " + opponent.pronoun + " for " + you.attackPower + " damage. " + opponent.pronoun +
                " attacked you back for " + opponent.counterAttackPower + " damage.")
            you.attackPower += you.attackPowerGrowth;

            $("#easy-hp").text(easy.healthPoints)
            $("#normal-hp").text(normal.healthPoints)
            $("#heroic-hp").text(heroic.healthPoints)
            $("#legendary-hp").text(legendary.healthPoints)

            // ----------- Winning and Losing

            if (opponent.healthPoints <= 0 && you.healthPoints > 0 && gameOver === false) {
                wins++;
                $("#defender").empty()
                if (wins < 3) {

                    $("#game-notes").text("You have defeated " + opponent.pronoun + " . You can choose to fight another enemy.")
                    isEnemySelected = false;
                }
            }

        } else if (gameOver === false) {
            $("#game-notes").text("No enemy here.")
        }

        if (you.healthPoints <= 0 && gameOver === false) {
            var x = (Math.floor(Math.random() * 3))

            $("#game-notes").text("You lose.")

            setTimeout(function () {
                lossSounds[x].play();
            }, 1400);
            $("#restart").css("visibility", "visible")
            gameOver = true;

        }

        if (wins === 3) {
            $("#game-notes").text("You win!")
            setTimeout(function () {
                victory.play();
            }, 1500);

            $("#restart").css("visibility", "visible")
            gameOver = true;
        }

    });

    // ----------- Restart Button

    $("#restart").click(function (e) {

        window.location.reload();

    });

});