'use scrict'
/*
Правила игры : 
    Значения очков каждой карты: от двойки до десятки — соответственно от 2 до 10, у туза — 1 или 11 (11 пока общая сумма не больше 11, далее 1), у т. н. картинок (король, дама, валет) — 10.
    Если у игрока и дилера число очков на руках равное, то такая ситуация называется «Ровно», часто в казино это называют «Стей» — от англ. stay, в английском языке это звучит как Push (Пуш). В такой ситуации все остаются при своих ставках, никто не выигрывает и не проигрывает. Хотя в различных казино могут быть исключения и при «пуше» выигрывает казино.
    Игроки делают ставки, кладя фишки на соответствующие поля игрового стола. Ставки делаются до раздачи карт. После того, как первая карта сдана, игрокам запрещается делать ставки и прикасаться к своим фишкам.
    Если у игрока сразу после раздачи набралось 21 очко (то есть у игрока туз и 10 или туз и картинка), то такая ситуация и называется блек-джек. В таком случае игроку сразу выплачивается выигрыш 3 к 2 (то есть в 1,5 раза превышающий его ставку). Исключение составляют случаи, когда дилеру первой картой (открытой) попадается 10, картинка или туз. В этом случае существует вероятность, что у дилера также будет блек-джек, поэтому игроку с блек-джеком предлагается либо взять выигрыш 1 к 1 (только если первая карта дилера — туз), либо дождаться окончания кона игры (и в случае, если у дилера не блек-джек, получить выигрыш 3 к 2).
    Если у игрока после взятия новой карты сумма очков превысит 21, то такая ситуация называется «перебор». Дилер произносит «много» и снимает ставку игрока в пользу казино.
    После того, как все игроки завершили брать карты, дилер говорит «себе» и раздаёт карты себе. Общее правило блек-джека состоит в том, что дилер обязан остановиться, как только наберёт 17 очков или выше, и обязан брать, пока не достигнет (даже если у всех не перебравших меньше очков). В различных казино может варьироваться правило, должен ли дилер останавливаться в ситуации, если у него туз и шестёрка (то есть 7 или 17 очков на руке). Обычно это правило написано на игровом столе.
*/

/* Стол */

var zIndex=100; // z-index для карт и фишек

var deck={
//Все карты перед раздачей
	baseDeck: [
		'b02','b03','b04','b05','b06','b07','b08','b09','b10','b11','b12','b13','b14',
		'h02','h03','h04','h05','h06','h07','h08','h09','h10','h11','h12','h13','h14',
		'p02','p03','p04','p05','p06','p07','p08','p09','p10','p11','p12','p13','p14',
		'k02','k03','k04','k05','k06','k07','k08','k09','k10','k11','k12','k13','k14'
	],
// Когда перетасовывается колода
    shoe: [],
// Функция, которая выбирает номер карты и засовывает в shoe.
	shuffleDeck: function() {
		this.shoe =this.baseDeck;
		for(i=0; i<this.shoe.length; i++){
			var randomPlace=Math.floor(Math.random()*50)+1;
			var currentPlace=this.shoe[i];
			this.shoe[i]=this.shoe[randomPlace];
			this.shoe[randomPlace]=currentPlace
		}
	}
	
}

/* Диллер*/

var diller = {
    getCard: function(curHand) {
		var q=curHand.push(deck.shoe.shift());
		if (deck.shoe.length == 0) {//если закончились карты,берем новую колоду
            deck.shuffleDeck();
        }
		this.checkValue(curHand);
		showCards(curHand, q)
	},

    //Дилер добирает карты, после того как игрок уже взял
    	play: function() {
		while(this.hand['value']<17){
            this.getCard(this.hand)
        }
        if(this.hand['value'] > 21 || this.hand['value']< player.hand['value']) {
            return true
        } else 
            return false
	},
    //все карты дилера
    hand: [],
	
	checkValue: function (hand) {
		var handValue = 0;
		var acePos=0;
		for(card in hand){
			if (card == 'value' || card == 'name') continue;
			var cardNum = parseInt(hand[card].slice(1), 10);
			if(cardNum <= 10){
                handValue += cardNum
            }
            else if(cardNum < 14){
                handValue += 10
            }else {
                acePos++
            }
		}
		if(acePos>0){
			for(var i=1; i<=acePos; i++){
				if((handValue+11)>21){
                    handValue+=1
                }
                else handValue+=11;
			}
		}
		hand['value'] = handValue
	}

}

/* Игрок*/
var player={

	hit: function() {
		diller.getCard(this.hand);
		if(this.hand['value']<=21) {
            return false
        } else 
            return true
	},
		
	hand: [],
	
	money : 1000,
	
	bet : 0
}

/* Главный функционал*/

$(function(){
    deck.shuffleDeck();
	imagePreload();
	$('.chip').click(function() {
        
		var randomPos = Math.floor(Math.random()*15);
		var ranLeft= 350 - $(this).position().left + randomPos;
		var ranBot = 100 + parseInt($(this).css('marginTop')) + randomPos;
		$(this)
			.find('img')
			.first()
			.stop(true, true)
			.clone()
			.appendTo($(this))
            .addClass("inGame")
			.css('z-index', ++zIndex).animate({
				left: ranLeft,
				bottom: ranBot
			}, 500);
		var temBet=parseInt(($(this).attr('class')).substr(6,3));
		player.bet+=temBet;
		player.money-=temBet;
		showMeMyMoney();
		$('#deal').show()
        //скрываем фишки, если сумма меньше чем вес фишки
        if(player.money < 5){
            $('.c5').hide();
        }else if(player.money < 10){
            $('.c10').hide();
        }else if(player.money < 50){
            $('.c50').hide();
        }else if(player.money < 100){
            $('.c100 >img:first-child').hide().css("cursor", "default");
            $('.c100 >img:first-child').hide().css("z-index", -10);
            $('.c100').css("cursor", "default");
        };
	});

    $('#deal').click(function() {
        $("#chips > img:not(.inGame)").not(".inGame").parent().css({"z-index": "1", "cursor": "default"});
       
		player.hand['name']='player';
		diller.hand['name']='diller';
		$('#deal, .chip img:first-child').hide();
		for(var i=0; i<2; i++){
			diller.getCard(player.hand);
			diller.getCard(diller.hand)
		}
        $('#stay, #hit').show();
            if(player.hand['value'] == 21){
                player.money+=(player.bet*3);
                showResult('BlackJack');
        }
        test();
	});

    $('#hit').click(function() {if(player.hit())showResult('BUST!')});
	
	$('#stay').click(function(event) {
		if(diller.play()) {
			player.money+=(player.bet*2);
			showResult('YOU WIN');
            eventstopPropagation();
		} else {
            showResult('YOU LOOSE');
            //  $(".btn").attr('disabled','disabled');
            }
	});
    });

    function showCards(hand, position) {
	var handName = hand['name'];
	var toShow = '';
	handName == 'player' ? toShow = 405 : toShow = 20;
	$('#gameField img')
		.eq(deck.shoe.length)
		.css('z-index', ++zIndex)
		.addClass(handName)
		.show()
		.animate({
			top: toShow,
			right: 455-(position*25)
		},
        {   queue:true, 
            duration : 500}
        );
	$('.curValue.'+hand['name']).html(hand['value']);
    }

    function showResult(message) {
        $('#resultMessage').slideToggle('fast').html(message);
        player.bet=0;
        showMeMyMoney();
        player.hand.length=	diller.hand.length=0;
        setTimeout(function() {
            $('#deal, #stay, #hit, #resultMessage').fadeOut('fast');
            $('#gameField, .curValue').empty();
            imagePreload();
            $('.chip img:not(:first-child)').remove();
            $('.chip img:first-child').fadeIn('slow')
        }, 2000)
    }
    //анимация денег
	function showMeMyMoney() {
		$('#bet').find('span').fadeOut('fast').html(player.bet).fadeIn('fast');
		$('#money').find('span').fadeOut('fast').html(player.money).fadeIn('fast')
	}
    //подгрузка предворительно карты
    function imagePreload() {
        for(var i=0; i<deck.shoe.length; i++) {
            $('#gameField').prepend('<img class="cardM" src="img/cards/'+deck.shoe[i]+'.png" alt="card"/>\n')
        }
    }

    function test(){
        $(".inGame").click(function(event){
            event.preventDefault();
        })
    }


