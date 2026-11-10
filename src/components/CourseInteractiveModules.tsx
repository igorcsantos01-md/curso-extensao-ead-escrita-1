import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  CheckCircle2,
  Award,
  Copy,
  Check,
  RefreshCw,
  Layers,
  GraduationCap,
  Scale,
  Library,
  Sparkles,
} from 'lucide-react';
import {
  CERTIFICATE_01_DATA,
  CITATION_EXAMPLES,
  IMRD_GUIDES,
  DIDACTIC_MATERIALS,
  PROFICIENCY_QUIZ,
} from '../data/certificateData';

export const CourseInteractiveModules: React.FC = () => {
  // Module 1 State: IMRD & Vancouver/ABNT Lab
  const [selectedImrd, setSelectedImrd] = useState<'I' | 'M' | 'R' | 'D'>('I');
  const [selectedCitationId, setSelectedCitationId] = useState<string>(CITATION_EXAMPLES[0].id);
  const [citationNorm, setCitationNorm] = useState<'vancouver' | 'abnt'>('vancouver');
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);

  // Module 2 State: Didactic Repository
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(DIDACTIC_MATERIALS[0].id);

  // Module 3 State: Proficiency Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({
    1: 0,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
  });
  const [showQuizFeedback, setShowQuizFeedback] = useState<boolean>(true);

  const activeImrd = IMRD_GUIDES.find((g) => g.id === selectedImrd) || IMRD_GUIDES[0];
  const activeCitation = CITATION_EXAMPLES.find((c) => c.id === selectedCitationId) || CITATION_EXAMPLES[0];
  const activeMaterial = DIDACTIC_MATERIALS.find((m) => m.id === selectedMaterialId) || DIDACTIC_MATERIALS[0];

  const handleCopyReference = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const correctCount = PROFICIENCY_QUIZ.reduce((acc, q) => {
    return acc + (quizAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-20 py-16">
      {/* =====================================================================
          SEÇÃO 1: ARQUITETURA PEDAGÓGICA E MATRIZ DE 4 EIXOS (36 HORAS)
         ===================================================================== */}
      <section id="ementa" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-800">
            01. Estrutura Curricular Homologada · 36 Horas-Aula EAD
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 font-serif-cert">
            Matriz Programática e Metodologia Pedagógica do Curso de Extensão
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Desenvolvido em parceria institucional entre a <strong>Editora Mente e Saúde</strong> (curadoria editorial e
            científica) e o <strong>Centro Profissionalizante Maria Dalva de Araújo</strong> (certificação educacional e
            tecnológica), o curso estrutura-se em quatro eixos formativos que capacitam o médico na redação, normalização e
            publicação de manuscritos biomédicos em periódicos indexados.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATE_01_DATA.axes.map((axis, index) => (
            <div
              key={axis.axisNumber}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-3 border-b border-slate-100">
                  <span>MÓDULO 0{index + 1} · {axis.axisNumber.toUpperCase()}</span>
                  <span className="font-bold text-emerald-800">CARGA HORÁRIA: {axis.hours}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 font-serif-cert">
                  {axis.title}
                </h3>
                <div className="mt-1 text-xs font-medium text-blue-900">
                  {axis.subtitle}
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {axis.description}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Modalidade: Videoaulas Assíncronas + Estudo Dirigido</span>
                <span className="font-semibold text-emerald-700">Concluído (100%)</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SEÇÃO 2: LABORATÓRIO INTERATIVO IMRD & SIMULADOR VANCOUVER vs ABNT
         ===================================================================== */}
      <section id="laboratorio" className="bg-slate-100/80 border-y border-slate-200 py-16 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-900">
              02. Simulador Metodológico Interativo · Eixos I e II
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 font-serif-cert">
              Laboratório de Arquitetura IMRD e Normalização Vancouver (ICMJE) vs. ABNT
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore de forma prática os dois pilares centrais da escrita científica biomédica: a construção lógica das
              quatro seções do modelo <strong>IMRD</strong> e a conversão rigorosa de citações e referências bibliográficas
              entre o padrão internacional <strong>Vancouver (ICMJE / MEDLINE)</strong> e as normas <strong>ABNT (NBR 6023/10520)</strong>.
            </p>
          </div>

          {/* Parte A: Explorador Interativo da Arquitetura IMRD */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-800" />
                  Explorador Estrutural do Manuscrito Biomédico (Padrão IMRD)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Selecione cada movimento do artigo científico para inspecionar sua pergunta norteadora, tempo verbal e exemplo clínico.
                </p>
              </div>
              {/* Seletor de Abas IMRD */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0">
                {IMRD_GUIDES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedImrd(item.id)}
                    className={`px-3.5 py-2 rounded-md text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedImrd === item.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.letter} · {item.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <div className="text-xs font-mono uppercase text-emerald-800 font-semibold">
                    Seção Selecionada · {activeImrd.idealProportion}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mt-1 font-serif-cert">
                    {activeImrd.name}
                  </h4>
                  <p className="text-sm font-medium text-blue-950 mt-1">
                    Pergunta Norteadora: “{activeImrd.coreQuestion}”
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Elementos Obrigatórios na Redação Médica:
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {activeImrd.essentialElements.map((el, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="font-mono text-xs font-bold text-emerald-800 mt-0.5">0{i + 1}.</span>
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-slate-50 border border-slate-200 rounded-xl p-5">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-slate-600 pb-2 border-b border-slate-200">
                    <strong>TEMPO VERBAL RECOMENDADO:</strong> {activeImrd.recommendedTense}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Trecho Modelo de Artigo Biomédico:
                    </div>
                    <blockquote className="mt-2 p-3.5 bg-white border border-slate-200 rounded-lg font-serif-cert italic text-xs text-slate-800 leading-relaxed">
                      {activeImrd.clinicalSnippet}
                    </blockquote>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Erros Críticos Evitados na Revisão por Pares:
                  </div>
                  <ul className="mt-1.5 space-y-1 text-xs text-slate-600">
                    {activeImrd.commonPitfalls.map((pitfall, idx) => (
                      <li key={idx}>• {pitfall}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Parte B: Conversor Comparativo Vancouver (ICMJE) vs ABNT */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-blue-900" />
                  Simulador Comparativo de Normalização: Estilo Vancouver (ICMJE) vs. ABNT
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Compare a chamada no texto, a entrada completa na lista de referências e os descritores DeCS/MeSH por tipo de documento.
                </p>
              </div>

              {/* Alternador Vancouver / ABNT */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0">
                <button
                  type="button"
                  onClick={() => setCitationNorm('vancouver')}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    citationNorm === 'vancouver'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Estilo Vancouver (ICMJE / PubMed)
                </button>
                <button
                  type="button"
                  onClick={() => setCitationNorm('abnt')}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    citationNorm === 'abnt'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Norma ABNT (NBR 6023 / 10520)
                </button>
              </div>
            </div>

            {/* Seleção do Tipo de Fonte Científica */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CITATION_EXAMPLES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedCitationId(item.id)}
                  className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedCitationId === item.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold leading-snug">{item.category}</div>
                  <div
                    className={`text-[11px] mt-1 line-clamp-2 ${
                      selectedCitationId === item.id ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {item.sourceTitle}
                  </div>
                </button>
              ))}
            </div>

            {/* Painel de Saída Formatada */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-mono uppercase text-slate-500">
                      1. CHAMADA DE CITAÇÃO NO CORPO DO TEXTO ({citationNorm === 'vancouver' ? 'SISTEMA NUMÉRICO SEQUENCIAL' : 'SISTEMA AUTOR-DATA'})
                    </div>
                    <div className="mt-1.5 p-3.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 font-serif-cert">
                      {citationNorm === 'vancouver' ? activeCitation.inTextVancouver : activeCitation.inTextAbnt}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-slate-500">
                        2. ENTRADA COMPLETA NA LISTA DE REFERÊNCIAS ({citationNorm === 'vancouver' ? 'PADRÃO NLM / ICMJE' : 'ABNT NBR 6023'})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyReference(
                            citationNorm === 'vancouver'
                              ? activeCitation.referenceVancouver
                              : activeCitation.referenceAbnt
                          )
                        }
                        className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedCitation ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copiar Referência
                          </>
                        )}
                      </button>
                    </div>
                    <div className="mt-1.5 p-4 bg-slate-900 text-amber-100 rounded-lg font-mono text-xs leading-relaxed">
                      {citationNorm === 'vancouver' ? activeCitation.referenceVancouver : activeCitation.referenceAbnt}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 pt-2 border-t border-slate-200">
                  <strong>Aplicação no Manuscrito:</strong> {activeCitation.imrdPlacement}
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-200">
                    Indexação Descritiva (DeCS / MeSH)
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Termos oficiais em inglês (Medical Subject Headings) e português (Descritores em Ciências da Saúde) vinculados a esta referência:
                  </p>
                  <div className="mt-3 space-y-2">
                    {activeCitation.meshDecsDescriptors.map((desc, i) => (
                      <div
                        key={i}
                        className="p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-xs text-slate-800"
                      >
                        {desc}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  Padrão exigido em submissões SciELO, PubMed/MEDLINE, LILACS e Scopus.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SEÇÃO 3: ACERVO DIGITAL DE APOSTILAS E GUIAS METODOLÓGICOS DA EDITORA
         ===================================================================== */}
      <section id="acervo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-800">
            03. Repositório Didático e Editorial · Leitura Dirigida
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 font-serif-cert">
            Acervo de Apostilas Digitais, Guias Metodológicos e Checklists de Submissão
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Consulte os materiais didáticos estruturados pelo Conselho Editorial da <strong>Editora Mente e Saúde</strong> e
            pelo <strong>Centro Profissionalizante Maria Dalva de Araújo</strong> utilizados ao longo das 36 horas de formação.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Lista de Apostilas */}
          <div className="lg:col-span-5 space-y-3">
            {DIDACTIC_MATERIALS.map((mat) => (
              <button
                key={mat.id}
                type="button"
                onClick={() => setSelectedMaterialId(mat.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedMaterialId === mat.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className={selectedMaterialId === mat.id ? 'text-amber-300' : 'text-emerald-800'}>
                    {mat.code} · {mat.type}
                  </span>
                  <span className={selectedMaterialId === mat.id ? 'text-slate-300' : 'text-slate-500'}>
                    {mat.pages}
                  </span>
                </div>
                <div className="mt-1.5 font-bold text-sm leading-snug">{mat.title}</div>
              </button>
            ))}
          </div>

          {/* Visualizador de Conteúdo da Apostila Selecionada */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <div className="text-xs font-mono text-emerald-800 font-semibold">
                {activeMaterial.code} · {activeMaterial.axis} · {activeMaterial.pages}
              </div>
              <h3 className="mt-1 text-xl font-bold text-slate-900 font-serif-cert">
                {activeMaterial.title}
              </h3>
              <div className="mt-1 text-xs text-slate-500">
                Autoria / Curadoria: {activeMaterial.authors}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Ementa Analítica do Volume:
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{activeMaterial.summary}</p>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                Tópicos-Chave Abordados:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeMaterial.keyTopics.map((topic, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 flex items-center gap-2"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Excerto Oficial do Material Didático
              </div>
              <p className="text-xs font-serif-cert italic text-slate-800 leading-relaxed">
                “{activeMaterial.excerpt}”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SEÇÃO 4: SIMULADO INTERATIVO DE PROFICIÊNCIA METODOLÓGICA (NOTA 9,6)
         ===================================================================== */}
      <section id="avaliacao" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-800">
                04. Avaliação Somativa Online · Eixo IV (Exame de Certificação)
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 font-serif-cert">
                Caderno de Avaliação de Proficiência Metodológica (Gabarito Comentado)
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Abaixo encontram-se 5 questões representativas do Exame Final de Certificação cumprido pelo titular{' '}
                <strong>{CERTIFICATE_01_DATA.holderName}</strong>, no qual obteve <strong>Aproveitamento de 96% (Nota 9,6 — Aprovado)</strong>.
                Você pode interagir com as alternativas para revisar o gabarito comentado.
              </p>
            </div>

            <div className="bg-slate-900 text-white p-5 rounded-xl shrink-0 flex items-center gap-4">
              <Award className="w-10 h-10 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-mono uppercase text-slate-400">Desempenho Registrado em Ata</div>
                <div className="text-xl font-bold text-white">Nota Final: 9,6 / 10,0</div>
                <div className="text-xs text-emerald-400 font-mono mt-0.5">
                  Simulador atual: {correctCount} / {PROFICIENCY_QUIZ.length} questões corretas
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {PROFICIENCY_QUIZ.map((q, qIdx) => {
              const selectedOption = quizAnswers[q.id];
              const isCorrect = selectedOption === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>QUESTÃO 0{qIdx + 1} · {q.axis.toUpperCase()}</span>
                    <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                      {isCorrect ? '✓ RESPOSTA CORRETA' : '• SELECIONE A ALTERNATIVA CORRETA'}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h3>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOption === optIdx;
                      const isRightOption = q.correctIndex === optIdx;

                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300';
                      if (showQuizFeedback) {
                        if (isRightOption) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                        } else if (isSelected && !isRightOption) {
                          btnStyle = 'bg-red-50 border-red-400 text-red-900';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-slate-900 border-slate-900 text-white';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() =>
                            setQuizAnswers((prev) => ({
                              ...prev,
                              [q.id]: optIdx,
                            }))
                          }
                          className={`w-full p-3.5 rounded-lg border text-left text-xs sm:text-sm transition-colors flex items-start gap-3 cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-mono font-bold shrink-0 mt-0.5">
                            {String.fromCharCode(65 + optIdx)})
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showQuizFeedback && (
                    <div className="p-3.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
                      <strong className="text-emerald-800">Fundamentação Metodológica: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowQuizFeedback((prev) => !prev)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer"
            >
              {showQuizFeedback ? 'Ocultar fundamentações comentadas' : 'Mostrar fundamentações comentadas'}
            </button>
            <button
              type="button"
              onClick={() =>
                setQuizAnswers({
                  1: 0,
                  2: 1,
                  3: 1,
                  4: 1,
                  5: 1,
                })
              }
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Restaurar Gabarito Oficial (100%)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
