import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const messages = [
  "Cada leitura é um passo a mais para o próximo nível! Continue firme! 🚀📖",
  "Você está cada vez mais informado! Continue subindo de nível! 📚✨",
  "A informação é poder! Continue lendo e se tornando mais forte! 💡🔥",
  "Seu conhecimento está crescendo a cada notícia! Não pare agora! 🎓📊",
  "A jornada do aprendizado nunca termina! Continue avançando! 🏆📜",
  "Você está criando um hábito incrível! Continue nessa pegada! 💪📚",
  "A cada nova leitura, um novo aprendizado! Vamos juntos! 🌍📖",
  "Persistência é a chave! Continue lendo e crescendo! 🔑📑",
  "O conhecimento te leva mais longe! Continue subindo de nível! 🚀💡",
  "Você está criando o hábito de se manter informado! Continue assim! 📰🚀",
  "Cada notícia lida te faz mais preparado para o mundo! Continue subindo! 📊💡",
  "Seu nível de conhecimento está aumentando! Rumo ao topo! 📈✨",
  "O segredo do sucesso é a constância! Continue lendo e evoluindo! 🔥📚",
  "Você já aprendeu muito, mas sempre há mais a descobrir! Vamos juntos! 🧠🌟",
  "A cada notícia, você se torna mais sábio! Continue crescendo! 🎓📖",
  "O próximo nível está ao seu alcance! Só mais um pouco! 💪📑",
  "Ser bem informado é um superpoder! Continue desbloqueando conhecimento! ⚡📜",
  "A melhor forma de crescer é nunca parar de aprender! Você está no caminho certo! 🚀📖",
  "O conhecimento não tem limites! Vamos mais longe juntos! 🔝🌍",
  "Você já chegou até aqui, e o próximo nível está te esperando! Continue firme! 💯🎯",
];

async function main() {
  await prisma.motivationalMessage.deleteMany(); // Limpa a tabela antes de popular

  await prisma.motivationalMessage.createMany({
    data: messages.map((message) => ({ message })),
  });

  console.log("Mensagens motivacionais adicionadas!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
