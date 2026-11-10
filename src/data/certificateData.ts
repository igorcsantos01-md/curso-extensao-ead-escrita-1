export interface CertificateAxis {
  axisNumber: string;
  title: string;
  subtitle: string;
  description: string;
  hours: string;
}

export interface CertificateRecord {
  id: string;
  certNumber: string;
  bookNumber: string;
  pageNumber: string;
  code: string;
  controlKey: string;
  sha256: string;
  verificationUrl: string;
  verificationDomain: string;
  holderName: string;
  holderQualification: string;
  holderCpf: string;
  holderInstitution: string;
  holderLine: string;
  courseTitle: string;
  modality: string;
  editalFraming: string;
  period: string;
  issueDate: string;
  totalHoursNumeric: number;
  totalHoursText: string;
  finalGrade: string;
  approvalPercentage: string;
  status: string;
  axes: CertificateAxis[];
}

export const CERTIFICATE_01_DATA: CertificateRecord = {
  id: 'cert-item09-01',
  certNumber: '01',
  bookNumber: '01/2023',
  pageNumber: '18',
  code: 'EMS-EXT-2023-0901',
  controlKey: '0901-7027-9457-9A3C',
  sha256: '4a9c8e12b7d03f56a1829e40c6b51d29e8f17a63b4c52d90f1837e2a5b6c0901',
  verificationUrl: 'https://extensao-escrita-cientifica-1.vercel.app/?codigo=EMS-EXT-2023-0901#validador',
  verificationDomain: 'https://extensao-escrita-cientifica-1.vercel.app/',
  holderName: 'LUCAS GONÇALVES SILVEIRA',
  holderQualification: 'Médico',
  holderCpf: '702.794.941-57',
  holderInstitution: 'Centro Universitário Alfredo Nasser (UNIFAN)',
  holderLine: 'Médico | CPF: 702.794.941-57 | Centro Universitário Alfredo Nasser (UNIFAN)',
  courseTitle: 'Curso de Extensão EAD em Escrita Científica, Normas Editoriais (Vancouver/ABNT) e Publicação de Artigos Biomédicos',
  modality: 'Curso de Extensão',
  editalFraming: 'Item 09 - Atividades Extracurriculares: Cursos de extensão, estágios em instituições de ensino, cursos de língua e de computação, aprovação em concursos, congressos médicos (Pelo menos 30 horas por certificado)',
  period: '10 de abril a 05 de maio de 2023',
  issueDate: 'Goiânia - GO, 12 de maio de 2023.',
  totalHoursNumeric: 36,
  totalHoursText: '36 (trinta e seis) horas',
  finalGrade: '9,6',
  approvalPercentage: '100%',
  status: 'APROVADO',
  axes: [
    {
      axisNumber: 'Eixo I',
      title: 'Eixo I — Delineamento de Pesquisa e Arquitetura IMRD',
      subtitle: 'Redação Científica Biomédica e Estruturação de Manuscritos',
      description: 'Formulação da pergunta de pesquisa clínica, construção da Introdução fundamentada, descrição reprodutível de Materiais e Métodos, apresentação de Resultados em tabelas/figuras e estruturação crítica da Discussão.',
      hours: '10h 00min',
    },
    {
      axisNumber: 'Eixo II',
      title: 'Eixo II — Normalização Documental Internacional (Vancouver e ABNT)',
      subtitle: 'Diretrizes do ICMJE, Citações Diretas/Indiretas e Indexação Descritiva',
      description: 'Padronização de referências bibliográficas segundo o International Committee of Medical Journal Editors (Estilo Vancouver) e normas ABNT (NBR 6023/10520), com uso de descritores DeCS/MeSH.',
      hours: '08h 00min',
    },
    {
      axisNumber: 'Eixo III',
      title: 'Eixo III — Ética Editorial, Integridade Científica e Fluxo Peer Review',
      subtitle: 'Boas Práticas em Publicação Médica, COPE e Periódicos com Corpo Editorial',
      description: 'Diretrizes éticas em pesquisa biomédica, prevenção ao plágio e autoplágio, escolha de periódicos científicos com ISSN e corpo editorial, carta de apresentação (cover letter) e resposta aos revisores.',
      hours: '10h 00min',
    },
    {
      axisNumber: 'Eixo IV',
      title: 'Eixo IV — Estudo Dirigido em Literatura Metodológica e Avaliação Final',
      subtitle: 'Prática de Revisão Crítica de Artigos e Exame de Certificação',
      description: 'Leitura dirigida do guia metodológico da Editora Mente e Saúde, análise estrutural de artigos médicos publicados e aprovação na avaliação somativa online com aproveitamento de 96% (Nota 9,6).',
      hours: '08h 00min',
    },
  ],
};

export interface CitationExample {
  id: string;
  category: string;
  sourceTitle: string;
  clinicalContext: string;
  inTextVancouver: string;
  referenceVancouver: string;
  inTextAbnt: string;
  referenceAbnt: string;
  meshDecsDescriptors: string[];
  imrdPlacement: string;
}

export const CITATION_EXAMPLES: CitationExample[] = [
  {
    id: 'artigo-original',
    category: 'Artigo Original Indexado (PubMed/MEDLINE)',
    sourceTitle: 'Ensaio Clínico Randomizado sobre Pressão Intraocular e Neuroproteção no Glaucoma Primário de Ângulo Aberto',
    clinicalContext: 'Citação de evidência primária no texto da Introdução e comparação de desfechos na Discussão.',
    inTextVancouver: 'Estudos multicêntricos demonstram redução significativa da progressão campimétrica com controle estrito da pressão intraocular (1).',
    referenceVancouver: '1. Weinreb RN, Aung T, Medeiros FA. The pathophysiology and treatment of glaucoma: a review. JAMA. 2014 May 14;311(18):1901-11. doi: 10.1001/jama.2014.3192.',
    inTextAbnt: 'Estudos multicêntricos demonstram redução significativa da progressão campimétrica com controle estrito da pressão intraocular (WEINREB; AUNG; MEDEIROS, 2014).',
    referenceAbnt: 'WEINREB, R. N.; AUNG, T.; MEDEIROS, F. A. The pathophysiology and treatment of glaucoma: a review. JAMA, Chicago, v. 311, n. 18, p. 1901-1911, maio 2014.',
    meshDecsDescriptors: ['Glaucoma, Open-Angle (Glaucoma de Ângulo Aberto)', 'Intraocular Pressure (Pressão Intraocular)', 'Randomized Controlled Trial (Ensaio Clínico Controlado Aleatório)'],
    imrdPlacement: 'Introdução (lacuna do conhecimento) e Discussão (confronto com a literatura internacional).',
  },
  {
    id: 'revisao-prisma',
    category: 'Revisão Sistemática e Meta-Análise (PRISMA)',
    sourceTitle: 'Diretrizes de Relato PRISMA 2020 para Revisões Sistemáticas em Ciências Biomédicas',
    clinicalContext: 'Fundamentação metodológica na seção de Materiais e Métodos de revisões sistemáticas.',
    inTextVancouver: 'O protocolo de busca e triagem seguiu rigorosamente a declaração PRISMA 2020 (2).',
    referenceVancouver: '2. Page MJ, McKenzie JE, Bossuyt PM, Boutron I, Hoffmann TC, Mulrow CD, et al. The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ. 2021 Mar 29;372:n71.',
    inTextAbnt: 'O protocolo de busca e triagem seguiu rigorosamente a declaração PRISMA 2020 (PAGE et al., 2021).',
    referenceAbnt: 'PAGE, M. J. et al. The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ, London, v. 372, p. n71, mar. 2021.',
    meshDecsDescriptors: ['Systematic Review (Revisão Sistemática)', 'Meta-Analysis as Topic (Metanálise como Assunto)', 'Practice Guidelines as Topic (Guias de Prática Clínica como Assunto)'],
    imrdPlacement: 'Materiais e Métodos (Delineamento do Estudo e Estratégia de Síntese).',
  },
  {
    id: 'diretriz-icmje',
    category: 'Diretriz Editorial Internacional (ICMJE / COPE)',
    sourceTitle: 'Recomendações para Elaboração, Redação, Edição e Publicação de Trabalhos Acadêmicos em Periódicos Médicos',
    clinicalContext: 'Declaração de critérios de autoria, conflito de interesses e ética em pesquisa na submissão.',
    inTextVancouver: 'Todos os autores atendem integralmente aos quatro critérios de autoria estabelecidos pelo ICMJE (3).',
    referenceVancouver: '3. International Committee of Medical Journal Editors. Recommendations for the Conduct, Reporting, Editing, and Publication of Scholarly Work in Medical Journals [Internet]. ICMJE; 2023 [cited 2023 May 02]. Available from: https://www.icmje.org',
    inTextAbnt: 'Todos os autores atendem integralmente aos quatro critérios de autoria estabelecidos pelo International Committee of Medical Journal Editors (2023).',
    referenceAbnt: 'INTERNATIONAL COMMITTEE OF MEDICAL JOURNAL EDITORS. Recommendations for the Conduct, Reporting, Editing, and Publication of Scholarly Work in Medical Journals. [S. l.]: ICMJE, 2023. Disponível em: https://www.icmje.org. Acesso em: 02 maio 2023.',
    meshDecsDescriptors: ['Publishing (Editoração)', 'Authorship (Autoria)', 'Peer Review, Research (Revisão da Pesquisa por Pares)'],
    imrdPlacement: 'Aspectos Éticos / Declarações Editoriais e Carta de Apresentação (Cover Letter).',
  },
  {
    id: 'capitulo-livro',
    category: 'Obra Científica e Guia Metodológico (Editora Mente e Saúde)',
    sourceTitle: 'Manual de Redação Científica Biomédica, Arquitetura IMRD e Submissão em Periódicos Indexados',
    clinicalContext: 'Embasamento teórico-metodológico sobre estruturação lógica de manuscritos médicos.',
    inTextVancouver: 'A arquitetura IMRD organiza o raciocínio clínico-epidemiológico em quatro movimentos interdependentes (4).',
    referenceVancouver: '4. Santos BL, Santana JA, organizadores. Manual de redação científica biomédica: arquitetura IMRD, normas Vancouver/ABNT e publicação em periódicos indexados. Goiânia: Editora Mente e Saúde; 2023. 184 p.',
    inTextAbnt: 'A arquitetura IMRD organiza o raciocínio clínico-epidemiológico em quatro movimentos interdependentes (SANTOS; SANTANA, 2023).',
    referenceAbnt: 'SANTOS, B. L.; SANTANA, J. A. (org.). Manual de redação científica biomédica: arquitetura IMRD, normas Vancouver/ABNT e publicação em periódicos indexados. Goiânia: Editora Mente e Saúde, 2023. 184 p.',
    meshDecsDescriptors: ['Medical Writing (Redação Médica)', 'Periodicals as Topic (Publicações Periódicas como Assunto)', 'Biomedical Research (Pesquisa Biomédica)'],
    imrdPlacement: 'Estrutura Global do Manuscrito e Normalização Documental.',
  },
];

export interface ImrdSectionGuide {
  id: 'I' | 'M' | 'R' | 'D';
  letter: string;
  name: string;
  coreQuestion: string;
  recommendedTense: string;
  idealProportion: string;
  essentialElements: string[];
  commonPitfalls: string[];
  clinicalSnippet: string;
}

export const IMRD_GUIDES: ImrdSectionGuide[] = [
  {
    id: 'I',
    letter: 'I',
    name: 'Introdução (Introduction)',
    coreQuestion: 'Qual é o problema científico/clínico e por que este estudo foi necessário?',
    recommendedTense: 'Presente do indicativo (fatos consolidados) e Pretérito perfeito (objetivo do estudo)',
    idealProportion: '10% a 15% do manuscrito (3 a 4 parágrafos no funil lógico)',
    essentialElements: [
      '1º Parágrafo: Contexto epidemiológico e relevância clínica do tema em saúde.',
      '2º Parágrafo: Estado atual da arte (o que a literatura já estabeleceu com referências recentes).',
      '3º Parágrafo: Lacuna do conhecimento (gap científico ou controvérsia clínica ainda não resolvida).',
      '4º Parágrafo: Objetivo claro do estudo pareado à pergunta estruturada (PICO/PECO) e hipótese.',
    ],
    commonPitfalls: [
      'Transformar a Introdução em uma revisão histórica extensa.',
      'Antecipar resultados ou conclusões no último parágrafo.',
      'Omitir a justificativa clínica que conecta a lacuna ao objetivo.',
    ],
    clinicalSnippet: '"Embora a tonometria de aplanação permaneça como padrão-ouro no rastreio do glaucoma, persiste divergência quanto à correlação entre a espessura corneana central e a progressão precoce em pacientes normotensos (1,2). Diante dessa lacuna, o presente estudo teve como objetivo avaliar..."',
  },
  {
    id: 'M',
    letter: 'M',
    name: 'Materiais e Métodos (Methods)',
    coreQuestion: 'Como o estudo foi conduzido para garantir validade interna e reprodutibilidade?',
    recommendedTense: 'Pretérito perfeito na voz passiva ou impessoal',
    idealProportion: '25% a 30% do manuscrito (subseções padronizadas)',
    essentialElements: [
      'Desenho do estudo, local, período e diretriz internacional seguida (CONSORT, STROBE, PRISMA, CARE).',
      'População, cálculo amostral, critérios explícitos de inclusão, exclusão e não inclusão.',
      'Protocolo de intervenção/aferição, instrumentos calibrados e variáveis primárias/secundárias.',
      'Análise bioestatística (testes paramétricos/não-paramétricos, nível de significância p < 0,05, IC 95%).',
      'Aprovação em Comitê de Ética em Pesquisa (CEP/CONEP — CAAE), TCLE e Declaração de Helsinque.',
    ],
    commonPitfalls: [
      'Incluir resultados numéricos da amostra (ex.: média de idade final) dentro de Métodos.',
      'Não especificar o software estatístico e o teste de normalidade utilizado (Shapiro-Wilk / Kolmogorov-Smirnov).',
    ],
    clinicalSnippet: '"Trata-se de estudo observacional analítico transversal, reportado conforme a diretriz STROBE. A normalidade das variáveis contínuas foi verificada pelo teste de Shapiro-Wilk, adotando-se intervalo de confiança de 95% (IC 95%) e p < 0,05. O protocolo foi aprovado pelo CEP sob parecer..."',
  },
  {
    id: 'R',
    letter: 'R',
    name: 'Resultados (Results)',
    coreQuestion: 'Quais foram os achados objetivos, métricos e estatísticos encontrados?',
    recommendedTense: 'Pretérito perfeito (relato estritamente factual e objetivo)',
    idealProportion: '25% a 30% do manuscrito (texto conciso + Tabelas e Figuras autoexplicativas)',
    essentialElements: [
      'Fluxograma de recrutamento/seleção e caracterização sociodemográfica/clínica basal (Tabela 1).',
      'Apresentação dos desfechos primários seguidos dos desfechos secundários.',
      'Medidas de efeito (Razão de Chances/OR, Risco Relativo/RR, diferença de médias) acompanhadas de IC 95% e valor-p.',
      'Complementaridade entre texto e ilustrações (não repetir no texto todos os números já presentes na tabela).',
    ],
    commonPitfalls: [
      'Emitir juízo de valor ou explicar o "porquê" dos achados (função exclusiva da Discussão).',
      'Apresentar apenas "p < 0,05" sem informar o valor exato de p e a magnitude do efeito.',
    ],
    clinicalSnippet: '"Foram avaliados 248 prontuários elegíveis. A média de idade foi de 64,2 ± 8,4 anos. Observou-se associação estatisticamente significativa entre o atraso diagnóstico superior a 12 meses e a perda campimétrica severa (OR = 2,84; IC 95%: 1,62–4,98; p = 0,001, Tabela 2)."',
  },
  {
    id: 'D',
    letter: 'D',
    name: 'Discussão e Conclusão (Discussion)',
    coreQuestion: 'O que os achados significam no contexto da medicina baseada em evidências?',
    recommendedTense: 'Presente (conhecimentos estabelecidos) e Pretérito (achados do próprio estudo)',
    idealProportion: '30% a 35% do manuscrito (pirâmide invertida)',
    essentialElements: [
      '1º Parágrafo: Síntese direta do achado principal respondendo ao objetivo da Introdução (sem repetir números exaustivos).',
      'Confronto crítico com estudos prévios convergentes e divergentes, explicando mecanismos fisiopatológicos.',
      'Implicações práticas para a conduta médica, saúde coletiva ou protocolos assistenciais.',
      'Reconhecimento transparente das limitações metodológicas e forças do estudo.',
      'Conclusão restrita e diretamente suportada pelos dados obtidos.',
    ],
    commonPitfalls: [
      'Repetir literalmente a Introdução ou os parágrafos de Resultados.',
      'Extrapolar as conclusões além da capacidade do delineamento (ex.: inferir causalidade em estudo transversal).',
    ],
    clinicalSnippet: '"Os achados deste estudo demonstram que a triagem estruturada reduz o tempo até a intervenção especializada. Em consonância com coortes internacionais (4,7), tal efeito decorre da identificação precoce de alterações subclínicas..."',
  },
];

export interface DidacticMaterial {
  id: string;
  code: string;
  type: string;
  title: string;
  authors: string;
  pages: string;
  axis: string;
  summary: string;
  keyTopics: string[];
  excerpt: string;
}

export const DIDACTIC_MATERIALS: DidacticMaterial[] = [
  {
    id: 'mat-01',
    code: 'EMS-AP-2023-01',
    type: 'Apostila Base (Eixo I)',
    title: 'Arquitetura IMRD e Delineamento de Manuscritos Biomédicos: Da Pergunta PICO à Discussão Crítica',
    authors: 'Conselho Editorial — Editora Mente e Saúde & Centro Profissionalizante Maria Dalva de Araújo',
    pages: '48 páginas',
    axis: 'Eixo I (10h)',
    summary: 'Guia passo a passo para estruturação lógica de artigos originais, relatos de caso (CARE) e revisões sistemáticas (PRISMA), detalhando tempos verbais, proporção textual e transição entre parágrafos.',
    keyTopics: ['Estratégia PICO/PECO', 'Funil da Introdução', 'Reprodutibilidade em Métodos', 'Tabelas Autoexplicativas', 'Pirâmide Invertida na Discussão'],
    excerpt: 'CAPÍTULO 2 — O FUNIL LÓGICO DA INTRODUÇÃO: Toda introdução biomédica de alto impacto deve conduzir o revisor em três movimentos: (1) magnitude clínica do problema; (2) síntese crítica do que já se sabe; e (3) declaração explícita da lacuna que motiva o objetivo do trabalho.',
  },
  {
    id: 'mat-02',
    code: 'EMS-AP-2023-02',
    type: 'Manual Técnico (Eixo II)',
    title: 'Normalização Documental em Saúde: Diretrizes Vancouver (ICMJE), ABNT (NBR 6023/10520) e Indexação DeCS/MeSH',
    authors: 'Bárbara Lima dos Santos (Org.) — Divisão de Extensão Científica',
    pages: '42 páginas',
    axis: 'Eixo II (08h)',
    summary: 'Manual comparativo com mais de 60 exemplos práticos de citações numéricas sequenciais (Vancouver) e sistema autor-data (ABNT), abreviaturas oficiais do NLM Catalog e seleção estratégica de descritores controlados.',
    keyTopics: ['Regras de até 6 autores vs. et al.', 'Abreviatura de periódicos NLM/PubMed', 'Pontuação de volume, fascículo e paginação', 'Tradução tripla de descritores DeCS/MeSH'],
    excerpt: 'SEÇÃO 4 — ESTILO VANCOUVER (ICMJE): No sistema numérico, as referências são numeradas consecutivamente na ordem em que são mencionadas pela primeira vez no texto. Nomes de periódicos devem ser abreviados de acordo com a List of Journals Indexed for MEDLINE sem pontos após as abreviaturas.',
  },
  {
    id: 'mat-03',
    code: 'EMS-AP-2023-03',
    type: 'Guia Editorial (Eixo III)',
    title: 'Integridade Científica, Diretrizes COPE, Prevenção ao Plágio e Estratégias de Resposta ao Peer Review',
    authors: 'Conselho Editorial & Coordenação de Projetos Educativos',
    pages: '52 páginas',
    axis: 'Eixo III (10h)',
    summary: 'Protocolo prático sobre ética em publicação médica, critérios de autoria do ICMJE, declaração de conflitos de interesse, redação de Cover Letter persuasiva e elaboração de carta resposta ponto a ponto aos pareceristas.',
    keyTopics: ['Critérios de Autoria ICMJE (4 pilares)', 'Prevenção de Plágio e Publicação Salame', 'Seleção de Periódicos (ISSN, Scimago, JCR, Qualis)', 'Carta Resposta Ponto a Ponto (Rebuttal Letter)'],
    excerpt: 'CAPÍTULO 5 — COMO RESPONDER AOS REVISORES (PEER REVIEW): Responda de maneira diplomática, exaustiva e estruturada. Copie cada comentário do revisor na íntegra, apresente a resposta fundamentada na literatura e indique exatamente a página, linha e trecho modificado no manuscrito revisado.',
  },
  {
    id: 'mat-04',
    code: 'EMS-AP-2023-04',
    type: 'Caderno de Prática (Eixo IV)',
    title: 'Estudo Dirigido em Literatura Metodológica: Checklist de Auditoria Pré-Submissão e Exame de Certificação',
    authors: 'Bárbara Lima dos Santos & James Araújo de Santana',
    pages: '36 páginas',
    axis: 'Eixo IV (08h)',
    summary: 'Instrumento de auditoria em 40 itens para revisão crítica de artigos antes da submissão a periódicos indexados (SciELO, PubMed, Scopus), acompanhado do caderno comentando a avaliação somativa final.',
    keyTopics: ['Auditoria de Resumo Estruturado (250 palavras)', 'Verificação cruzada de citações e referências', 'Adequação às diretrizes EQUATOR Network', 'Gabarito Comentado do Exame Final'],
    excerpt: 'CHECKLIST PRÉ-SUBMISSÃO — ITEM 14: Verifique se todos os valores-p estão acompanhados das respectivas medidas de magnitude de efeito e intervalos de confiança de 95%, evitando afirmações dicotômicas desprovidas de relevância clínica.',
  },
];

export interface QuizQuestion {
  id: number;
  axis: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const PROFICIENCY_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    axis: 'Eixo I — Arquitetura IMRD',
    question: 'Na estrutura clássica IMRD de um artigo original biomédico, em qual seção deve ser apresentada a justificativa baseada na lacuna do conhecimento (gap científico) e em qual seção devem ser discutidas as limitações metodológicas do estudo, respectivamente?',
    options: [
      'Na Introdução (antes do objetivo) e na Discussão (antes da conclusão final).',
      'No Resumo e na seção de Materiais e Métodos.',
      'Na Discussão e na seção de Resultados.',
      'Em Materiais e Métodos e na Introdução.',
    ],
    correctIndex: 0,
    explanation: 'Correto! A lacuna do conhecimento encerra o funil lógico da Introdução para justificar o objetivo do estudo, enquanto as limitações metodológicas são analisadas com transparência na Discussão.',
  },
  {
    id: 2,
    axis: 'Eixo II — Estilo Vancouver (ICMJE)',
    question: 'Segundo as diretrizes do International Committee of Medical Journal Editors (Estilo Vancouver), como deve ser formatada na lista de referências uma publicação científica que possui 8 (oito) autores?',
    options: [
      'Listar apenas o primeiro autor em caixa alta seguido da expressão et al.',
      'Listar os 6 (seis) primeiros autores na ordem em que aparecem na publicação, seguidos de vírgula e da expressão "et al.".',
      'Listar todos os 8 autores separados por ponto e vírgula, com o ano entre parênteses logo após os nomes.',
      'Listar os 3 primeiros autores seguidos de "e colaboradores" e o título em itálico.',
    ],
    correctIndex: 1,
    explanation: 'Correto! No padrão Vancouver (ICMJE), listam-se até 6 autores; quando há mais de 6 autores, listam-se os 6 primeiros seguidos de ", et al.".',
  },
  {
    id: 3,
    axis: 'Eixo II — Indexação DeCS/MeSH',
    question: 'Qual é a finalidade primordial da utilização de termos extraídos dos vocabulários controlados DeCS (BIREME/OPAS) e MeSH (National Library of Medicine) abaixo do resumo de um artigo médico?',
    options: [
      'Substituir a lista de referências bibliográficas ao final do manuscrito.',
      'Padronizar a indexação temática para garantir a recuperação precisa do artigo em bases como PubMed/MEDLINE, LILACS e SciELO, independentemente de sinônimos regionais.',
      'Aumentar artificialmente a contagem de palavras do resumo estruturado.',
      'Atender exclusivamente à formatação estética de notas de rodapé.',
    ],
    correctIndex: 1,
    explanation: 'Correto! O uso de descritores controlados DeCS/MeSH padroniza a indexação científica internacional e viabiliza que revisões sistemáticas e pesquisadores localizem o estudo nas bases indexadas.',
  },
  {
    id: 4,
    axis: 'Eixo III — Ética Editorial e ICMJE',
    question: 'De acordo com o ICMJE e o Committee on Publication Ethics (COPE), para que um profissional seja legitimamente listado como AUTOR de um manuscrito biomédico, ele deve cumprir:',
    options: [
      'Apenas a captação de recursos financeiros ou a chefia administrativa do departamento médico.',
      'Cumulativamente os 4 critérios do ICMJE: contribuição substancial na concepção/dados, redação ou revisão crítica intelectual, aprovação da versão final e responsabilidade pública pela integridade do trabalho.',
      'Apenas a coleta de dados em prontuários, mesmo sem participar da redação ou aprovar a versão final.',
      'Exclusivamente a revisão ortográfica e gramatical do texto.',
    ],
    correctIndex: 1,
    explanation: 'Correto! O ICMJE estabelece que a autoria exige o cumprimento simultâneo dos 4 critérios; contribuições isoladas (como supervisão departamental ou auxílio técnico) devem constar em Agradecimentos.',
  },
  {
    id: 5,
    axis: 'Eixo IV — Revisão por Pares (Peer Review)',
    question: 'Ao receber um parecer de "Revisão Maior" (Major Revision) dos editores de um periódico indexado, qual é a conduta técnica recomendada para a submissão da versão corrigida?',
    options: [
      'Submeter o mesmo arquivo para outro periódico sem responder aos pareceristas.',
      'Elaborar uma Carta Resposta (Response to Reviewers) respondendo de forma respeitosa e fundamentada a cada comentário ponto a ponto, indicando a localização exata das alterações realizadas no manuscrito com destaque visual.',
      'Alterar apenas os itens com os quais os autores concordam, omitindo os demais questionamentos.',
      'Reescrever apenas o título do trabalho sem modificar o corpo do artigo.',
    ],
    correctIndex: 1,
    explanation: 'Correto! A carta resposta estruturada ponto a ponto (Rebuttal Letter), acompanhada da versão com alterações destacadas, é o padrão ouro no fluxo de revisão por pares.',
  },
];
