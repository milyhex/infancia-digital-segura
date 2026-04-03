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
      "hablarle",
      "charlar",
      "conversar",
      "decir",
      "contar",
      "explicar",
      "como hablo",
      "cómo hablo",
      "como lo digo",
      "cómo lo hablo",
      "como le digo",
      "cómo le digo",
      "que le digo",
      "qué le digo",
      "como explico",
      "cómo explico",
      "hijo",
      "hija",
      "mi hijo",
      "mi hija",
      "niño",
      "niña",
      "adolescente",
      "pibe",
      "piba",
      "adolecentes",
    ],
    response:
      "Hablar del tema no es tener “la charla incómoda” de una vez, sino abrir un espacio. Podés empezar simple: preguntar, escuchar y mostrar que puede confiar en vos sin miedo a retarlo. Eso es lo que más los protege 💜",
    article: {
      label: "Si queres saber mas: Ver guía para familias",
      url: "blog.html",
    },
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
      "finge ser",
      "fingiendo ser",
      "se hace pasar",
      "contacto raro",
      "gente rara",
      "habla con gente",
      "habla con desconocidos",
      "perfil falso",
      "pedofilo",
      "pedofilia",
    ],
    response:
      "El grooming casi nunca empieza de forma obvia. Suele ser alguien que primero se gana su confianza: juega, escucha, acompaña… y recién después empieza a cruzar límites. Por eso es tan difícil de detectar.",
    article: {
      label: "Si queres saber mas: Ver guía para familias",
      url: "blog.html",
    },
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
      "contenido inapropiado",
      "violento",
      "traumatico",
      "traumatica",
      "ve cosas",
      "vea cosas",
    ],
    response:
      "Muchas veces el contenido inapropiado aparece sin que lo busquen. Más que controlar todo, es importante acompañar, hablar de lo que ven y usar configuraciones de seguridad cuando haga falta.",
    article: {
      label: "Si queres saber mas: Ver guía para familias",
      url: "blog.html",
    },
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
      "secreto",
      "oculta",
      "miedo",
      "raro",
      "comportamiento",
    ],
    response:
      "Algunas señales no son tan evidentes: cambios de humor, aislarse, esconder el celular o ponerse nervioso cuando alguien se acerca. No siempre significa algo grave, pero sí que algo está pasando.",
    article: {
      label: "Si queres saber mas: Ver guía para familias",
      url: "blog.html",
    },
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
      "restriccion",
      "restricciones",
      "cuenta privada",
      "seguridad",
    ],
    response:
      "Las herramientas ayudan, pero no hacen todo. Los controles parentales, filtros y cuentas privadas sirven como base… pero lo más importante sigue siendo el vínculo y la confianza.",
    article: {
      label: "Si queres saber mas: Ver guía para familias",
      url: "blog.html",
    },
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
      "pantallas",
      "estimulo",
      "estimulación",
      "uso excesivo",
      "no suelta el celular",
    ],
    response:
      "El problema no es solo cuánto usan las pantallas, sino cómo las usan. Más que prohibir, suele funcionar mejor acompañar, poner límites claros, entender qué y porque buscan y acompañar en el uso.",
    article: {
      label: "Si queres saber mas: Ver guía para familias",
      url: "blog.html",
    },
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
      "engano",
      "enganos",
      "datos",
      "datos personales",
      "link raro",
      "mensaje raro",
      "cuenta hackeada",
      "hackeo",
      "hackearon",
    ],
    response:
      "Las estafas hoy están en todos lados y muchas parecen inofensivas. Por eso es clave enseñar a desconfiar un poco: no compartir datos, no apurarse y siempre consultar antes de hacer clic con alguien de confianza.",
    article: {
      label: "Si queres saber mas: Ver guía para familias",
      url: "blog.html",
    },
  },
  {
    name: "ciberbullying",
    keywords: [
      "bullying",
      "ciberbullying",
      "acoso",
      "acoso cibernetico",
      "hostigamiento",
      "burlas",
      "humillacion",
      "amenazas",
      "molestan",
      "lo molestan",
      "la molestan",
    ],
    response:
      "El ciberbullying no siempre se ve. A veces son bromas constantes, exclusión o comentarios que parecen “chiquitos” pero afectan mucho. Lo más importante es que no lo enfrenten solos.",
    article: {
      label: "Si queres saber mas: Ver guía para familias",
      url: "blog.html",
    },
  },
  {
    name: "juegos",
    keywords: [
      "juego",
      "juegos",
      "roblox",
      "fortnite",
      "minecraft",
      "free fire",
      "chat de juego",
      "jugando",
      "videojuego",
      "videojuegos",
      "discord",
    ],
    response:
      "Los juegos online no son peligrosos en sí, pero sí lo que puede pasar dentro: chats con desconocidos, pedidos raros o confianza rápida. Vale la pena revisar configuraciones, listas de amigos y cómo se comunican.",
    article: {
      label: "Si queres saber mas: Ver guía para familias",
      url: "blog.html",
    },
  },
  {
    name: "compras",
    keywords: [
      "compras",
      "compra",
      "compro",
      "gastar",
      "gastos",
      "tarjeta",
      "pagar",
      "pago",
      "compras dentro del juego",
      "microtransacciones",
    ],
    response:
      "Las compras dentro de juegos o apps pueden traer riesgos y gastos inesperados. Conviene revisar métodos de pago y limitar compras sin autorización.",
    article: {
      label: "Si queres saber mas: Ver guía para familias",
      url: "blog.html",
    },
  },
  {
    name: "empezar",
    keywords: [
      "no se por donde empezar",
      "no se que hacer",
      "por donde empiezo",
      "estoy perdida",
      "estoy perdido",
      "no entiendo nada",
      "me siento perdida",
      "me siento perdido",
    ],
    response:
      "Es re normal sentirse así, hay mucha info y todo parece urgente. Si querés, vamos paso a paso según lo que más te preocupe, escribime que te preocupa, sino  💜",
    article: {
      label:
        "Si queres leer algo en particular: te dejo las guías para familias",
      url: "blog.html",
    },
  },
  //Mundano
  {
    name: "saludo",
    keywords: [
      "hola",
      "buenas",
      "buen dia",
      "buenas tardes",
      "buenas noches",
      "hey",
      "ola",
    ],
    response:
      "Hola 💜. Contame, ¿qué te está preocupando o qué te gustaría entender mejor?",
  },

  {
    name: "como_estas",
    keywords: ["como estas", "todo bien", "como va"],
    response:
      "Estoy Super! acá para ayudarte siempre 💜 ¿Querés contarme qué te preocupa o qué estás buscando?",
  },

  {
    name: "agradecimiento",
    keywords: ["gracias", "muchas gracias", "graciass"],
    response: "💜 Gracias a vos por confiar en preguntar, no es poca cosa.",
  },

  {
    name: "despedida",
    keywords: ["chau", "adios", "nos vemos", "bye"],
    response:
      "💜 Yo voy a seguir acá… cuando quieras volvemos a hablar, No hace falta tener todo resuelto hoy. ",
  },
  {
    name: "proyecto",
    keywords: [
      "proyecto deva",
      "proyecto",
      "que es proyecto deva",
      "de que se trata",
      "que haces",
      "para que sirve",
      "que es esto",
    ],
    response:
      "Proyecto Deva busca acompañar a familias en todo lo que pasa con chicos en internet: sin miedo, sin tecnicismos y con herramientas reales 💜",
  },
  {
    name: "Deva",
    keywords: ["que es deva", "quien es deva", "quien sos", "que sos", "deva"],
    response:
      "Soy Deva 💜 una amiga, una guía… y la que da la cara por todo el proyecto 😉",
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

  const originalText = input.value; // guardamos el texto real antes de vaciar el input

  const chat = document.getElementById("chatMessages");

  // mensaje usuario
  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = originalText;
  chat.appendChild(userMsg);

  input.value = "";

  const intent = detectIntent(text);

  let response = "";

  if (intent) {
    response = intent.response;

    logEvent({
      type: "intent_detected",
      text: originalText,
      intent: intent.name,
      resolved: true,
      page: window.location.pathname,
    });
  } else {
    response =
      "Perdón 💜 creo que no entendí bien. ¿Podés explicármelo de otra forma? O si preferís, podés escribirme por mail.";

    logEvent({
      type: "unresolved_message",
      text: originalText,
      intent: null,
      resolved: false,
      page: window.location.pathname,
    });
  }

  const botMsg = document.createElement("div");
  botMsg.className = "bot-msg";

  const botText = document.createElement("div");
  botText.className = "bot-msg-text";
  botText.innerText = response;
  botMsg.appendChild(botText);

  if (intent && intent.article) {
    const articleLink = document.createElement("a");
    articleLink.className = "chat-article-link";
    articleLink.href = intent.article.url;
    articleLink.innerText = intent.article.label;
    articleLink.target = "_blank";
    articleLink.rel = "noopener noreferrer";
    botMsg.appendChild(articleLink);
  }

  if (!intent) {
    const mailLink = document.createElement("a");
    mailLink.className = "chat-mail-link";
    mailLink.href = "mailto:contacto.proyectodeva@gmail.com";
    mailLink.innerText = "Enviar por mail";

    botText.appendChild(document.createElement("br"));
    botText.appendChild(mailLink);
  }

  chat.appendChild(botMsg);
  chat.scrollTop = chat.scrollHeight;
};

async function logEvent(event) {
  try {
    const docRef = await window.addDoc(
      window.collection(window.db, "chat_events"),
      {
        ...event,
        createdAt: new Date().toISOString(),
      },
    );

    console.log("Guardado OK, id:", docRef.id);
  } catch (e) {
    console.error("Error guardando evento", e);
  }
}

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
