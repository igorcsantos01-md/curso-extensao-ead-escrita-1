import React, { useState } from 'react';
import { Terminal, Copy, Check, GitBranch, Globe, FileCheck2, Printer } from 'lucide-react';
import { CERTIFICATE_01_DATA } from '../data/certificateData';

export const GithubDeployGuide: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCommand = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const gitInitCommands = `# 1. Inicializar o repositório Git na pasta do projeto
git init
git branch -M main

# 2. Adicionar todos os arquivos (incluindo logotipos e assinaturas oficiais em public/assets/cert/)
git add .
git commit -m "feat: portal extensao escrita cientifica + certificado 01 (EMS-EXT-2023-0901) e validador"

# 3. Criar o repositório no GitHub via GitHub CLI (ou vincular ao repositório remoto)
gh repo create extensao-escrita-cientifica-1 --public --source=. --remote=origin --push`;

  const gitRemoteAlternative = `# Caso prefira criar o repositório pelo navegador em github.com/new:
git remote add origin https://github.com/SEU-USUARIO/extensao-escrita-cientifica-1.git
git push -u origin main`;

  const vercelCommands = `# Publicação direta na Vercel garantindo o domínio exato do QR Code:
npx vercel --prod --name extensao-escrita-cientifica-1 --yes`;

  return (
    <section id="deploy" className="py-16 bg-slate-900 text-white border-t border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
            Guia Operacional de Repositório GitHub & Deploy na Vercel
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white font-serif-cert">
            Comandos Prontos para Publicação do Sistema e Ativação do QR Code
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Utilize a sequência de comandos abaixo para versionar este projeto completo no seu <strong>GitHub</strong> e
            publicá-lo na <strong>Vercel</strong> com o identificador <code className="text-amber-300">extensao-escrita-cientifica-1</code>,
            ativando imediatamente a URL oficial <code className="text-emerald-300">{CERTIFICATE_01_DATA.verificationUrl}</code> codificada nos QR Codes do Certificado Nº 01.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bloco 1: Comandos Git & GitHub */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <GitBranch className="w-4 h-4 text-emerald-400" />
                  <span>PASSO 1 — CRIAR REPOSITÓRIO NO GITHUB E ENVIAR CÓDIGO</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCommand(gitInitCommands, 'git-init')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-300 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === 'git-init' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copiar Comandos
                    </>
                  )}
                </button>
              </div>
              <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                {gitInitCommands}
              </pre>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span>ALTERNATIVA — VINCULAR A UM REPOSITÓRIO CRIADO NO NAVEGADOR</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCommand(gitRemoteAlternative, 'git-remote')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-300 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === 'git-remote' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copiar
                    </>
                  )}
                </button>
              </div>
              <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                {gitRemoteAlternative}
              </pre>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>PASSO 2 — PUBLICAR NA VERCEL COM O SUBDOMÍNIO OFICIAL</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCommand(vercelCommands, 'vercel-cmd')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-300 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === 'vercel-cmd' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copiar Comando
                    </>
                  )}
                </button>
              </div>
              <pre className="p-5 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {vercelCommands}
              </pre>
            </div>
          </div>

          {/* Bloco 2: Checklist de Exportação Perfeita do PDF de 2 Laudas */}
          <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700 rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 font-mono text-xs uppercase tracking-wider">
                <Printer className="w-4 h-4" />
                Checklist de Exportação do PDF Oficial (2 Laudas A4)
              </div>
              <h3 className="text-lg font-bold text-white font-serif-cert">
                Parâmetros para Salvar o PDF com Perfeição Cirúrgica
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                O sistema já possui regras nativas <code className="text-amber-300">@page &#123; size: A4 landscape; margin: 0; &#125;</code> e{' '}
                <code className="text-amber-300">print-color-adjust: exact</code>. Ao clicar em <strong>"Baixar / Imprimir Certificado (PDF 2 Laudas)"</strong>:
              </p>

              <ul className="space-y-3 text-xs text-slate-200 pt-1">
                <li className="flex items-start gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Destino:</strong> Selecione <strong>Salvar como PDF</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Layout / Orientação:</strong> Paisagem (Horizontal) — configurado automaticamente.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tamanho do Papel:</strong> A4 (297mm × 210mm) e <strong>Margens: Nenhuma / Padrão</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Gráficos de Segundo Plano:</strong> Mantenha <strong>Ativado</strong> para preservar o Selo Oficial dourado, a caixa marfim do titular e os quadros do verso.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-slate-950/90 border border-slate-700 rounded-lg space-y-1.5 text-xs">
              <div className="font-mono text-emerald-400 font-bold">
                Nome Sugerido para o Arquivo PDF:
              </div>
              <div className="font-mono text-slate-200 break-all text-[11px]">
                Certificado_Extensao_01_EMS-EXT-2023-0901_Lucas_Goncalves_Silveira.pdf
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
