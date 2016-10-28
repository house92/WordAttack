
$(document).ready(function() {
  vocabList();

  var open = false;
  var finishedArray = false;
  var firstTry = true;

  // LOAD OPTIONS
  function loadGerman() {
    $('#module option').remove();
    newOption("verbs1","Verbs I");
    newOption("verbs2","Verbs II");
    newOption("verbs3","Verbs III");
    newOption("verbs4","Verbs IV");
    newOption("verbs5","Verbs V");
    newOption("verbs6","Verbs VI");
    newOption("verbs7","Verbs VII");
    newOption("verbs8","Verbs VIII");
    newOption("adj1","Adjectives I");
    newOption("adj2","Adjectives II");
    newOption("adj3","Adjectives III");
    newOption("adj4","Adjectives IV");
    newOption("colours","Colours");
    newOption("adverbs","Adverbs");
    newOption("conjunctions","Conjunctions");
    newOption("prepositions","Prepositions");
    newOption("interrogatives","Interrogatives");
    newOption("common","Common words");
    newOption("quantities","Quantities");
    newOption("time","Time phrases");
    newOption("days","Days & Months");
    newOption("geography","Geography");
    newOption("nationalities1","Nationalities I");
    newOption("nationalities2","Nationalities II");
  };
  function loadSpanish() {
    $('#module option').remove();
    newOption("verbs1","Verbs I");
    newOption("verbs2","Verbs II");
    newOption("verbs3","Verbs III");
    newOption("verbs4","Verbs IV");
    newOption("verbs5","Verbs V");
    newOption("verbs6","Verbs VI");
    newOption("verbs7","Verbs VII");
    newOption("verbs8","Verbs VIII");
    newOption("adj1","Adjectives I");
    newOption("adj2","Adjectives II");
    newOption("adj3","Adjectives III");
    newOption("adj4","Adjectives IV");
    newOption("colours","Colours");
  };
  function loadJapanese() {
    $('#module option').remove();
    newOption("kanji1","Kanji I");
    newOption("kanji2","Kanji II");
    newOption("kanji3","Kanji III");
    newOption("kanji4","Kanji IV");
    newOption("kanji5","Kanji V");
    newOption("conjunctions","Conjunctions");
  };

  loadGerman();

  // WORD
  var vocab = "";
  var content = "";
  function drop(word) {
    word.id = "currWord";
    $('#word').append(word);
    $('#currWord').animate({
      top:"+=400"
    },10000);
    wordRemaining = setTime;
    finishedArray = false;
    firstTry = true;
  };

  // SHUFFLE
    function shuffle(o){ //v1.0
      for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    };

    // CREATE WORD
    content = "";
    function newWord() {
      var word = document.createElement('p');

      if ($('#targetLang').text() == "English") {
        keyArray = shuffle(keyArray); // shuffle it!
        content = keyArray[1];
        if (typeof content == "object") {
          content = shuffle(content);
          content = content[1]
        }
      }
      else {
        kvalArray = shuffle(valArray); // shuffle it!
        content = valArray[1];
        if (typeof content == "object") {
          content = shuffle(content);
          content = content[1]
        }
      }

      word.innerHTML = content;
      return word;
    };
    var currWord = "";

  // TRANSLATION DIRECTION
  $('.glyphicon-refresh').click(function() {
    if ($('#targetLang').text() == "English") {
      $('#targetLang').text($('#lang').val());
    }
    else {
      $('#targetLang').text("English");
    }
  })

  // DIFFICULTY TIMER
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

  // VOCAB LIST ARRAYS
  var keyArray = [];
  var valArray = [];
  function resetArrays() {
    keyArray = Object.keys(vocab);
    valArray = [];
    for (var v in vocab) {
      valArray.push(vocab[v]);
    };
    content = "";
  }
  resetArrays();

  $('#answer').prop("disabled",true);

  // BUTTON CLICK
  $('#start').click(function() {
    vocabList();
    $('#answer').prop("disabled",false);
    $('#answer').val("");
    $('#answer').focus();
    $('#word').empty();
    remaining = 60;
    score = 0;
    $('#score').text(score);
    resetArrays();
    vocabList();
    firstTry = true;

    if (open) {
      OpenWindow.close();
    }

    //STOP BUTTON
    $('#stop').click(function() {
      remaining = 0;
      $('#start').text("Start");
      firstTry = true;
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

      currWord = newWord();
      drop(currWord);

  });

  // CHECK ANSWER
  $('input').keydown(function() {
    if(event.keyCode == 13 && $('#answer').val() != "") {
      var answer = $('#answer').val();
      $('#answer').val("");
      console.log("When enter:" + firstTry);

      // WHEN ENGLISH
      if ($('#targetLang').text() == "English") {

        // WHEN ARRAY
        if (typeof vocab[content] == "object") {
          for (var i = 0; i < vocab[content].length; i++) {
            if (answer != vocab[content][i] && i == vocab[content].length - 1) {
              finishedArray = true;
            };
            if (answer == vocab[content][i]) {
              i = vocab[content].length;
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
              break;
            }
            else if (answer != vocab[content][i] && finishedArray == true) {
              firstTry = false;
            }
          }
        }

        // WHEN STRING
        else {
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
          }
          else if (answer != vocab[content]) {
            firstTry = false;
            console.log("When wrong:" + firstTry);
          }
        }
      }

      // WHEN FOREIGN LANGUAGE
      else {

        // WHEN ARRAY
        if (typeof vocab[answer] == "object") {
          for (var i = 0; i < vocab[answer].length; i++) {
            if (content != vocab[answer][i] && i == vocab[answer].length - 1) {
              finishedArray = true;
            };
            if (content == vocab[answer][i]) {
              i = vocab[answer].length;
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
              break;
            }
            else if (content != vocab[answer][i] && finishedArray == true) {
              firstTry = false;
            }
          }
        }

        // WHEN STRING
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
          }
          else if (answer != vocab[content]) {
            firstTry = false;
            console.log("When wrong:" + firstTry);
          }
        }
      }

    };
  });

  // VOCAB LIST WINDOW
  var keyList = "";
  var valList = "";
  var tempVal = [];
  function readList() {
    keyList = Object.keys(vocab).join("<br>");
    valList = "";
    tempVal = [];
    for (var v in vocab) {
      if (typeof vocab[v] == "string") {
        valList += vocab[v] + "<br>";
      }
      else {
        tempVal = [];
        for (var i = 0; i < vocab[v].length; i++) {
          tempVal[i] = " " + vocab[v][i];
        }
        valList += tempVal + "<br>";
      }
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
  function newOption(id,val) {
    var option = document.createElement('option');
    option.id = id;
    $('#module').append(option);
    $('#' + id).attr("value",val);
    $('#' + id).html(val);
  };

  $('#module').change(vocabList());
  $('#lang').change(function() {
    vocabList();
    $('#targetLang').text("English");
    if ($('#lang').val() == "German") {
      loadGerman();
    }
    else if ($('#lang').val() == "Spanish") {
      loadSpanish();
    }
    else if ($('#lang').val() == "Japanese") {
      loadJapanese();
    }
  })


  function vocabList() {
    vocab = "";
    // VOCAB LIST SELECTION
    switch ($('#lang').val()) {
    case "German" :
      switch ($('#module').val()) {
      case "Verbs I":
        vocab = {
          "annehmen": "to accept",
          "begleiten": "to accompany",
          "beraten": "to advise",
          "raten": "to advise",
          "erlauben": "to allow",
          "beantworten": "to answer",
          "sich bewerben um": "to apply for",
          "sich streiten": "to have a fight",
          "streiten": "to argue",
          "ankommen": "to arrive",
          "fragen": "to ask",
          "eine Frage stellen": "to ask a question",
          "bitten um": "to ask for",
          "vermeiden": ["to avoid","to prevent","to warn"],
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
        };
      break;
      case "Verbs II":
        vocab = {
          "bringen": "to bring",
          "kaufen": "to buy",
          "nennen": "to call",
          "wechseln": "to change",
          "plaudern": "to chat",
          "nachsehen": "to check",
          "w\xE4hlen": ["to choose","to dial"],
          "klicken": "to click",
          "klettern": "to climb",
          "steigen": "to get on",
          "zumachen": "to close",
          "kommen": "to come",
          "zur\xFCckkommen": "to come back",
          "kosten": "to cost",
          "rechnen": "to calculate",
          "z\xE4hlen": "to count",
          "weinen": "to cry",
          "beschlie\xDFen": "to decide on",
          "sich entscheiden": "to decide",
          "abfahren": "to depart",
          "beschreiben": "to describe",
          "besprechen": "to talk about",
          "diskutieren": "to discuss",
          "trinken": "to drink",
          "fahren": "to drive",
          "fallen lassen": "to drop",
          "verdienen": "to earn",
        };
      break;
      case "Verbs III":
        vocab = {
          "essen": "to eat",
          "fressen": "to devour",
          "beenden": "to end",
          "sich am\xFCsieren": "to enjoy oneself",
          "eingehen": "to go in",
          "eintreten": "to enter",
          "fliehen": "to escape",
          "erwarten": "to expect",
          "erkl\xE4ren": "to explain",
          "fallen": "to fall",
          "einschlafen": "to fall asleep",
          "f\xFChlen": "to feel",
          "holen": "to fetch",
          "f\xFCllen": "to fill",
          "finden": "to find",
          "enden": "to end",
          "folgen": "to follow",
          "vergessen": "to forget",
          "vergeben": "to forgive",
          "verzeihen": "to pardon",
          "sich \xE4rgern": "to get angry",
          "sich langweilen": "to get bored",
          "geben": "to give",
          "schenken": "to give (presents)",
          "einen Spaziergang machen": "to go for a walk",
          "fehlen": "to fail",
          "geschehen": "to happen",
        };
      break;
      case "Verbs IV":
        vocab = {
          "passieren": "to occur",
          "hassen": "to hate",
          "haben": "to have",
          "m\xFCssen": "to have to",
          "h\xF6ren": "to hear",
          "helfen": "to help",
          "leihen": "to hire",
          "hoffen": "to hope",
          "eilen": "to hurry",
          "sich beeilen": "to hurry oneself",
          "verbessern": "to improve",
          "mitteilen": "to inform",
          "vorhaben": "to intend",
          "vorstellen": "to introduce",
          "einladen": "to invite",
          "springen": "to jump",
          "klopfen": "to knock",
          "schlagen": "to hit",
          "wissen": "to know",
          "kennen": "to know",
          "landen": "to land",
          "dauern": "to last",
          "lachen": "to laugh",
          "legen": "to lay",
          "f\xFChren": "to lead",
          "lernen": "to learn",
          "lassen": "to let",
          "verlassen": "to leave",
          "ausleihen": "to lend",
        };
      break;
      case "Verbs V":
        vocab = {
          "liegen": "to lie",
          "einschlaten": "to turn on",
          "gern haben": "to be fond of",
          "m\xF6gen": "to like",
          "zuh\xF6ren": "to listen",
          "leben": "to live",
          "wohnen": "to reside",
          "laden": "to load",
          "schauen": "to look",
          "zusehen":"to look",
          "aufpassen auf":"to look after",
          "sich freuen auf":"to look forward to",
          "verlieren":"to lose",
          "lieben":"to love",
          "begegnen":"to meet",
          "treffen":"to meet",
          "brauchen":"to need",
          "notieren":"to note",
          "aufmachen":"to open",
          "\u00F6ffnen":"to open",
          "befehlen":"to order",
          "bestellen":"to order",
          "organisieren":"to organise",
          "parken":"to park",
          "vorbeigehen":"to pass by",
          "zahlen":"to pay",
          "anrufen":"to phone",
          "telefonieren mit":"to phone",
          "stecken":"to place",
        };
      break;
      case "Verbs VI":
        vocab = {
          "planen":"to plan",
          "gefallen":"to please",
          "bevorzugen":"to prefer",
          "verhindern":"to prevent",
          "produzieren":"to produce",
          "versprechen":"to promise",
          "dr\u00FCcken":"to push",
          "stellen":"to put",
          "zur\u00FCckstellen":"to put back",
          "erreichen":"to reach",
          "lesen":"to read",
          "erhalten":"to receive",
          "bekommen":["to receive","be host to"],
          "empfehlen":"to recommend",
          "Leid tun":["to regret","be sorry"],
          "sich erinnern an":"to remember",
          "mieten":"to rent",
          "reparieren":"to repair",
          "wiederholen":"to repeat",
          "forschen":"to research",
          "reservieren":"to reserve",
          "zur\u00FCckfahren":"to return",
          "zur\u00FCckgehen":"to return",
          "klingeln":"to ring",
          "retten":"to save",
          "sagen":"to say",
          "sehen":"to see",
        };
      break;
      case "Verbs VII":
        vocab = {
          "scheinen":["to seem","to shine"],
          "verkaufen":"to sell",
          "schicken":"to send",
          "bedienen":"to serve",
          "einkaufen":"to shop",
          "zeigen":"to show",
          "schlie\u00DFen":"to shut",
          "unterschreiben":"to sign",
          "sitzen":"to sit",
          "sich hinsetzen":"to sit down",
          "schlafen":"to sleep",
          "l\u00E4cheln":"to smile",
          "scheien":"to snow",
          "sprechen":"to speak",
          "ausgeben":"to spend",
          "verbringen":"to spend",
          "bleiben":"to stay",
          "stehlen":"to steal",
          "kleben":"to stick",
          "aufh\u00F6ren":"to stop",
          "stoppen":"to stop",
          "halten":["to stop","to hold"],
          "studieren":"to study",
          "gelingen":"to succeed",
          "im Internet surfen":"to surf the internet",
        };
      break;
      case "Verbs VIII":
        vocab = {
          "l\u00FCgen":"to lie",
          "danken":"to thank",
          "denken":"to think",
          "glauben":["to believe","to think"],
          "meinen":["to think","to mean"],
          "werfen":"to throw",
          "ber\u00FChren":"to touch",
          "versuchen":"to try",
          "tippen":"to type",
          "verstehen":"to understand",
          "benutzen":"to use",
          "besuchen":"to visit",
          "warten auf":"to wait for",
          "spazieren":"to walk",
          "laufen":["to walk","to run"],
          "wollen":"to want",
          "fernsehen":"to watch television",
          "tragen":["to wear","to carry"],
          "gewinnen":"to win",
          "w\u00FCnschen":"to wish",
          "arbeiten":"to work",
          "schreiben":"to write",
          "nehmen":"to take",
          "reden":"to talk",
          "erz\u00E4hlen":"to tell",
        };
      break;
      case "Adjectives I":
        vocab = {
          "all": "all",
          "allein": "alone",
          "b\u00F6se": "angry",
          "zornig": "angry",
          "\u00E4rgerlich": "annoying",
          "erstaunt": "astonished",
          "schrecklich": ["awful", "terrible"],
          "schlecht": "bad",
          "sch\u00F6n": "beautiful",
          "gro\u00DF": ["big", "tall"],
          "langweilig": "boring",
          "breit": "broad",
          "gebrochen": "broken",
          "kaputt": "broken",
          "besch\u00E4ftigt": "busy",
          "goldig": "charming",
          "sauber": "clean",
          "klar": "clear",
          "geschlossen": "closed",
          "bequem": "comfortable",
          "aktuell": "current",
          "gef\u00E4hrlich": "dangerous",
          "bestimmt": "definite",
          "dicht": "dense",
          "schwierig": "difficult",
          "dreckig": "dirty",
          "schmutzig": "dirty",
          "ekelhaft": "disgusting",
          "dynamisch": "dynamic",
          "leicht": "easy",
          "leer": "empty",
          "umweltfeindlich": "environmentally damaging",
          "umweltfreundlich": "environmentally friendly",
          "genau": "exact",
        };
      break;
      case "Adjectives II":
        vocab = {
          "ausgezeichnet": "excellent",
          "aufregend": "exciting",
          "spannend": ["exciting", "tense"],
          "ersch\u00F6pft": "exhausted",
          "teuer": "expensive",
          "falsch": "false",
          "weit": "far",
          "schnell": ["fast", "quick"],
          "dick": ["fat", "thick"],
          "Lieblings-": "favourite",
          "erst": "first",
          "flexibel": "flexible",
          "frei": "free",
          "kostenlos": "free",
          "satt": ["full", "satisfied"],
          "voll": "full",
          "komisch": ["funny", "unusual"],
          "lustig": "funny",
          "allgemein": "general",
          "gut": "good",
          "dankbar": ["grateful", "thankful"],
          "fantastisch": "great",
          "toll": "great",
          "prima": ["great", "marvellous"],
          "gl\u00FCcklich": "happy",
          "schwer": ["hard", "heavy", "difficult"],
          "flei\u00DFig": "hardworking",
          "gesund": "healthy",
          "hoch": "high",
          "hei\u00DF": "hot",
          "krank": "ill",
          "wichtig": "important",
          "gut gelaunt": "in a good mood",
          "eilig": ["hurried", "hasty"],
        };
      break;
      case "Adjectives III":
        vocab = {
          "drinnen" : "inside",
          "nett" : "kind",
          "letzt" : "last",
          "faul" : "lazy",
          "lang" : "long",
          "niedrig" : "low",
          "gro\u00DFartig" : "magnificent",
          "wunderbar" : "marvellous",
          "reif" : ["mature", "ripe"],
          "launisch" : "moody",
          "eng" : "narrow",
          "schmal" : "narrow",
          "nah" : "near",
          "n\u00F6tig" : "necessary",
          "notwendig" : "necessary",
          "neu" : "new",
          "n\u00E4chst" : "next",
          "laut" : ["noisy", "loud"],
          "zahlreich" : "numerous",
          "alt" : "old",
          "ehemalig" : ["old", "former"],
          "einzig" : "only",
          "ge\u00F6ffnet" : "open",
          "offen" : "open",
          "ander" : "other",
          "drau\u00DFen" : "outside",
          "eigen" : "own",
          "ruhig" : ["peaceful", "calm"],
          "perfekt" : "perfect",
          "zufrieden" : ["pleased", "satisfied"],
          "h\u00FCbsch" : "pretty",
          "stolz" : "proud",
          "leise" : ["quiet", "gentle"],
          "bereit" : "ready",
          "fertig" : ["ready","finished"],
          "echt" : "real",
          "wirklich" : "real",
          "verantwortlich" : "responsible",
          "reich" : "rich",
        };
      break;
      case "Adjectives IV":
        vocab = {
          "rund" : "round",
          "traurig" : "sad",
          "klasse" : ["sensational", "awesome"],
          "ernst" : "serious",
          "hart" : ["severe", "unkind"],
          "kurz" : "short",
          "sch\u00FCchtern" : "shy",
          "lautlos" : "silent",
          "gleich" : ["similar", "same"],
          "klein" : "small",
          "weich" : "soft",
          "steil" : "steep",
          "streng" : "strict",
          "stark" : "strong",
          "dumm" : "stupid",
          "\u00FCberrascht" : "surprised",
          "d\u00FCnn" : "thin",
          "m\u00FCde" : "tired",
          "erm\u00FCdend" : "tiring",
          "zusammen" : "together",
          "wahr" : "true",
          "richtig" : ["true", "right"],
          "typisch" : "typical",
          "h\u00E4\u00DFlich" : ["ugly", "horrible"],
          "unglaublich" : "unbelievable",
          "unvorstellbar" : "unimaginable",
          "n\u00FCtzlich" : "useful",
          "g\u00FCltig" : "valid",
          "wertvoll" : "valuable",
          "unterschiedlich" : "variable",
          "schwach" : "weak",
          "artig" : "well behaved",
          "jung" : "young",
          "j\u00FCnger" : "younger",
        };
      break;
      case "Colours":
        vocab = {
          "schwarz" : "black",
          "blau" : "blue",
          "braun" : "brown",
          "die Farbe" : "colour",
          "dunkel" : "dark",
          "gr\u00FCn" : "green",
          "grau" : "grey",
          "hell" : "light",
          "bleich" : "pale",
          "rosa" : "pink",
          "rot" : "red",
          "lila" : "violet",
          "wei\u00DF" : "white",
          "gelb" : "yellow",
          "t\u00FCrkis" : "turquoise",
          "scharlachrot" : "scarlet",
          "orange" : "orange",
          "cremewei\u00DF" : "cream",
          "Neon-" : "neon",
        }
      break;
      case "Adverbs":
        vocab = {
          "oben":["above","upstairs"],
          "fast":"almost",
          "schon":"already",
          "immer":["always","still"],
          "r\u00FCckw\u00E4rts":"backwards",
          "unten":["below","downstairs"],
          "unterwegs":"en route",
          "besonders":"especially",
          "vorw\u00E4rts":"forwards",
          "hier":"here",
          "jedoch":"however",
          "sofort":["immediately","straight away"],
          "mitten":"in the middle of",
          "mehr":"more",
          "nie":"never",
          "oft":"often",
          "da dr\u00FCben":"over there",
          "vielleicht":"perhaps",
          "wahrscheinlich":"probably",
          "schnell":"quickly",
          "lieber":"rather",
          "ziemlich":"fairly",
          "wirklich":"really",
          "neulich":"recently",
          "regelm\u00E4\u00DFig":"regularly",
          "manchmal":"sometimes",
          "irgendwo":"somewhere",
          "da":"there",
          "dort":"there",
          "zu":"too",
          "leider":"unfortunately",
          "sehr":"very",
          "gern":"willingly",
        };
      break;
      case "Quantities":
        vocab = {
          "eine T\u00FCte":"a bag of",
          "eine Tafel":"a bar of",
          "eine Flasche":"a bottle of",
          "ein Dutzend":"a dozen",
          "ein Glas":"a jar of",
          "ein bisschen":"a little of",
          "eine Packung":"a packet of",
          "ein St\u00FCck":"a piece of",
          "eine Scheibe":"a slice of",
          "ein Drittel":"a third of",
          "eine Dose":["a tin","box of"],
          "genug":"enough",
          "viele":"many",
          "mehrere":"several",
        };
      break;
      case "Conjunctions":
        vocab = {
          "nachher":"afterwards",
          "auch":"also",
          "und":"and",
          "vorher":"beforehand",
          "aber":"but",
          "zuerst":"first of all",
          "deshalb":"for this reason",
          "dewegen":"for this reason",
          "daf\u00FCr":"instead",
          "au\u00DFerdem":"moreover",
          "\u00FCbrigens":"moreover",
          "oder":"or",
          "also":"so",
          "dann":"then",
        };
      break;
      case "Time phrases":
        vocab = {
          "der Nachmittag":"afternoon",
          "immer":"always",
          "am Anfang":"at the start",
          "der Tag":"day",
          "fr\u00FCh":"early",
          "der Abend":"evening",
          "t\u00E4glich":"every day",
          "ab":"from",
          "ab und zu":"from time to time",
          "von Zeit zu Zeit":"from time to time",
          "sofort":"immediately",
          "sp\u00E4t":"late",
          "sp\u00E4ter":"later",
          "die Mitternacht":"midnight",
          "die Minute":"minute",
          "der Morgen":"morning",
          "der Vormittag":"morning",
          "meistens":"mostly",
          "n\u00E4chst-":"next",
          "die Nacht":"night",
          "jetzt":"now",
          "heutzutage":"nowadays",
          "p\u00FCnktlich":"on time",
          "rechtzeitig":"on time",
          "seit":"since",
          "bald":"soon",
          "immer noch":"still",
          "\u00FCbermorgen":"the day after tomorrow",
          "heute":"today",
          "morgen":"tomorrow",
          "morgen fr\u00FCh":"tomorrow morning",
          "Woche":"week",
          "das Wochenende":"weekend",
          "w\u00F6chentlich":"weekly",
          "gestern":"yesterday",
        };
      break;
      case "Days & Months":
        vocab = {
          "Montag":"Monday",
          "Dienstag":"Tuesday",
          "Mittwoch":"Wednesday",
          "Donnerstag":"Thursday",
          "Freitag":"Friday",
          "Samstag":"Saturday",
          "Sonnabend":"Saturday",
          "Sonntag":"Sunday",
          "Januar":"January",
          "Februar":"February",
          "M\u00E4rz":"March",
          "April":"April",
          "Mai":"May",
          "Juni":"June",
          "Juli":"July",
          "August":"August",
          "September":"September",
          "Oktober":"October",
          "November":"November",
          "Dezember":"December",
        };
      break;
      case "Interrogatives":
        vocab = {
          "wie viel?":"how much?",
          "wie viele?":"how many?",
          "wie?":"how?",
          "was f\u00FCr?":"what sort of?",
          "was?":"what?",
          "wann?":"when?",
          "wo?":"where?",
          "wer?":"who? whom?",
          "wen?":"whom?",
          "wem?":"to whom?",
          "wessen?":"whose?",
          "warum?":"why?",
        };
      break;
      case "Common words":
        vocab = {
          "wie":["as","like"],
          "weil":"because",
          "das Ende":"end",
          "jeder":"everybody",
          "alle":"everyone",
          "die Zahl":"figure",
          "zum Beispiel":"for example",
          "wenn":"if",
          "die Mitte":"middle",
          "Herr":"Mr",
          "Frau":"Mrs",
          "nein":"no",
          "die Nummer":"number",
          "der Gegenstand":"object",
          "die Form":"shape",
          "jemand":"someone",
          "irgendetwas":"something",
          "das":"that",
          "das Ding":"thing",
          "die Sache":"thing",
          "das Mal":"time",
          "die Art":"type",
          "die Weise":"way",
          "ob":"whether",
          "ja":"yes",
        };
      break;
      case "Geography":
        vocab = {
          "\u00D6sterreich":"Austria",
          "Belgien":"Belgium",
          "D\u00E4nemark":"Denmark",
          "England":"England",
          "Frankreich":"France",
          "Deutschland":"Germany",
          "Gro\u00DFbritannien":"Great Britain",
          "Griechenland":"Greece",
          "Holland":"Holland",
          "Indien":"India",
          "Irland":"Ireland",
          "Italien":"Italy",
          "die Niederlanden":"Netherlands",
          "Russland":"Russia",
          "Schottland":"Scotland",
          "Spanien":"Spain",
          "die Schweiz":"Switzerland",
          "die T\u00FCrkei":"Turkey",
          "die Vereinigten Staaten":"United States",
          "Wales":"Wales",
          "Afrika":"Africa",
          "Asien":"Asia",
          "Australien":"Australia",
          "Europa":"Europe",
          "Nordamerika":"North America",
          "S\u00FCdamerika":"South America",
          "Bayern":"Bavaria",
          "K\u00F6ln":"Cologne",
          "Genf":"Geneva",
          "der Bodensee":"Lake Constance",
          "M\u00FCnchen":"Munich",
          "die Alpen":"the Alps",
          "der Schwarzwald":"the Black Forest",
          "der Tunnel":"the Channel Tunnel",
          "die Donau":"the Danube",
          "der \u00C4rmelkanal":"the English Channel",
          "der Rhein":"the Rhine",
          "Wien":"Vienna",
        };
      break;
      case "Nationalities I":
        vocab = {
          "Afrikaner":"African",
          "Amerikaner":"American",
          "\u00D6sterreicher":"Austrian",
          "Belger":"Belgian",
          "Brite":"British",
          "D\u00E4ne":"Danish",
          "Holl\u00E4nder":"Dutch",
          "Engl\u00E4nder":"English",
          "Europ\u00E4er":"European",
          "Franzose":"French",
          "Deutscher":"German",
          "Grieche":"Greek",
          "Ire":"Irish",
          "Italiener":"Italian",
          "Russe":"Russian",
          "Schotte":"Scottish",
          "Spanier":"Spanish",
          "Schweizer":"Swiss",
          "Waliser":"Welsh",
        };
      break;
      case "Nationalities II":
        vocab = {
          "afrikanisch":"African",
          "amerikanisch":"American",
          "\u00F6sterreichisch":"Austrian",
          "belgisch":"Belgian",
          "britisch":"British",
          "d\u00E4nisch":"Danish",
          "holl\u00E4ndisch":"Dutch",
          "englisch":"English",
          "europ\u00E4isch":"European",
          "franz\u00F6sisch":"French",
          "deutsch":"German",
          "griechisch":"Greek",
          "irisch":"Irish",
          "italienisch":"Italian",
          "russisch":"Russian",
          "schottisch":"Scottish",
          "spanisch":"Spanish",
          "schweizerisch":"Swiss",
          "walisisch":"Welsh",
        };
      break;
      case "Prepositions":
        vocab = {
          "\u00FCber":["above","over"],
          "nach":"after",
          "entlang":"along",
          "um":"around",
          "an":"at",
          "wegen":"because of",
          "hinter":"behind",
          "unter":["beneath","under"],
          "zwischen":"between",
          "trotz":"despite",
          "w\u00E4hrend":"during",
          "au\u00DFer":"except",
          "f\u00FCr":"for",
          "von":"from",
          "vor":"in front of",
          "in":["in","into"],
          "statt":"instead of",
          "neben":"next to",
          "auf":"on",
          "gegen\u00FCber":"opposite",
          "aus":"out of",
          "seit":"since",
          "durch":"through",
          "zu":"to",
          "gegen":"towards",
          "bis":"until",
          "mit":"with",
          "bei":["with","next to"],
          "ohne":"without",
        };
      break;
      }
    break;
    case "Spanish":
      switch ($('#module').val()) {
      case "Verbs I" :
        vocab = {
          "aceptar" : "to accept",
          "acompa\u00F1ar" : "to accompany",
          "a\u00F1adir" : "to add",
          "aconsejar" : "to advise",
          "permitir" : "to allow",
          "contestar" : ["to answer","to reply"],
          "dirigirse a" : "to apply to",
          "solicitar" : "to apply to",
          "discutir" : "to argue",
          "llegar" : "to arrive",
          "preguntar" : "to ask",
          "hacer una pregunta" : "to ask a question",
          "pedir" : "to ask for",
          "evitar" : "to avoid",
          "ba\u00F1arse" : "to bathe",
          "estar" : "to be",
          "ser" : "to be",
          "poder" : "to be able to",
          "nacer" : "to be born",
          "llamarse" : "to be called",
          "tener cuidado" : "to be careful",
          "tener calor" : "to be hot",
          "tener fr\u00EDo" : "to be cold",
          "tener hambre" : "to be hungry",
          "tener prisa" : "to be in a hurry",
          "interesarse en" : "to be interested in",
          "tener ganas de" : "to be keen to",
          "encontrarse" : "to be located",
          "estar situado" : "to be located",
          "tener suerte" : "to be lucky",
          "tener sue\u00F1o" : "to be tired",
        };
        break;
        case "Verbs II":
          vocab = {
            "sentir" : "to be sorry",
            "tener \u00E9xito" : "to be successful",
            "tener sed" : "to be thirsty",
            "pedir prestado" : "to borrow",
            "romper" : "to break",
            "traer" : "to bring",
            "cepillarse" : "to brush",
            "comprar":"to buy",
            "sacar entradas":"to buy tickets",
            "llamar":"to call",
            "anular":"to cancel",
            "llevar":["to carry","to wear"],
            "cambiar":"to change",
            "hacer transbordo":"to change",
            "charlar":"to chat",
            "verificar":"to check",
            "elegir":"to choose",
            "quitar la mesa":"to clear the table",
            "cliquear":"to click",
            "escalar monta\u00F1as":"to climb mountains",
            "subir":"to climb/ to go up",
            "cerrar":"to close",
            "chocar":["to collide","to crash"],
            "venir":"to come",
            "quejarse":"to complain",
            "contactar":"to contact",
            "costar":"to cost",
            "contar":"to count",
            "llorar":"to cry",
            "bailar":"to dance",
            "decidir":"to decide",
          };
        break;
        case "Verbs III":
          vocab = {
            "describir":"to describe",
            "merecer":"to deserve",
            "morir":"to die",
            "discutir":"to discuss",
            "despedir":"to dismiss",
            "pasar la aspiradora":"to do the vacuum cleaning",
            "fregar los platos":"to do the washing up",
            "hacer":["to do","to make"],
            "descargar":"to download",
            "dibujar":"to draw",
            "beber":"to drink",
            "conducir":"to drive",
            "comer":"to eat",
            "terminar":"to end",
            "disfrutar":"to enjoy",
            "divertirse":"to enjoy oneself",
            "entrar":"to enter",
            "escaper":"to escape",
            "suspender":"to fail",
            "caer":"to fall",
            "sentir":"to feel",
            "llenar":"to fill",
            "rellenar":"to fill out",
            "encontrar":["to find","to meet"],
            "acabar":["to finish","end"],
            "terminar":["to finish","end"],
            "seguir":["to follow","to continue"],
            "olvidar":"to forget",
            "perdonar":"to forgive",
            "sacar buenas notas":"to get good marks",
          };
        break;
        case "Verbs IV":
          vocab = {
            "enfadarse":"to get angry",
            "vestirse":"to get dressed",
            "bajar":["to go down","to get off"],
            "llevarse bien con":"to get on well with",
            "levantarse":"to get up",
            "dar":"to give",
            "regalar":"to gift",
            "mandar":["to order","to send"],
            "ir":"to go",
            "circular":"to go about",
            "dar un paseo":"to go for a walk",
            "ir de compras":"to go shopping",
            "acostarse":"to go to bed",
            "fallar":["to go wrong","to fail","to miss"],
            "entregar":"to hand over",
            "odiar":"to hate",
            "detestar":"to detest",
            "tener":"to have",
            "haber":"to have",
            "estar resfriado":"to have a cold",
            "tener fiebre":"to have a fever",
            "desayunar":"to have breakfast",
            "cenar":"to have dinner",
            "almorzar":"to have lunch",
            "deber":"to have to",
            "tener que":"to have to",
            "o\u00EDr":"to hear",
            "ayudar":"to help",
            "tener":"to hold",
          };
        break;
        case "Verbs V":
          vocab = {
            "esperar":"to hope",
            "darse prisa":"to hurry",
            "doler":"to hurt",
            "imaginarse":"to imagine",
            "mejorar":"to improve",
            "informar":"to inform",
            "introducir":"to introduce",
            "invitar":"to invite",
            "planchar":"to iron",
            "saltar":"to jump",
            "atropellar":"to knock over",
            "golpear":["to knock","to hit"],
            "saber":"to know",
            "conocer":"to know",
            "aterrizar":"to land",
            "durar":"to last",
            "re\u00EDr":"to laugh",
            "poner la mesa":"to lay the table",
            "aprender":"to learn",
            "marcharse":"to leave",
            "dejar":["to leave","to allow"],
            "salir":["to leave","to depart"],
            "prestar":"to lend",
            "descolgar el tel\u00E9fono":"to lift the receiver",
            "iluminar":"to light up",
            "encender":["to light","to turn on"],
            "querer":["to want","to love"],
            "escuchar":"to listen",
            "vivir":"to live",
          };
        break;
        case "Verbs VI":
          vocab = {
            "cargar":["to load","to charge"],
            "cuidar":"to care for",
            "buscar":"to seek",
            "parecerse a":"to resemble",
            "perder":"to lose",
            "amar":"to love",
            "encantar":"to enchant",
            "equivocarse":"to make a mistake",
            "dirigir":"to direct",
            "juntarse":"to meet up",
            "conocer":"to meet",
            "echar de menos":"to miss",
            "necesitar":"to need",
            "notar":"to note",
            "darse cuenta":["to realise","to take note"],
            "abrir":"to open",
            "pedir":"to order",
            "organizar":"to organise",
            "aparcar":"to park",
            "aprobar":"to pass",
            "pasar":"to pass by",
            "telefonear":"to phone",
            "complacer":"to please",
            "preferir":"to prefer",
            "presentar":"to present",
            "prevenir":"to prevent",
            "tirar":["to pull","to throw"],
            "empujar":"to push",
          };
        break;
        case "Verbs VI":
          vocab = {
            "poner":"to put",
            "reponer":"to put back",
            "maquillarse":"to put on make-up",
            "llover":"to rain",
            "leer":"to read",
            "recibir":"to receive",
            "recomendar":"to recommend",
            "reembolsar":"to refund",
            "arrepentirse":"to regret",
            "recordar":"to remember",
            "alquilar":["to rent","to hire"],
            "reparar":"to repair",
            "repetir":"to repeat",
            "reemplazar":"to replace",
            "investigar":"to research",
            "reservar":"to reserve",
            "volver":"to return",
            "revisar":"to revise",
            "repasar":"to check",
            "montar":"to ride",
            "llamar el timbre":"to ring the bell",
            "correr":"to run",
            "salvar":"to save",
            "ahorrar":["to save","to save up"],
            "decir":"to say",
            "despedirse":"to say goodbye",
            "ver":"to see",
            "parecer":"to seem",
          };
        break;
        case "Verbs VII":
          vocab = {
            "vender":"to sell",
            "enviar":"to send",
            "servir":"to serve",
            "compartir":"to share",
            "afeitarse":"to shave",
            "mostrar":"to show",
            "ducharse":"to shower",
            "firmar":"to sign",
            "cantar":"to sing",
            "sentarse":"to sit down",
            "patinar":"to skate",
            "esquiar":"to ski",
            "dormir":"to sleep",
            "sonre\u00EDr":"to smile",
            "fumar":"to smoke",
            "nevar":"to snow",
            "hablar":"to speak",
            "gastar":"to spend",
            "pasar":"to pass",
            "empezar":["to start","to begin"],
            "quedarse":"to stay",
            "robar":"to steal",
            "pegar":"to stick",
            "parar":"to stop",
            "estudiar":"to study",
            "triunfar":"to succeed",
            "tomar el sol":"to sunbathe",
            "navegar en internet":"to surf the internet",
          };
        break;
        case "Verbs VIII":
          vocab = {
            "nadar":"to swim",
            "tomar":"to take",
            "coger":"to take",
            "aprovechar":"to take advantage of",
            "sacar fotos":"to take photos",
            "ense\u00F1ar":"to teach",
            "contar":"to tell",
            "agradecer":"to thank",
            "pensar":"to think",
            "creer":"to believe",
            "arreglar":"to tidy",
            "tocar":["to touch","to play"],
            "tratar de":"to try to",
            "torcer":["to twist","to turn"],
            "mecanografiar":"to type",
            "entender":"to understand",
            "usar":"to use",
            "utilizar":"to use",
            "pasar la aspiradora":"to vacuum clean",
            "visitar":"to visit",
            "esperar":"to wait for",
            "andar":"to walk",
            "desear":"to desire",
            "lavarse":"to wash oneself",
            "fregar los platos":"to wash up",
            "ganar":["to win","to earn"],
            "trabajar":"to work",
            "preocuparse":"to worry",
            "escribir":"to write",
          };
        break;
        case "Adjectives I":
          vocab = {
            "activo":"active",
            "todo":"all",
            "solo":["alone","lonely"],
            "enfadado":"angry",
            "horrible":"awful",
            "bello":"beautiful",
            "grande":["big","tall"],
            "aburrido":"boring",
            "valiente":"brave",
            "breve":"brief",
            "brillante":"brilliant",
            "roto":"broken",
            "casta\u00F1o":"chestnut brown",
            "limpio":"clean",
            "cercano":"close",
            "cerrado":"closed",
            "c\u00F3modo":"comfortable",
            "guay":"cool",
            "dif\u00EDcil":"difficult",
            "sucio":"dirty",
            "asqueroso":"disgusting",
            "din\u00E1mico":"dynamic",
            "f\u00E1cil":"easy",
            "ilusionado":"excited",
            "emocionante":"exciting",
            "falso":"false",
            "r\u00E1pido":["fast","quick"],
            "gordo":"fat",
            "favorito":"favourite",
          };
        break;
        case "Adjectives II":
          vocab = {
            "preferido":"favourite",
            "flexible":"flexible",
            "antiguo":["former","antique","old"],
            "gratis":"free",
            "libre":"free",
            "lleno":"full",
            "divertido":["funny","entertaining","amusing"],
            "bueno":"good",
            "agradecido":"grateful",
            "estupendo":"great",
            "fant\u00E1stico":"great",
            "gran":"great",
            "formidable":["great","marvellous"],
            "guapo":["handsome","pretty","charming"],
            "alegre":["happy","cheerful"],
            "duro":"hard",
            "trabajador":"hardworking",
            "sano":"healthy",
            "pesado":"heavy",
            "alto":["high","tall"],
            "caliente":"hot",
            "de buen humor":"in a good mood",
            "simp\u00E1tico":"kind",
            "\u00FAltimo":["last","latest"],
            "perezoso":"lazy",
            "ligero":"light",
            "animado":"lively",
            "local":"local",
            "cerrado con llave":"locked",
          };
        break;
        case "Adjectives III":
          vocab = {
            "largo":"long",
            "perdido":"lost",
            "magn\u00EDfico":"magnificent",
            "maravilloso":"marvellous",
            "maduro":"mature",
            "travieso":"naughty",
            "necesario":"necessary",
            "nuevo":"new",
            "pr\u00F3ximo":"next",
            "ruidoso":"noisy",
            "numeroso":"numerous",
            "viejo":"old",
            "abierto":"open",
            "otro":"other",
            "propio":"own",
            "perfecto":"perfect",
            "listo":"ready",
            "real":["real","royal"],
            "responsible":"responsible",
            "rico":["rich","delicious"],
            "podrido":"rotten",
            "igual":"same",
            "mismo":"same",
            "satisfecho":"satisfied",
            "sensacional":"sensational",
            "serio":"serious",
            "corto":"short",
            "t\u00EDmido":"shy",
          };
        break;
        case "Adjectives IV":
          vocab = {
            "silencioso":"silent",
            "est\u00FApido":"stupid",
            "tonto":"silly",
            "peque\u00F1o":"small",
            "buscado":"sought after",
            "de pie":"standing",
            "severo":"strict",
            "estricto":"strict",
            "fuerte":"strong",
            "delgado":"thin",
            "fatigado":"tired",
            "cansado":"tired",
            "junto":"together",
            "tradicional":"traditional",
            "verdadero":"true",
            "feo":"ugly",
            "incre\u00EDble":"unbelievable",
            "antip\u00E1tico":"unpleasant",
            "\u00FAtil":"useful",
            "v\u00E1lido":"valid",
            "valioso":"valuable",
            "variable":"variable",
            "d\u00E9bil":"weak",
            "sabio":"wise",
            "joven":"young",
          };
        break;
        case "Colours":
          vocab = {
            "negro" : "black",
            "azul" : "blue",
            "marr\u00F3n" : "brown",
            "moreno" : ["dark brown", "dark"],
            "casta\u00F1o" : ["light brown", "chestnut"],
            "el color" : "colour",
            "oscuro" : "dark",
            "verde" : "green",
            "gris" : "grey",
            "claro" : "light",
            "rubio" : "fair",
            "p\u00E1lido" : "pale",
            "rosa" : "pink",
            "rojo" : "red",
            "violeta" : "violet",
            "blanco" : "white",
            "amarillo" : "yellow",
            "turquesa" : "turquoise",
            "escarlata" : "scarlet",
            "naranja" : "orange",
            "crema" : "cream",
            "ne\u00F3n" : "neon",
          }
        break;
        case "Adverbs":
          vocab = {
            "por mucho tiempo":"for a long time",
            "casi":"almost",
            "ya":"already",
            "siempre":"always",
            "mal":"badly",
            "abajo":"below",
            "especialmente":"especially",
            "sobre todo":"especially",
            "afortunadamente":"fortunately",
            "aqu\u00ED":"here",
            "sin embargo":"however",
            "inmediatamente":"immediately",
            "m\u00E1s":"more",
            "no obstante":"nevertheless",
            "a menudo":"often",
            "ah\u00ED":"over there",
            "quiz\u00E1s":"perhaps",
            "deprisa":"quickly",
            "bastante":"fairly",
            "realmente":"really",
            "recientemente":"recently",
            "a veces":"sometimes",
            "todav\u00EDa":"still",
            "enseguida":"straight away",
            "all\u00ED":"there",
            "demasiado":"too",
            "desgraciadamente":"unfortunately",
            "desafortunadamente":"unfortunately",
            "arriba":"up there",
            "muy":"very",
            "bien":"well",
          };
        break;
      }
    break;
    case "Japanese":
      switch ($('#module').val()) {
      case "Kanji I":
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
          "\u5186": ["circle","yen"],
          "\u767E": "hundred",
          "\u5343": "thousand",
          "\u4E07": "ten thousand",
          "\u4F55": "what",
          "\u65E5": ["day","sun"],
          "\u6708": ["month","moon"],
          "\u660E\u308B\u3044": "bright",
          "\u5BFA": "temple",
          "\u6642": "time",
          "\u706B": "fire",
          "\u6C34": "water",
          "\u6728": ["tree","wood"],
          "\u91D1": ["money","gold"],
          "\u571F": "earth",
          "\u4ECA": "now",
          "\u5206\u308B": "understand",
          "\u9031": "week",
          "\u5E74": "year",
          "\u66DC": "weekday",
          "\u5927\u304D\u3044": "big",
          "\u4E2D": ["middle","inside","through"],
          "\u5C0F\u3055\u3044": "small",
          "\u5C11\u306A\u3044": "few",
        };
      break;
      case "Kanji II":
        vocab = {
          "\u591A\u3044": "many",
          "\u4E0A\u3052\u308B": ["give","raise"],
          "\u4E0B\u304C\u308B": ["fall","step back"],
          "\u53F3": "right",
          "\u5DE6": "left",
          "\u77F3": "stone",
          "\u5730": "earth",
          "\u4EBA": "person",
          "\u5165\u308B": "enter",
          "\u51FA\u308B": "leave",
          "\u53E3": "mouth",
          "\u5916": "outside",
          "\u76EE": "eye",
          "\u624B": "hand",
          "\u8DB3": ["leg","foot"],
          "\u6B62\u3081\u308B": "stop",
          "\u6B69\u304F": "walk",
          "\u51FA\u3059": ["give out","send"],
          "\u5165\u308C\u308B": "go in",
          "\u4EBA\u53E3": "population",
          "\u5916\u4EBA": "foreigner",
          "\u76EE\u4E0A": "superior",
          "\u4E0A\u624B": "skillful",
          "\u884C\u304F": "go",
          "\u6765\u308B": "come",
          "\u5E74\u4E0A": "older",
          "\u5E74\u4E0B": "younger",
          "\u5730\u4E0B": "underground",
          "\u4ECA\u65E5": "today",
          "\u660E\u65E5": "tomorrow",
          "\u4ECA\u5E74": "this year",
          "\u4ECA\u6708": "this month",
          "\u6765\u6708": "next month",
          "\u6765\u5E74": "next year",
          "\u6765\u9031": "next week",
        }
      break;
      case "Kanji III":
        vocab = {
          "\u672C": ["book","origin"],
          "\u5C71": "mountain",
          "\u898B\u308B": ["see","look"],
          "\u65B9": ["direction","way of doing"],
          "\u6771": "east",
          "\u897F": "west",
          "\u5200": "sword",
          "\u5207\u308B": "cut",
          "\u5DDD": "river",
          "\u8A00\u3046": "say",
          "\u8C9D": "shell",
          "\u58F2\u308B": "sell",
          "\u8CB7\u3046": "buy",
          "\u4E3B": "master",
          "\u6301\u3064": ["hold","carry"],
          "\u592B": "husband",
          "\u7530": "field",
          "\u529B": ["power","strength"],
          "\u8ECA": ["vehicle","car"],
          "\u8AAD\u3080": "read",
          "\u8005": "person",
          "\u6797": "woods",
          "\u7537": "male",
          "\u5973": "female",
          "\u65E5\u672C": "Japan",
          "\u706B\u5C71": "volcano",
          "\u898B\u65B9": ["perspective","way of seeing things"],
          "\u5927\u5207": "important",
          "\u5165\u53E3": "entrance",
          "\u51FA\u53E3": "exit",
          "\u4E3B\u4EBA": "husband",
          "\u4EBA\u529B\u8ECA": "rickshaw",
          "\u5973\u751F": "woman",
          "\u7537\u6027": "man",
        };
      break;
      case "Kanji IV":
        vocab = {
          "\u58EB": ["samurai","gentleman"],
          "\u81EA\u3089": "oneself",
          "\u81EA\u5206": "self",
          "\u5B50": "child",
          "\u5148": ["point","destination"],
          "\u5B66\u3076": "learn",
          "\u751F\u304D\u308B": "live",
          "\u751F\u307E\u308C\u308B": "be born",
          "\u7AF9": "bamboo",
          "\u7B46": "writing brush",
          "\u66F8\u304F": "write",
          "\u6587": ["sentence","text"],
          "\u7ACB\u3064": "stand",
          "\u4E8B": "thing",
          "\u7269": "thing",
          "\u4ED5\u3048\u308B": "serve",
          "\u5316\u3051\u308B": "transform",
          "\u5DE5\u4E8B": "construction",
          "\u5929": "heavens",
          "\u767D\u3044": "white",
          "\u5FC3": ["heart","mind"],
          "\u4EE3\u308F\u308A": ["replacement","exchange"],
          "\u4EA4\u308F\u308B": ["associate","socialise"],
          "\u6BCD": "mother",
          "\u7236": "father",
          "\u5148\u65E5": "the other day",
          "\u4EBA\u751F": "life",
          "\u6587\u5B66": "literature",
          "\u8CB7\u3044\u7269": "shopping",
          "\u6587\u5316": "culture",
          "\u4E2D\u5FC3": "centre",
          "\u6642\u4EE3": ["age","era"],
          "\u5DE6\u624B": "left hand",
          "\u4E07\u304C\u4E00": ["just in case","if by any chance"],
          "\u5DE6\u53F3": ["left and right","influence"],
        };
      break;
      case "Kanji V":
        vocab = {
          "\u5B66\u6821": "school",
          "\u6BCE": "every",
          "\u53E4\u3044": "old",
          "\u601D\u3046": ["think","feel"],
          "\u5F53\u305F\u308B": "hit the mark",
          "\u672C\u5F53": ["real","true"],
          "\u76F8\u624B": "opponent",
          "\u5B89\u3044": "cheap",
          "\u5B89\u5FC3": "calm",
          "\u6D77": "sea",
          "\u8ECD": "army",
          "\u91CC": ["village","ri"],
          "\u7389": ["ball","jewel"],
          "\u7406": "reason",
          "\u9580": "gate",
          "\u5143": "origin",
          "\u8033": "ear",
          "\u53D6\u308B": "take",
          "\u805E\u304F": ["hear","listen","ask"],
          "\u7528": ["business","use","errands"],
          "\u56FD": ["associate","socialise"],
          "\u7C73": "rice",
          "\u8ECD\u4EBA": "soldier",
          "\u6D77\u5916": "overseas",
          "\u77F3\u5316": "petrification",
          "\u5C0F\u77F3": "pebble",
          "\u77F3\u9580": "stone gate",
          "\u8033\u76EE": "attention",
          "\u66F8\u304D\u53D6\u308A": "dictation",
          "\u53D6\u308A\u4EA4\u305C\u308B": "mix in",
          "\u7528\u304C\u3042\u308B": "have things to do",
          "\u5916\u56FD": "foreign country",
          "\u6BCE\u65E5": "every day",
        }
      break;
      case "Conjunctions":
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
      break;
      }
    break;
    }

    readList();
  }
});
