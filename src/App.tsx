import React, { useEffect, useState, useRef } from 'react';
import {
  FileDown,
  Printer,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Award,
  Eye,
  SlidersHorizontal,
  FileText,
} from 'lucide-react';
import { CERTIFICATE_01_DATA, CertificateRecord } from './data/certificateData';
import { CertificateDocument } from './components/CertificateDocument';
import { CertificateValidator } from './components/CertificateValidator';
import { CourseInteractiveModules } from './components/CourseInteractiveModules';
import { GithubDeployGuide } from './components/GithubDeployGuide';
import { CertificateEditorPanel } from './components/CertificateEditorPanel';
import {
  downloadCertificateVectorPdf,
  createCertificatePdfBlobUrl,
} from './utils/generateCertificatePdf';

export default function App() {
  const [certData, setCertData] = useState<CertificateRecord>(CERTIFICATE_01_DATA);
  const [urlQueryCode, setUrlQueryCode] = useState<string>('');
  const [certPageFilter, setCertPageFilter] = useState<'both' | 'page1' | 'page2'>('both');
  const [viewerMode, setViewerMode] = useState<'html-a4' | 'native-pdf'>('html-a4');
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string>('');
  const [previewScale, setPreviewScale] = useState<number>(0.88);
  const certSectionRef = useRef<HTMLElement | null>(null);
  const validatorSectionRef = useRef<HTMLDivElement | null>(null);

  // Detect URL ?codigo=... and #validador on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codigoParam = params.get('codigo') || params.get('chave') || '';
    if (codigoParam) {
      setUrlQueryCode(codigoParam);
    }

    if (window.location.hash === '#validador' || codigoParam) {
      setTimeout(() => {
        const el = document.getElementById('validador');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }

    // Responsive default scale for the 297mm certificate preview on screen
    const updateResponsiveScale = () => {
      const vw = window.innerWidth;
      if (vw < 640) {
        setPreviewScale(0.32);
      } else if (vw < 1024) {
        setPreviewScale(0.58);
      } else if (vw < 1280) {
        setPreviewScale(0.78);
      } else {
        setPreviewScale(0.92);
      }
    };

    updateResponsiveScale();
    window.addEventListener('resize', updateResponsiveScale);
    return () => window.removeEventListener('resize', updateResponsiveScale);
  }, []);

  // Generate embedded vector PDF blob URL whenever user switches to Native PDF Viewer or updates data
  useEffect(() => {
    let active = true;
    let currentUrl = '';

    if (viewerMode === 'native-pdf') {
      createCertificatePdfBlobUrl(certData)
        .then((url) => {
          if (active) {
            currentUrl = url;
            setPdfBlobUrl(url);
          }
        })
        .catch((err) => console.error('Failed to build PDF blob:', err));
    }

    return () => {
      active = false;
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [viewerMode, certData]);

  // Direct 1-click download of the accessible/selectable 2-page vector PDF
  const handleDirectDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      await downloadCertificateVectorPdf(certData);
    } catch (err) {
      console.error('Error generating vector PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrintCertificate = () => {
    setCertPageFilter('both');
    setTimeout(() => {
      window.print();
    }, 80);
  };

  const handleResetCertificateData = () => {
    setCertData(CERTIFICATE_01_DATA);
  };

  const scrollToCertificateViewer = () => {
    const el = document.getElementById('certificado');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToValidator = () => {
    const el = document.getElementById('validador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* =====================================================================
          INTERFACE WEB DO PORTAL E VALIDADOR (OCULTA NA IMPRESSÃO @media print)
         ===================================================================== */}
      <div className="no-print">
        {/* TOP NAVIGATION BAR (Strict 3-Zone Contract) */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
            {/* Zone 1: Single-line Brand Wordmark */}
            <a
              href="#"
              className="text-base sm:text-lg font-bold tracking-tight text-slate-900 font-serif-cert whitespace-nowrap shrink-0"
            >
              Editora Mente e Saúde · Extensão EAD
            </a>

            {/* Zone 2: 5 Single-line Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a
                href="#certificado"
                className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Certificado Nº 01
              </a>
              <a
                href="#validador"
                className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Validador Público
              </a>
              <a
                href="#ementa"
                className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Matriz Curricular
              </a>
              <a
                href="#laboratorio"
                className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Vancouver & IMRD
              </a>
              <a
                href="#deploy"
                className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                GitHub & Vercel
              </a>
            </nav>

            {/* Zone 3: 1 Primary Action Button (Direct Download of Accessible Vector .PDF) */}
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={handleDirectDownloadPdf}
                disabled={isGeneratingPdf}
                className="px-4 py-2 bg-[#14452F] hover:bg-[#0F3523] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
              >
                <FileDown className="w-4 h-4 text-amber-300" />
                {isGeneratingPdf ? 'Gerando PDF...' : 'Baixar PDF (2 Laudas)'}
              </button>
            </div>
          </div>
        </header>

        {/* HERO SECTION — EDITORIAL CIENTÍFICO EM AZUL SAFIRA, VERDE ESMERALDA E OURO ACADÊMICO */}
        <section className="relative bg-gradient-to-b from-[#0B1F3A] via-[#0F2942] to-[#113328] text-white py-14 sm:py-20 border-b border-amber-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Coluna Esquerda: Apresentação do Curso e Dados Oficiais */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-amber-300">
                    Programa Interinstitucional de Extensão, Comunicação Científica e Educação em Saúde
                  </div>

                  <h1
                    className="text-2xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-white font-serif-cert leading-[1.18]"
                    style={{ textWrap: 'balance' }}
                  >
                    Curso de Extensão EAD em Escrita Científica, Normas Editoriais (Vancouver/ABNT) e Publicação de Artigos Biomédicos
                  </h1>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                    Formação metodológica avançada promovida pela <strong>Editora Mente e Saúde</strong> (CNPJ: 51.372.335/0001-71)
                    em parceria institucional com o <strong>Centro Profissionalizante Maria Dalva de Araújo</strong> (CNPJ: 51.269.112/0001-83),
                    estruturada em <strong>36 horas-aula</strong> com foco prático no delineamento IMRD, diretrizes internacionais do
                    ICMJE, indexação DeCS/MeSH e submissão a periódicos médicos com revisão por pares.
                  </p>
                </div>

                {/* Ações Principais do Hero */}
                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={handleDirectDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-md"
                  >
                    <FileDown className="w-4 h-4" />
                    {isGeneratingPdf
                      ? 'Gerando Arquivo .PDF Acessível...'
                      : 'Baixar Certificado Nº 01 (.PDF Vetorial Editável)'}
                  </button>
                  <button
                    type="button"
                    onClick={scrollToCertificateViewer}
                    className="px-5 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/25 font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-amber-300" />
                    Visualizar / Editar Certificado na Tela
                  </button>
                  <button
                    type="button"
                    onClick={scrollToValidator}
                    className="px-4 py-3 text-emerald-300 hover:text-emerald-200 font-mono text-xs underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Validar Cód. {certData.code}
                  </button>
                </div>
              </div>

              {/* Coluna Direita: Card Institucional de Registro e Fé Pública do Titular */}
              <div className="lg:col-span-5 bg-slate-950/75 border border-amber-400/30 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-2xl">
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/cert/logo_editora.png"
                      alt="Logo Editora Mente e Saúde"
                      className="w-12 h-12 object-contain bg-white rounded-lg p-1"
                    />
                    <img
                      src="/assets/cert/logo_centro.png"
                      alt="Logo Centro Profissionalizante"
                      className="w-12 h-12 object-contain bg-white rounded-lg p-1"
                    />
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-[11px] uppercase text-emerald-400 font-bold">
                      ✓ Fé Pública Verificada
                    </div>
                    <div className="text-xs text-white font-bold mt-0.5">
                      {certData.code}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Profissional Titular Certificado (Item 09)
                  </div>
                  <div className="text-xl font-bold text-white font-serif-cert tracking-wide">
                    {certData.holderName}
                  </div>
                  <div className="text-xs text-amber-200/90 font-medium">
                    {certData.holderLine}
                  </div>

                  <div className="pt-3 grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-lg">
                      <span className="text-slate-400 text-[10px] block">REGISTRO E LIVRO</span>
                      <strong className="text-white mt-0.5 block">
                        Nº {certData.certNumber} · Livro {certData.bookNumber} (Fl. {certData.pageNumber})
                      </strong>
                    </div>
                    <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-lg">
                      <span className="text-slate-400 text-[10px] block">CARGA HORÁRIA E NOTA</span>
                      <strong className="text-emerald-400 mt-0.5 block">
                        {certData.totalHoursNumeric} Horas · Nota {certData.finalGrade}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>Chave: {certData.controlKey}</span>
                  <span className="text-emerald-400 font-bold">SITUAÇÃO: {certData.status}</span>
                </div>
              </div>
            </div>

            {/* Faixa de Indicadores Institucionais Abaixo do Hero */}
            <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
              <div>
                <div className="text-slate-400 font-mono text-xs uppercase">Enquadramento Normativo</div>
                <div className="text-white font-bold mt-1">Item 09 — Atividades Extracurriculares (≥ 30h)</div>
              </div>
              <div>
                <div className="text-slate-400 font-mono text-xs uppercase">Período de Realização</div>
                <div className="text-white font-bold mt-1">{certData.period} ({certData.totalHoursNumeric} horas)</div>
              </div>
              <div>
                <div className="text-slate-400 font-mono text-xs uppercase">Formato do Certificado</div>
                <div className="text-white font-bold mt-1">PDF Vetorial Selecionável/Editável (2 Laudas A4)</div>
              </div>
              <div>
                <div className="text-slate-400 font-mono text-xs uppercase">Autenticidade Criptográfica</div>
                <div className="text-amber-300 font-mono font-bold mt-1">QR Code Clicável + SHA-256</div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SEÇÃO DO VISUALIZADOR, EDITOR E DOWNLOAD DIRETO DO CERTIFICADO Nº 01
           ===================================================================== */}
        <section
          id="certificado"
          ref={certSectionRef}
          className="py-14 bg-slate-200/75 border-b border-slate-300 scroll-mt-14"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Painel de Edição Expansível (Todos os Campos + Restaurar Padrão) */}
            {showEditor && (
              <CertificateEditorPanel
                data={certData}
                onChange={setCertData}
                onReset={handleResetCertificateData}
                onDownloadPdf={handleDirectDownloadPdf}
                isGeneratingPdf={isGeneratingPdf}
              />
            )}

            <div>
              {/* Barra de Controle Estilo Leitor PDF */}
              <div className="bg-slate-900 text-white rounded-t-2xl p-4 sm:px-6 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-800/80 border border-emerald-600/40 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-amber-300 uppercase tracking-wider">
                      Documento Oficial Acessível (Texto 100% Selecionável · 2 Laudas A4 Paisagem)
                    </div>
                    <h2 className="text-sm sm:text-base font-bold text-white font-mono">
                      Certificado_Extensao_{certData.certNumber}_{certData.code}_Lucas_Goncalves_Silveira.pdf
                    </h2>
                  </div>
                </div>

                {/* Controles de Modo de Visualização, Edição, Zoom e Download Direto PDF */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Alternador: Laudas A4 Selecionáveis vs Leitor PDF Embutido */}
                  <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700">
                    <button
                      type="button"
                      onClick={() => setViewerMode('html-a4')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        viewerMode === 'html-a4'
                          ? 'bg-emerald-700 text-white'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      Laudas A4 (Texto Selecionável)
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewerMode('native-pdf')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                        viewerMode === 'native-pdf'
                          ? 'bg-emerald-700 text-white'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Leitor PDF Nativo
                    </button>
                  </div>

                  {/* Filtro de Páginas quando em modo Laudas A4 */}
                  {viewerMode === 'html-a4' && (
                    <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700">
                      <button
                        type="button"
                        onClick={() => setCertPageFilter('both')}
                        className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          certPageFilter === 'both'
                            ? 'bg-slate-700 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Ambas
                      </button>
                      <button
                        type="button"
                        onClick={() => setCertPageFilter('page1')}
                        className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          certPageFilter === 'page1'
                            ? 'bg-slate-700 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Frente
                      </button>
                      <button
                        type="button"
                        onClick={() => setCertPageFilter('page2')}
                        className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          certPageFilter === 'page2'
                            ? 'bg-slate-700 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Verso
                      </button>
                    </div>
                  )}

                  {/* Botão Modo de Edição */}
                  <button
                    type="button"
                    onClick={() => setShowEditor((prev) => !prev)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                      showEditor
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    {showEditor ? 'Fechar Edição' : 'Editar Campos'}
                  </button>

                  {/* Controle de Zoom */}
                  {viewerMode === 'html-a4' && (
                    <div className="hidden md:flex items-center bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 gap-1">
                      <button
                        type="button"
                        onClick={() => setPreviewScale((s) => Math.max(0.4, Number((s - 0.08).toFixed(2))))}
                        className="p-1.5 text-slate-300 hover:text-white cursor-pointer"
                        title="Reduzir Zoom"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <span className="font-mono text-xs text-slate-200 px-1 min-w-[44px] text-center">
                        {Math.round(previewScale * 100)}%
                      </span>
                      <button
                        type="button"
                        onClick={() => setPreviewScale((s) => Math.min(1.15, Number((s + 0.08).toFixed(2))))}
                        className="p-1.5 text-slate-300 hover:text-white cursor-pointer"
                        title="Aumentar Zoom"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewScale(0.92)}
                        className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                        title="Restaurar Escala"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Botão Primário: Download Direto do Arquivo .PDF Vetorial */}
                  <button
                    type="button"
                    onClick={handleDirectDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                  >
                    <FileDown className="w-4 h-4" />
                    {isGeneratingPdf ? 'Gerando .PDF...' : 'Baixar Arquivo .PDF'}
                  </button>

                  {/* Botão Secundário: Impressão Direta */}
                  <button
                    type="button"
                    onClick={handlePrintCertificate}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                    title="Imprimir Certificado (Ctrl+P)"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Palco de Visualização do Documento */}
              {viewerMode === 'html-a4' ? (
                <div className="bg-slate-700/95 border-x border-b border-slate-800 rounded-b-2xl py-8 px-2 sm:px-6 overflow-x-auto flex flex-col items-center">
                  <div
                    className="transition-transform origin-top flex flex-col items-center"
                    style={{
                      transform: `scale(${previewScale})`,
                      marginBottom:
                        certPageFilter === 'both'
                          ? `calc((420mm + 32px) * (${previewScale} - 1))`
                          : `calc(210mm * (${previewScale} - 1))`,
                    }}
                  >
                    <CertificateDocument data={certData} visiblePages={certPageFilter} />
                  </div>
                </div>
              ) : (
                <div className="bg-slate-800 border-x border-b border-slate-800 rounded-b-2xl p-4 flex flex-col items-center">
                  {pdfBlobUrl ? (
                    <iframe
                      src={pdfBlobUrl}
                      title="Certificado Nº 01 PDF Oficial Incorporado"
                      className="w-full h-[780px] rounded-xl border border-slate-700 bg-white"
                    />
                  ) : (
                    <div className="w-full h-[500px] flex items-center justify-center text-slate-300 font-mono text-sm">
                      Construindo documento PDF vetorial acessível de 2 laudas...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SISTEMA OFICIAL DE VERIFICAÇÃO PÚBLICA DE AUTENTICIDADE (#validador)
           ===================================================================== */}
        <div ref={validatorSectionRef}>
          <CertificateValidator
            data={certData}
            initialQuery={urlQueryCode}
            onDownloadPdf={handleDirectDownloadPdf}
            isGeneratingPdf={isGeneratingPdf}
            onScrollToCertificate={scrollToCertificateViewer}
          />
        </div>

        {/* =====================================================================
            MÓDULOS INTERATIVOS DO CURSO DE ESCRITA CIENTÍFICA (IMRD, VANCOUVER/ABNT, ACERVO, SIMULADO)
           ===================================================================== */}
        <CourseInteractiveModules />

        {/* =====================================================================
            GUIA DE COMANDOS GITHUB & VERCEL
           ===================================================================== */}
        <GithubDeployGuide />

        {/* RODAPÉ INSTITUCIONAL */}
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/cert/logo_editora.png"
                  alt="Editora Mente e Saúde"
                  className="w-10 h-10 object-contain bg-white rounded p-0.5"
                />
                <img
                  src="/assets/cert/logo_centro.png"
                  alt="Centro Profissionalizante Maria Dalva de Araújo"
                  className="w-10 h-10 object-contain bg-white rounded p-0.5"
                />
                <div className="text-white font-bold text-sm font-serif-cert">
                  Programa Interinstitucional de Extensão e Educação em Saúde
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Plataforma oficial de documentação pedagógica, transparência acadêmica e verificação pública de
                autenticidade de certificados emitidos em regime de cooperação técnica e editorial.
              </p>
            </div>

            <div className="md:col-span-4 space-y-1.5 font-mono">
              <div className="text-white font-sans font-bold uppercase tracking-wider mb-2">
                Entidades Certificadoras
              </div>
              <div>Editora Mente e Saúde · CNPJ: 51.372.335/0001-71</div>
              <div>Centro Profissionalizante Maria Dalva de Araújo · CNPJ: 51.269.112/0001-83</div>
              <div className="text-emerald-400 pt-1">Goiânia - GO · Válido em Todo o Território Nacional</div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <div className="text-white font-bold uppercase tracking-wider mb-2">
                Download Direto do Certificado
              </div>
              <button
                type="button"
                onClick={handleDirectDownloadPdf}
                disabled={isGeneratingPdf}
                className="w-full py-2.5 px-3 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-amber-300" />
                {isGeneratingPdf ? 'Gerando .PDF...' : 'Baixar Certificado Nº 01 (.PDF)'}
              </button>
              <a
                href={`?codigo=${certData.code}#validador`}
                className="block text-center py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg font-mono text-[11px]"
              >
                Link Direto: ?codigo={certData.code}
              </a>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
            <div>
              Registro Oficial Nº {certData.certNumber} · Livro {certData.bookNumber} · Folha {certData.pageNumber} · Cód. {certData.code}
            </div>
            <div>
              SHA-256: {certData.sha256}
            </div>
          </div>
        </footer>
      </div>

      {/* =====================================================================
          CONTAINER EXCLUSIVO DE IMPRESSÃO / EXPORTAÇÃO PDF (@media print)
          Imprime exclusivamente as 2 laudas A4 Paisagem sem qualquer UI web.
         ===================================================================== */}
      <div className="hidden print-only-container">
        <CertificateDocument data={certData} visiblePages="both" />
      </div>
    </div>
  );
}
