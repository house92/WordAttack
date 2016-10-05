
$(document).ready(function() {
  vocabList();

  var open = false;

  // WORD
  function drop(word) {
    word.id = "currWord";
    $('#word').append(word);
    $('#currWord').animate({
      top:"+=400"
    },10000);
    wordRemaining = setTime;
  };

  // TRANSLATION DIRECTION
  $('.glyphicon-refresh').click(function() {
    console.log(valArray)
    if ($('#targetLang').text() == "English") {
      $('#targetLang').text($('#lang').val());
    }
    else {
      $('#targetLang').text("English");
    }
  })

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

  var keyArray = [];
  var valArray = [];
  function resetArrays() {
    keyArray = Object.keys(vocab);
    valArray = [];
    for (var v in vocab) {
      valArray.push(vocab[v]);
    };
    var content = "";
  }
  resetArrays();

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
    resetArrays();

    if (open) {
      OpenWindow.close();
    }

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

      content = "";
      function newWord() {
        var word = document.createElement('p');

        if ($('#targetLang').text() == "English") {
          keyArray = shuffle(keyArray); // shuffle it!
          content = keyArray[1];
        }
        else {
          kvalArray = shuffle(valArray); // shuffle it!
          content = valArray[1];
        }

        word.innerHTML = content;
        return word;
      };
      var currWord = newWord();

      // CREATE WORD
      drop(currWord);
      var firstTry = true;
      $('input').keydown(function() {
        if(event.keyCode == 13) {
          var answer = $('#answer').val();
          $('#answer').val("");
          if ($('#targetLang').text() == "English") {
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
          }
          else {
            if (content == vocab[answer]) {
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
          }

        };
      });

  });

  // VOCAB LIST WINDOW
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
    open = true;
    vocabList();
    readList();
    OpenWindow=window.open("", "newwin", "height=700, width=500,toolbar=no,location=no, scrollbars="+scroll+",menubar=no");
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

  // INSTRUCTIONS WINDOW
  $('#instructions').click(function() {
    open = true;
    OpenWindow=window.open("", "newwin", "height=500, width=500,toolbar=no,location=0, scrollbars="+scroll+",menubar=no");
    OpenWindow.document.write("<TITLE>")
    OpenWindow.document.write("Instructions")
    OpenWindow.document.write("</TITLE>")
    OpenWindow.document.write("<link type='text/css' rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' />")
    OpenWindow.document.write("<BODY>")
    OpenWindow.document.write("<h2 style='text-decoration:underline; margin-left:10px;'>Instructions</h2>")
    OpenWindow.document.write("<p style='margin-left:10px;'>")
    OpenWindow.document.write("- Select difficulty using the 'Easy', 'Medium' and 'Hard' buttons. <br>- Use the dropdown menus above the challenge box to select your language and vocab list. Click on 'View vocab list' to see the accepted translation for each word. <br>- Click on the switch icon to change which language you're translating into. <br>- Once all settings have been selected, click the 'Start' button to initiate the game. You will have 60 seconds to translate as many words as possible, with a timer on each individual word depending on your difficulty setting. You must hit the enter key to submit your answer. <br>- You will be awarded: <br> <ul><li>5 points for a correct answer on the first attempt.</li> <li>2 points if more than one attempt required.</li></ul>")
    OpenWindow.document.write("</p>")
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
    $('#targetLang').text("English");
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
        "annehmen": "to accept",
        "begleiten": "to accompany",
        "beraten": "to advise",
        "erlauben": "to allow",
        "beantworten": "to answer",
        "sich bewerben um": "to apply for",
        "sich streiten": "to have a fight",
        "streiten": "to argue",
        "ankommen": "to arrive",
        "fragen": "to ask",
        "eine Frage stellen": "to ask a question",
        "bitten um": "to ask for",
        "vermeiden": "to avoid",
        "k\xF6nnen": "to be able to",
        "d\xFCrfen": "to be allowed to",
        "hei\xDFen": "to be called",
        "sich interessieren f\xFCr": "to be interested in",
        "sich befinden": "to be located",
        "schweigen": "to be silent",
        "sollen": "to be supposed to",
        "werden": "to become",
        "anfangen": "to start",
        "beginnen": "to begin",
        "geh\xF6ren": "to belong",
        "leihen": "to borrow",
        "bringen": "to bring",
        "kaufen": "to buy",
        "nennen": "to call",
        "wechseln": "to change",
        "plaudern": "to chat",
        "nachsehen": "to check",
        "w\xE4hlen": "to choose",
        "klicken": "to click",
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
          "\u4E00": "one",
          "\u4E8C": "two",
          "\u4E09": "three",
          "\u56DB": "four",
          "\u4E94": "five",
          "\u516D": "six",
          "\u4E03": "seven",
          "\u516B": "eight",
          "\u4E5D": "nine",
          "\u5341": "ten",
          "\u5186": "circle",
          "\u767E": "hundred",
          "\u5343": "thousand",
          "\u4E07": "ten thousand",
          "\u4F55": "what",
          "\u65E5": "day",
          "\u6708": "month",
          "\u660E\u308B\u3044": "bright",
          "\u5BFA": "temple",
          "\u6642": "time",
          "\u706B": "fire",
          "\u6C34": "water",
          "\u6728": "tree",
          "\u91D1": "money",
          "\u571F": "earth",
          "\u4ECA": "now",
          "\u5206\u308B": "understand",
          "\u9031": "week",
          "\u5E74": "year",
          "\u66DC": "weekday",
          "\u5927\u304D\u3044": "big",
          "\u4E2D": "middle",
          "\u5C0F\u3055\u3044": "small",
          "\u5C11\u306A\u3044": "few",
        };
      }
      if ($('#module').val() == "Conjunctions") {
        vocab = {
          "\u3067\u3082": "but",
          "\u3051\u3069": "but",
          "\u305D\u308C\u306B": "then",
          "\u305D\u308C\u3088\u308A": "more than that",
          "\u3057\u304B\u3057": "however",
          "\u3057\u304B\u3082": "what's more",
          "\u304C": "yet",
          "\u3068": "if",
          "\u305D\u306E\u4E0A": "moreover",
          "\u305D\u3057\u3066": "and",
          "\u3063\u3066\u3053\u3068\u306F": "which means",
          "\u3060\u304B\u3089": "so",
          "\u304B\u3089": "because",
          "\u3067\u3059\u304B\u3089": "therefore",
          "\u3060\u304C": "and yet",
          "\u306A\u306E\u306B": "despite",
          "\u305D\u308C\u3067\u3082": "even though",
          "\u306E\u3067": "as",
          "\u307E\u305F": "again",
          "\u307E\u3060": "still",
          "\u305D\u306E\u5F8C": "thereafter",
          "\u305D\u308C\u304B\u3089": "and then",
          "\u3055\u3089\u306B": "furthermore",
          "\u3068\u3053\u308D\u3067": "by the way",
        };
      }
    }
    readList();
  }
});
