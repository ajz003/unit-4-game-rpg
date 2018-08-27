$(document).ready(function () {

    // ----------- app state

    var easy = {
        healthPoints: 180,
        attackPower: 8,
        counterAttackPower: 50
    };

    var normal = {
        healthPoints: 120,
        attackPower: 2,
        counterAttackPower: 40
    };

    var heroic = {
        healthPoints: 100,
        attackPower: 8,
        counterAttackPower: 30
    };
    var legendary = {

        healthPoints: 80,
        attackPower: 2,
        counterAttackPower: 20
    };

    var characterArr = [easy, normal, heroic, legendary];

    var characterSelected = Boolean(false);
    var enemySelected = Boolean(false);




    $("#easy-hp").text(easy.healthPoints)
    $("#normal-hp").text(normal.healthPoints)
    $("#heroic-hp").text(heroic.healthPoints)
    $("#legendary-hp").text(legendary.healthPoints)


    // ----------- the game


    $(".character").click(function (e) {


        if (characterSelected === false) {

            $(".character").addClass("enemy-available");
            $(this).removeClass("enemy-available").addClass("your-character");
            $("#your-character").append($(this).parent())

            $($(".enemy-available").parent()).appendTo("#enemies-available");

            characterSelected = true;

        }

        if (enemySelected === false && $(this).hasClass("enemy-available")) {

            $(this).addClass("enemy-current");
            $("#defender").append($(this).parent());
            enemySelected = true;

        }


    });



    $(".btn").click(function (e) {

        if (characterSelected === true && enemySelected === true) {

        alert()

        }

    });





    // ----------- functions



    // --------- initialize application



});