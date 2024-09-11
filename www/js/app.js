var $ = Dom7;

var app = new Framework7({
    name: 'leiturabilidade', // App name
    theme: 'auto', // Automatic theme detection
    colors: {
        primary: '#000000',
    },
    darkMode: true,
    el: '#app', // App root element 

    // App store
    store: store,
    // App routes
    routes: routes,
});

function calculateReadability(text) {
    function countWords(text) {
        return text.trim().split(/\s+/).length;
    }
  
    function countSentences(text) {
        return text.split(/[.!?]+/).filter(Boolean).length;
    }
  
    function countSyllables(word) {
        word = word.toLowerCase();
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        return (word.match(/[aeiouy]{1,2}/g) || []).length;
    }
  
    const words = countWords(text);
    const sentences = countSentences(text);
    const syllables = text.split(/\s+/).reduce((acc, word) => acc + countSyllables(word), 0);
  
    if (words === 0 || sentences === 0) {
        return "Texto muito curto para calcular a leiturabilidade.";
    }
  
    const readabilityScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
    return readabilityScore.toFixed(2);
  }
  
  function classifyReadability(score) {
    if (score >= 90) {
        return "Muito fácil de ler";
    } else if (score >= 80) {
        return "Fácil de ler";
    } else if (score >= 70) {
        return "Razoavelmente fácil de ler";
    } else if (score >= 60) {
        return "Compreensível";
    } else if (score >= 50) {
        return "Um pouco difícil de ler";
    } else if (score >= 30) {
        return "Difícil de ler";
    } else {
        return "Muito difícil de ler";
    }
  }
  
  // Adicionar evento ao botão
  document.querySelector("button").addEventListener("click", () => {
    var text = document.querySelector("textarea").value;
    var score = calculateReadability(text);
    var readability = classifyReadability(score);
    var blockDiv = document.querySelector(".div");
    blockDiv.innerHTML = `Leiturabilidade: ${score} (${readability})`;
  });
  