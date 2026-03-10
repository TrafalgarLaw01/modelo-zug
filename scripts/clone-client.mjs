import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function run() {
    console.log('=============================================');
    console.log('🚀 Luxury Real Estate Template - Cloning Tool');
    console.log('=============================================\n');

    const name = await question('1. Nome da Agência/Cliente (ex: Luxury Estates Zug): ');

    console.log('\n🎨 Configuração de Cores');
    console.log('Por padrão a paleta precisa de 5 cores hex/rgba: [Primary, Secondary, Surface, Foreground, Overlay]');
    console.log('Se você deixar em branco, usaremos o padrão escuro premium (Eindhoven Style).');

    const colorsInput = await question('Digite 5 cores separadas por vírgula (ou Enter para pular): ');

    let palette = ["#1a1a1a", "#d4af37", "#f5f5f5", "#000000", "rgba(255,255,255,0.1)"];
    let useManual = true;

    if (colorsInput.trim()) {
        const inputPalette = colorsInput.split(',').map(c => c.trim());
        if (inputPalette.length === 5) {
            palette = inputPalette;
        } else {
            console.log('⚠️ Foram fornecidas ' + inputPalette.length + ' cores em vez de 5. Usando paleta padrão...');
        }
    }

    console.log('\n📞 Informações de Contato');
    const email = await question('E-mail: ');
    const whatsapp = await question('WhatsApp (ex: +41790000000): ');
    const instagram = await question('Instagram Link (opcional): ');

    console.log('\n⚙️ Gerando novo schema client-data.ts...');

    const template = `export const clientData = {
  locale: ['de', 'en', 'fr'], // Supported locales
  defaultLocale: 'de',
  branding: {
    name: ${JSON.stringify(name || 'Boutique Real Estate')},
    colors: {
      useManual: ${useManual},
      palette: ${JSON.stringify(palette)}
    },
    typography: {
      heading: "Playfair Display",
      body: "Inter"
    }
  },
  content: {
    hero: {
      de: { title: "Exklusive Immobilien", subtitle: "Diskretion trifft auf Exzellenz" },
      en: { title: "Exclusive Properties", subtitle: "Discretion meets Excellence" },
      fr: { title: "Propriétés Exclusives", subtitle: "La discrétion rencontre l'excellence" }
    },
    about: {
      de: "Unsere Geschichte beginnt in den Alpen...",
      en: "Our story begins in the Alps...",
      fr: "Notre histoire commence dans les Alpes..."
    },
    features: ["Off-Market", "Tailored", "Discreet"]
  },
  contact: {
    email: ${JSON.stringify(email || 'office@example.ch')},
    whatsapp: ${JSON.stringify(whatsapp || '+41700000000')},
    waMessage: "Grüezi, ich interessiere mich für...",
    googleMaps: "https://goo.gl/maps/",
    instagram: ${instagram ? JSON.stringify(instagram) : 'undefined'},
    linkedin: undefined,
    facebook: undefined
  }
};
`;

    const targetPath = path.join(process.cwd(), 'src', 'config', 'client-data.ts');

    // Create directories if they don't exist
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, template, 'utf8');

    console.log(`\n✅ Sucesso! Dados do cliente injetados em: ${targetPath}`);
    console.log('Inicie o servidor de desenvolvimento para ver as alterações: npm run dev');
    rl.close();
}

run().catch(err => {
    console.error(err);
    rl.close();
});
