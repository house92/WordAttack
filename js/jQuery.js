
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
    newOption("adj1","Adjectives I");
    newOption("adj2","Adjectives II");
    newOption("adj3","Adjectives III");
    newOption("adj4","Adjectives IV");
    newOption("colours","Colours");
  };
  function loadSpanish() {
    $('#module option').remove();
    newOption("verbs1","Verbs I");
    newOption("colours","Colours");
  };
  function loadJapanese() {
    $('#module option').remove();
    newOption("kanji1","Kanji I");
    newOption("kanji2","Kanji II");
    newOption("conjunctions","Conjunctions");
  };

  loadGerman();

  // WORD
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
      var currWord = newWord();

      // CREATE WORD
      drop(currWord);
      $('input').keydown(function() {
        if(event.keyCode == 13) {
          var answer = $('#answer').val();
          $('#answer').val("");

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
                firstTry = true;
              }
              else {
                firstTry = false;
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
                firstTry = true;
              }
              else {
                firstTry = false;
              }
            }
          }

        };
      });

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
        "bringen": "to bring",
        "kaufen": "to buy",
        "nennen": "to call",
        "wechseln": "to change",
        "plaudern": "to chat",
        "nachsehen": "to check",
        "w\xE4hlen": ["to choose","to dial"],
        "klicken": "to click",
        };
      break;
      case "Verbs II":
        vocab = {
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
        };
      break;
      case "Verbs III":
        vocab = {
        "schenken": "to give (presents)",
        "einen Spaziergang machen": "to go for a walk",
        "fehlen": "to fail",
        "geschehen": "to happen",
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
        "liegen": "to lie",
        "einschlaten": "to turn on",
        "gern haben": "to be fond of",
        "m\xF6gen": "to like",
        "zuh\xF6ren": "to listen",
        "leben": "to live",
        "wohnen": "to reside",
        "laden": "to load",
        "schauen": "to look",
        };
      break;
      case "Adjectives I":
        vocab = {
          "all": "all",
          "alone": "allein",
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
          "sentir" : "to be sorry",
          "tener \u00E9xito" : "to be successful",
          "tener sed" : "to be thirsty",
          "pedir prestado" : "to borrow",
          "romper" : "to break",
          "traer" : "to bring",
          "cepillarse" : "to brush",
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
          "\u5186": "circle",
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
          "\u6728": "tree",
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
