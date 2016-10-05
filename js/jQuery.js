
$(document).ready(function() {
  vocabList();

  // WORD
  function drop(word) {
    word.id = "currWord";
    $('#word').append(word);
    $('#currWord').animate({
      top:"+=400"
    },10000);
    wordRemaining = setTime;
  };

  // DIFFICULT TIMER
  var difficulty = 10000;
  var counting = false;
  var remaining = 60;
  $('#countdown').text(remaining);

  $('.secs').hide();
  var wordRemaining = 12;
  $('#easy').click(function() {
    wordRemaining = 12;
    $('#easy').addClass("clicked");
    $('#medium').removeClass("clicked");
    $('#hard').removeClass("clicked");
  });
  $('#medium').click(function() {
    wordRemaining = 10;
    $('#medium').addClass("clicked");
    $('#easy').removeClass("clicked");
    $('#hard').removeClass("clicked");
  });
  $('#hard').click(function() {
    wordRemaining = 6;
    $('#hard').addClass("clicked");
    $('#medium').removeClass("clicked");
    $('#easy').removeClass("clicked");
  });
  var setTime = wordRemaining;

  // SCORE SET
  var score = 0;
  $('#score').text(score);

  vocabList();

  var keyArray = Object.keys(vocab);
  var content = "";

  $('#answer').prop("disabled",true);

  // BUTTON CLICK
  $('#start').click(function() {
    $('#answer').prop("disabled",false);
    $('#answer').val("");
    $('#answer').focus();
    $('#word').empty();
    remaining = 60;
    score = 0;
    $('#score').text(score);
    vocabList();
    keyArray = Object.keys(vocab);

    //STOP BUTTON
    $('#stop').click(function() {
      remaining = 0;
      $('#start').text("Start");
    });

    // MAIN TIMER
    $('#start').text("Reset");
    if (counting == false) {
      var countdown = setInterval(function() {
        counting = true;
        remaining -= 1;
        $('#countdown').text(remaining);
        if (remaining <= 0) {
          $('#answer').val("");
          $('#answer').prop("disabled",true);
          clearInterval(countdown);
          clearInterval(wordCountdown);
          wordRemaining = setTime;
          $('.secs').hide();
          $('#wordCountdown').hide();
          $('#currWord').remove();
          $('#view').show();
          remaining = 0;
          $('#countdown').text(remaining);
          counting = false;
        }
      },1000);
    };

    // WORD TIMER
    $('.secs').show();
    $('#wordCountdown').show();
    $('#view').hide();
    if (counting == false) {
      setTime = wordRemaining;;
      var wordCountdown = setInterval(function() {
        wordRemaining -= 1;
        $('#wordCountdown').text(wordRemaining +1);
        if (wordRemaining <= 0) {
          $('#currWord').remove();
          currWord = newWord();
          drop(currWord);
        }
      },1000);
    };

    // SHUFFLE
      function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
      };
      keyArray = shuffle(keyArray);
      content = keyArray[1];
      function newWord(val) {
        var word = document.createElement('p');

        keyArray = shuffle(keyArray); // shuffle it!
        content = keyArray[1];

        word.innerHTML = content;
        return word;
      };
      var currWord = newWord();

      // CREATE WORD
      drop(currWord);
      var firstTry = true;
      $('input').keydown(function() {
        if(event.keyCode == 13) {
          console.log(wordRemaining)
          var answer = $('#answer').val();
          $('#answer').val("");
          if (answer == vocab[content]) {
            $('#currWord').remove();
            if (firstTry) {
              score += 5;
            }
            else {
              score += 2;
            }
            $('#score').text(score);
            currWord = newWord();
            drop(currWord);
            firstTry = true;
          }
          else {
            firstTry = false;
          }
        };
      });

  });

  var keyList = "";
  var valList = "";
  function readList() {
    keyList = Object.keys(vocab).join("<br>");
    valList = "";
    for (var v in vocab) {
      valList += vocab[v] + "<br>";
    };
  };
  $('#view').click(function() {
    OpenWindow=window.open("", "newwin", "height=700, width=500,toolbar=no,scrollbars="+scroll+",menubar=no");
    OpenWindow.document.write("<TITLE>")
    OpenWindow.document.write($('#module').val())
    OpenWindow.document.write("</TITLE>")
    OpenWindow.document.write("<link type='text/css' rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' />")
    OpenWindow.document.write("<BODY>")
    OpenWindow.document.write("<div class='row'>")
    OpenWindow.document.write("<div class='col-xs-6' style='margin-left:10px;'>")
    OpenWindow.document.write("<p>")
    OpenWindow.document.write(keyList)
    OpenWindow.document.write("</p>")
    OpenWindow.document.write("</div>")
    OpenWindow.document.write("<div class='col-xs-6' style='margin-left:-10px;'>")
    OpenWindow.document.write("<p>")
    OpenWindow.document.write(valList)
    OpenWindow.document.write("</p>")
    OpenWindow.document.write("</div>")
    OpenWindow.document.write("</BODY>")
    OpenWindow.document.write("</HTML>")
  })

  $('#select1').click(function() {
    $('#select1 .btn-group.bootstrap-select').toggleClass("open");
  });
  $('#select2').click(function() {
    $('#select2 .btn-group.bootstrap-select').toggleClass("open");
  });

  // GENERATE VOCAB LISTS
  $('#module').change(vocabList());
  $('#lang').change(function() {
    if ($('#lang').val() == "German") {
      $('#module option').remove();
      var verbs1 = document.createElement('option');
      verbs1.id = "verbs1"
      $('#module').append(verbs1);
      $('#verbs1').attr("value","Verbs I");
      $('#verbs1').html("Verbs I");
      var verbs2 = document.createElement('option');
      verbs2.id = "verbs2"
      $('#module').append(verbs2);
      $('#verbs2').attr("value","Verbs II");
      $('#verbs2').html("Verbs II");
      var verbs3 = document.createElement('option');
      verbs3.id = "verbs3"
      $('#module').append(verbs3);
      $('#verbs3').attr("value","Verbs III");
      $('#verbs3').html("Verbs III");
    }
    else if ($('#lang').val() == "Japanese") {
      $('#module option').remove();
      var kanji1 = document.createElement('option');
      kanji1.id = "kanji1"
      $('#module').append(kanji1);
      $('#kanji1').attr("value","Kanji I");
      $('#kanji1').html("Kanji I");
      var conjunctions = document.createElement('option');
      conjunctions.id = "conjunctions"
      $('#module').append(conjunctions);
      $('#conjunctions').attr("value","Conjunctions");
      $('#conjunctions').html("Conjunctions");
    }
  })

  function vocabList() {
    vocab = "";
    // VOCAB LIST SELECTION
    if ($('#lang').val() == "German") {
      if ($('#module').val() == "Verbs I") {
        vocab = {
        "to accept": "annehmen",
        "to accompany": "begleiten",
        "to advise": "beraten",
        "to advise": "raten",
        "to allow": "erlauben",
        "to answer": "beantworten",
        "to apply for": "sich bewerben um",
        "to have a fight": "sich streiten",
        "to argue": "streiten",
        "to arrive": "ankommen",
        "to ask": "fragen",
        "to ask a question": "eine Frage stellen",
        "to ask for": "bitten um",
        "to avoid, to prevent, to warn": "vermeiden",
        "to be able to": "k\xF6nnen",
        "to be allowed to": "d\xFCrfen",
        "to be called": "hei\xDFen",
        "to be interested in": "sich interessieren f\xFCr",
        "to be located": "sich befinden",
        "to be silent": "schweigen",
        "to be supposed to": "sollen",
        "to become": "werden",
        "to start": "anfangen",
        "to begin": "beginnen",
        "to belong": "geh\xF6ren",
        "to borrow": "leihen",
        "to bring": "bringen",
        "to buy": "kaufen",
        "to call": "nennen",
        "to change": "wechseln",
        "to chat": "plaudern",
        "to check": "nachsehen",
        "to choose, to dial": "w\xE4hlen",
        "to click": "klicken",
        };
      }
      else if ($('#module').val() == "Verbs II") {
        vocab = {
        "to climb": "klettern",
        "to climb, get on": "steigen",
        "to close": "zumachen",
        "to come": "kommen",
        "to come back": "zur\xFCckkommen",
        "to cost": "kosten",
        "to count": "rechnen",
        "to count": "z\xE4hlen",
        "to cry": "weinen",
        "to decide": "beschlie\xDFen",
        "to decide": "sich entscheiden",
        "to depart": "abfahren",
        "to describe": "beschreiben",
        "to discuss": "besprechen",
        "to discuss": "diskutieren",
        "to drink": "trinken",
        "to drive": "fahren",
        "to drop": "fallen lassen",
        "to earn": "verdienen",
        "to eat": "essen",
        "to devour": "fressen",
        "to end": "beenden",
        "to enjoy oneself": "sich am\xFCsieren",
        "to enter": "eingehen",
        "to enter": "eintreten",
        "to escape": "fliehen",
        "to expect": "erwarten",
        "to explain": "erkl\xE4ren",
        "to fall": "fallen",
        "to fall asleep": "einschlafen",
        "to feel": "f\xFChlen",
        "to fetch": "holen",
        "to fill": "f\xFCllen",
        "to find": "finden",
        "to finish, end": "enden",
        "to follow": "folgen",
        "to forget": "vergessen",
        "to forgive": "vergeben",
        "to pardon": "verzeihen",
        "to get angry": "sich \xE4rgern",
        "to get bored": "sich langweilen",
        "to give": "geben",
        };
      }
      else if ($('#module').val() == "Verbs III") {
        vocab = {
        "to give (presents)": "schenken",
        "to go for a walk": "einen Spaziergang machen",
        "to go wrong/to fail, to miss": "fehlen",
        "to happen": "geschehen",
        "to occur": "passieren",
        "to hate": "hassen",
        "to have": "haben",
        "to have to": "m\xFCssen",
        "to hear": "h\xF6ren",
        "to help": "helfen",
        "to hire": "leihen",
        "to hope": "hoffen",
        "to hurry": "eilen",
        "to hurry oneself": "sich beeilen",
        "to improve": "verbessern",
        "to inform": "mitteilen",
        "to intend": "vorhaben",
        "to introduce": "vorstellen",
        "to invite": "einladen",
        "to jump": "springen",
        "to knock": "klopfen",
        "to knock, hit": "schlagen",
        "to know": "wissen",
        "to know (be familiar with)": "kennen",
        "to land": "landen",
        "to last": "dauern",
        "to laugh": "lachen",
        "to lay": "legen",
        "to lead": "f\xFChren",
        "to learn": "lernen",
        "to leave, let": "lassen",
        "to leave": "verlassen",
        "to lend": "ausleihen",
        "to lie": "liegen",
        "to light, turn on": "einschlaten",
        "to be fond of": "gern haben",
        "to like": "m\xF6gen",
        "to listen": "zuh\xF6ren",
        "to live (to be alive)": "leben",
        "to reside": "wohnen",
        "to load, to charge": "laden",
        "to look": "schauen",
        };
      };
    }
    if ($('#lang').val() == "Japanese") {
      if ($('#module').val() == "Kanji I") {
        vocab = {
          "&#19968;": "one",
          "&#20108;": "two",
          "&#19977;": "three",
          "&#22235;": "four",
          "&#20116;": "five",
          "&#20845;": "six",
          "&#19971;": "seven",
          "&#20843;": "eight",
          "&#20061;": "nine",
          "&#21313;": "ten",
          "&#20870;": "circle",
          "&#30334;": "hundred",
          "&#21315;": "thousand",
          "&#19975;": "ten thousand",
          "&#20309;": "what",
          "&#26085;": "day",
          "&#26376;": "month",
          "&#26126;&#12427;&#12356;": "bright",
          "&#23546;": "temple",
          "&#26178;": "time",
          "&#28779;": "fire",
          "&#27700;": "water",
          "&#26408;": "tree",
          "&#37329;": "money",
          "&#22303;": "earth",
          "&#20170;": "now",
          "&#20998;&#12427;": "understand",
          "&#36913;": "week",
          "&#24180;": "year",
          "&#26332;": "weekday",
          "&#22823;&#12365;&#12356;": "big",
          "&#20013;": "middle",
          "&#23567;&#12373;&#12356;": "small",
          "&#23569;&#12394;&#12356;": "few",
        };
      }
      if ($('#module').val() == "Conjunctions") {
        vocab = {
          "&#12391;&#12418;": "but",
          "&#12369;&#12393;": "but",
          "&#12381;&#12428;&#12395;": "then",
          "&#12381;&#12428;&#12424;&#12426;": "more than that",
          "&#12375;&#12363;&#12375;": "however",
          "&#12375;&#12363;&#12418;": "what's more",
          "&#12364;": "yet",
          "&#12392;": "if",
          "&#12381;&#12398;&#19978;": "moreover",
          "&#12381;&#12375;&#12390;": "and",
          "&#12387;&#12390;&#12371;&#12392;&#12399;": "which means",
          "&#12384;&#12363;&#12425;": "so",
          "&#12363;&#12425;": "because",
          "&#12391;&#12377;&#12363;&#12425;": "therefore",
          "&#12384;&#12364;": "and yet",
          "&#12394;&#12398;&#12395;": "despite",
          "&#12381;&#12428;&#12391;&#12418;": "even though",
          "&#12398;&#12391;": "as",
          "&#12414;&#12383;": "again",
          "&#12414;&#12384;": "still",
          "&#12381;&#12398;&#24460;": "thereafter",
          "&#12381;&#12428;&#12363;&#12425;": "and then",
          "&#12373;&#12425;&#12395;": "furthermore",
          "&#12392;&#12371;&#12429;&#12391;": "by the way",
        };
      }
    }
    readList();
  }
});
