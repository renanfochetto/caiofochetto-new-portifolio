# Identidade Visual - Portfolio Caio Fochetto

Este documento detalha a identidade visual completa do portfolio, projetado para ser utilizado por desenvolvedores e IAs (como v0 da Vercel) na criação de sites derivados, garantindo consistência total de marca e UI.

---

## 1. Stack Tecnológica Base
- **Framework:** Next.js (App Router)
- **CSS:** Tailwind CSS
- **Animações:** tailwindcss-animate (ou Framer Motion para transições de página)

---

## 2. Tipografia (Fonts)

O site utiliza três famílias de fontes principais, carregadas via Google Fonts:

| Uso | Fonte | Variável CSS | Peso Sugerido |
| :--- | :--- | :--- | :--- |
| **Display (Editorial)** | Fraunces | `--font-display` | 400, 500, 600, 700 |
| **Headings (Moderno)** | Space Grotesk | `--font-heading` | 400, 500, 600, 700 |
| **Body (Legibilidade)** | Manrope | `--font-sans` | 400, 500, 600, 700 |

### Escala Tipográfica (Tailwind Tokens)

| Token | Tamanho | Line Height | Letter Spacing | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `text-display-3xl` | 3.5rem | 1.1 | -0.02em | Hero e Títulos Ultra |
| `text-display-2xl` | 2.5rem | 1.15 | -0.02em | Títulos de Seção Grandes |
| `text-display-xl` | 2rem | 1.2 | -0.01em | Títulos de Destaque |
| `text-h1` | 2rem | 1.2 | -0.01em | Título Principal |
| `text-h2` | 1.5rem | 1.25 | -0.01em | Subtítulos de Seção |
| `text-h3` | 1.25rem | 1.3 | - | Títulos de Cards |
| `text-body-base` | 1rem | 1.6 | - | Texto Corrido Padrão |
| `text-body-sm` | 0.875rem | 1.5 | - | Legendas e Textos Menores |

---

## 3. Cores e Design Tokens

As cores são baseadas em variáveis CSS para suportar Dark Mode (padrão) e Light Mode.

### Tema Dark (Default)
```css
:root {
  --background: 10 10 10;          /* #0a0a0a */
  --foreground: 250 250 250;      /* #fafafa */
  --card: 17 17 17;              /* #111111 */
  --card-foreground: 250 250 250;
  --primary: 202 255 0;          /* #caff00 - Verde Neon/Lima */
  --primary-foreground: 10 10 10;
  --secondary: 26 26 26;
  --secondary-foreground: 250 250 250;
  --muted: 26 26 26;
  --muted-foreground: 161 161 161;
  --border: 38 38 38;
  --input: 38 38 38;
  --ring: 202 255 0;
}
```

### Tema Light
```css
html.light {
  --background: 255 255 255;
  --foreground: 10 10 10;
  --card: 245 245 245;
  --card-foreground: 10 10 10;
  --primary: 217 70 239;          /* #d946ef - Rosa/Magenta */
  --primary-foreground: 255 255 255;
  --secondary: 240 240 240;
  --secondary-foreground: 10 10 10;
  --muted: 240 240 240;
  --muted-foreground: 99 99 99;
  --border: 229 229 229;
  --input: 229 229 229;
  --ring: 217 70 239;
}
```

---

## 4. Configuração Tailwind (Copy-Paste para v0)

Se estiver usando o v0, certifique-se de que o seu `tailwind.config.ts` inclua estas extensões para as fontes e tamanhos:

```typescript
// tailwind.config.ts excerpt
{
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        // ... outras cores seguindo o mesmo padrão
      },
      fontFamily: {
        display: ["var(--font-display)"],
        heading: ["var(--font-heading)"],
        sans: ["var(--font-sans)", "Manrope", "sans-serif"],
      },
      fontSize: {
        "display-3xl": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-2xl": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-xl": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "h1": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "h2": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        "body-base": ["1rem", { lineHeight: "1.6" }],
      }
    }
  }
}
```

---

## 5. Estilos de Base e Classes Utilitárias

Aplique estes estilos no seu `globals.css` para manter o comportamento visual:

- **Transições Suaves:** O site utiliza `transition: background-color 0.3s ease, color 0.3s ease;` no body.
- **Scrollbar Customizada:**
  - Track: `bg-background`
  - Thumb: `bg-primary` com `rounded`
- **Seleção de Texto:** `bg-primary text-primary-foreground`
- **Comportamento do Scroll:** `scroll-behavior: smooth;`

### Classes de Atalho Recomendadas
- `.display-3xl`: `@apply font-display text-display-3xl font-bold;`
- `.display-2xl`: `@apply font-display text-display-2xl font-bold;`
- `.display-xl`: `@apply font-display text-display-xl font-bold;`

---

## 6. Guia de Aplicação para IA (v0 Instruction)

Ao solicitar componentes no v0, use este prompt de contexto:

> "Siga estritamente a identidade visual: Fundo #0a0a0a (dark), cor primária #caff00 (lima). Use a fonte 'Fraunces' para títulos display (estilo editorial), 'Space Grotesk' para headings modernos e 'Manrope' para texto de corpo. Aplique bordas sutis com a cor `--border` (#262626) e cards com `--card` (#111111). Mantenha um espaçamento generoso e transições suaves entre estados."

---

## 7. Componentes Visuais Chave
- **Cards:** Devem ter fundo `--card`, bordas `--border` e leve arredondamento.
- **Botões Primários:** Fundo `--primary` (lima no dark, magenta no light), texto `--primary-foreground`.
- **Interatividade:** Hover em itens clicáveis geralmente altera a opacidade ou a cor da borda para `--primary`.
