window.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("chatbot.html");
  const html = await res.text();

  const container = document.createElement("div");
  container.innerHTML = html;

  document.body.appendChild(container);

  renderStep("inicio");
});

const intents = [
  {
    name: "hablar",
    keywords: [
      "hablar",
      "decir",
      "contar",
      "explicar",
      "como hablo",
      "cómo hablo",
      "como le digo",
      "cómo le digo",
      "que le digo",
      "qué le digo",
      "como explico",
      "cómo explico",
      "hijo",
      "hija",
      "niño",
      "niña",
      "adolescente",
    ],
    response:
      "Podés empezar con preguntas simples y sin juzgar. Por ejemplo: '¿alguna vez alguien te habló y te hizo sentir incómodo?' o 'si alguien te pide guardar un secreto, ¿sabés que podés contármelo?'. Lo importante es generar confianza 💜",
  },
  {
    name: "grooming",
    keywords: [
      "grooming",
      "desconocido",
      "desconocidos",
      "extraño",
      "extraños",
      "adulto",
      "adultos",
      "raro",
      "gente rara",
      "habla con gente",
      "habla con desconocidos",
      "perfil falso",
    ],
    response:
      "El grooming suele empezar con alguien que parece amable. Puede escuchar, jugar o generar confianza poco a poco, y después pedir secretos o llevar la conversación a algo incómodo.",
  },
  {
    name: "contenido",
    keywords: [
      "porno",
      "pornografia",
      "pornografía",
      "contenido",
      "violencia",
      "sexual",
      "sexualizado",
      "inapropiado",
      "cosas feas",
      "trauma",
    ],
    response:
      "El contenido inapropiado puede aparecer sin buscarlo. Es importante acompañar, hablar de lo que ven y usar configuraciones de seguridad cuando haga falta.",
  },
  {
    name: "alertas",
    keywords: [
      "alerta",
      "alertas",
      "señales",
      "senales",
      "cambio",
      "cambios",
      "conducta",
      "aislamiento",
      "secretos",
      "esconde",
      "esconder",
    ],
    response:
      "Algunas señales de alerta son: cambios de humor, aislamiento, secretos, miedo al usar el celular o esconder conversaciones.",
  },
  {
    name: "controles",
    keywords: [
      "control",
      "controles",
      "privacidad",
      "configurar",
      "configuracion",
      "configuración",
      "bloquear",
      "filtro",
      "filtros",
      "youtube kids",
      "control parental",
    ],
    response:
      "Podés usar controles parentales, cuentas privadas, filtros y límites de uso. Eso ayuda, pero sigue siendo importante hablar y acompañar.",
  },
  {
    name: "adiccion",
    keywords: [
      "adiccion",
      "adicción",
      "dependencia",
      "pantalla",
      "tiempo",
      "exceso",
      "ansiedad",
      "sobreestimulacion",
      "sobreestimulación",
    ],
    response:
      "El exceso de pantalla también preocupa mucho. Más que prohibir de golpe, suele ayudar poner rutinas claras, límites sostenibles y acompañar el uso.",
  },
  {
    name: "estafas",
    keywords: [
      "estafa",
      "estafas",
      "engaño",
      "engaños",
      "phishing",
      "robar",
      "compra",
      "compras",
      "tarjeta",
    ],
    response:
      "Las estafas y engaños también son un riesgo. Conviene enseñar a no compartir datos, no tocar links raros y consultar a un adulto antes de comprar o registrarse.",
  },
  {
    name: "juegos",
    keywords: ["juego", "juegos", "roblox", "fortnite", "minecraft", "discord"],
    response:
      "En juegos online puede haber contacto con desconocidos, chats incómodos o pedidos raros. Vale la pena revisar configuraciones, listas de amigos y cómo se comunican.",
  },
];

const flows = {
  inicio: {
    message: "Hola, soy Deva 💜 ¿En qué necesitás ayuda?",
    options: [
      { label: "Desconocidos", next: "desconocidos" },
      { label: "Contenido", next: "contenido" },
      { label: "Alertas", next: "alertas" },
      { label: "Cómo hablar", next: "hablar" },
      { label: "Empezar", next: "empezar" },
    ],
  },

  desconocidos: {
    message:
      "Es una de las preocupaciones más comunes 💜 Muchas veces empieza como alguien amable o que quiere jugar.",
    options: [
      { label: "Cómo empieza", next: "grooming_empieza" },
      { label: "Señales de alerta", next: "grooming_alertas" },
      { label: "Qué hacer si sospecho", next: "grooming_que_hacer" },
      { label: "Volver al inicio", next: "inicio" },
    ],
  },

  grooming_empieza: {
    message:
      "Suele empezar con confianza: alguien que escucha, juega o pide secretos. Nunca aparece como peligro al principio.",
    options: [{ label: "Volver al inicio", next: "inicio" }],
  },

  grooming_alertas: {
    message:
      "Señales: cambios de conducta, secretos, aislamiento, miedo al celular o a cerrar una conversación cuando un adulto se acerca.",
    options: [{ label: "Volver al inicio", next: "inicio" }],
  },

  grooming_que_hacer: {
    message:
      "No culpes ni retes. Escuchá, guardá pruebas y buscá ayuda. Lo más importante es que se sientan seguros para contarlo.",
    options: [{ label: "Volver al inicio", next: "inicio" }],
  },

  contenido: {
    message:
      "Hoy es muy fácil acceder a contenido violento o sexual. Muchas veces no lo buscan: aparece solo.",
    options: [
      { label: "Cómo prevenir", next: "contenido_prevenir" },
      { label: "Configurar controles", next: "contenido_config" },
      { label: "Volver al inicio", next: "inicio" },
    ],
  },

  contenido_prevenir: {
    message:
      "Acompañar, hablar y no dejar que naveguen solos es clave. El control técnico ayuda, pero no reemplaza el diálogo.",
    options: [{ label: "Volver al inicio", next: "inicio" }],
  },

  contenido_config: {
    message:
      "Podés usar controles parentales, cuentas privadas y filtros. Después podemos sumar guías paso a paso para cada app.",
    options: [{ label: "Volver al inicio", next: "inicio" }],
  },

  alertas: {
    message:
      "Algunas señales importantes: cambios de humor, aislamiento, secretos, miedo al usar el celular o conversaciones que esconden.",
    options: [{ label: "Volver al inicio", next: "inicio" }],
  },

  hablar: {
    message:
      "No hace falta asustar. Podés empezar con preguntas simples, sin invadir ni acusar.",
    options: [{ label: "Volver al inicio", next: "inicio" }],
  },

  empezar: {
    message:
      "Es normal no saber por dónde empezar 💜 Podés empezar por acompañar, preguntar y generar confianza.",
    options: [
      { label: "Ver riesgos comunes", next: "desconocidos" },
      { label: "Volver al inicio", next: "inicio" },
    ],
  },
};

//Logica

function renderStep(stepKey) {
  const chat = document.getElementById("chatMessages");
  const optionsContainer = document.querySelector(".chat-options");
  const step = flows[stepKey];

  if (!chat || !optionsContainer || !step) return;

  const botMsg = document.createElement("div");
  botMsg.className = "bot-msg";
  botMsg.innerText = step.message;
  chat.appendChild(botMsg);

  optionsContainer.innerHTML = "";

  step.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.innerText = opt.label;
    btn.onclick = () => sendOption(opt.next, opt.label);
    optionsContainer.appendChild(btn);
  });

  chat.scrollTop = chat.scrollHeight;
}

window.sendOption = function (nextKey, label) {
  const chat = document.getElementById("chatMessages");
  if (!chat) return;

  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = label;
  chat.appendChild(userMsg);

  renderStep(nextKey);
};

window.openChatFromFloat = function (e) {
  e.preventDefault();
  document.getElementById("floatingChat").classList.remove("hidden");
};

window.closeChat = function () {
  document.getElementById("floatingChat").classList.add("hidden");
};

window.sendMessage = function () {
  const input = document.getElementById("userInput");

  const text = input.value.toLowerCase().trim();
  if (!text) return;

  const chat = document.getElementById("chatMessages");

  // mensaje usuario
  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = input.value;
  chat.appendChild(userMsg);

  input.value = "";

  const intent = detectIntent(text);

  let response = "";

  if (intent) {
    response = intent.response;
  } else {
    response =
      "No estoy segura de eso todavía 💜 pero puedo ayudarte con riesgos, señales o cómo hablar del tema.";
  }

  const botMsg = document.createElement("div");
  botMsg.className = "bot-msg";
  botMsg.innerText = response;
  chat.appendChild(botMsg);

  chat.scrollTop = chat.scrollHeight;
};

function detectIntent(text) {
  let bestIntent = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;

    for (const keyword of intent.keywords) {
      if (text.includes(keyword)) {
        score++;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  return bestIntent;
}
