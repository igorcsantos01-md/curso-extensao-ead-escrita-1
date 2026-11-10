import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { CertificateRecord } from '../data/certificateData';

async function loadImageAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Generates an accessible, vector-text, searchable & selectable 2-page A4 Landscape PDF
 * matching the exact structure, triple borders, fonts, seals, signatures, and clickable links
 * of the reference certificates (EMS-CDP-2023-0892 / Item 09 Standard).
 */
export async function buildCertificateVectorPdf(data: CertificateRecord): Promise<jsPDF> {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // Load real institutional logos, signatures, and generate crisp QR Code
  const [logoEditora, logoCentro, sigBarbara, sigJames, qrDataUrl] = await Promise.all([
    loadImageAsDataUrl('/assets/cert/logo_editora.png'),
    loadImageAsDataUrl('/assets/cert/logo_centro.png'),
    loadImageAsDataUrl('/assets/cert/sig_barbara.png'),
    loadImageAsDataUrl('/assets/cert/sig_james.png'),
    QRCode.toDataURL(data.verificationUrl, {
      width: 480,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#000000', light: '#FFFFFF' },
    }),
  ]);

  const drawTripleInstitutionalFrame = () => {
    // Subtle warm ivory paper background
    doc.setFillColor(255, 253, 250);
    doc.rect(0, 0, 297, 210, 'F');

    // 1. Outer Dark Green Border (#054F3B)
    doc.setDrawColor(5, 79, 59);
    doc.setLineWidth(0.8);
    doc.rect(5.0, 5.0, 287.0, 200.0, 'S');

    // 2. Middle Gold Border (#D97706)
    doc.setDrawColor(217, 119, 6);
    doc.setLineWidth(0.35);
    doc.rect(6.8, 6.8, 283.4, 196.4, 'S');

    // 3. Inner Deep Blue Border (#0A1D56)
    doc.setDrawColor(10, 29, 86);
    doc.setLineWidth(0.5);
    doc.rect(8.2, 8.2, 280.6, 193.6, 'S');
  };

  // =========================================================================
  // LAUDA 1 — FRENTE DO CERTIFICADO (297mm x 210mm)
  // =========================================================================
  drawTripleInstitutionalFrame();

  // Left Logo & Header Text (Editora Mente e Saúde)
  doc.addImage(logoEditora, 'PNG', 14.0, 12.0, 20.0, 20.0);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 78, 59);
  doc.text('EDITORA MENTE E SAÚDE', 37.0, 18.0);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CNPJ: 51.372.335/0001-71', 37.0, 22.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.0);
  doc.setTextColor(13, 148, 136);
  doc.text('Conselho Editorial e Extensão Científica', 37.0, 26.5);

  // Center Header Text (Programa Interinstitucional)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 78, 59);
  doc.text(
    'PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA',
    148.5,
    17.0,
    { align: 'center' }
  );
  doc.text('E EDUCAÇÃO EM SAÚDE', 148.5, 21.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(10, 29, 86);
  doc.text(
    `Certificado Nº ${data.certNumber} · Livro de Extensão nº ${data.bookNumber} · Cód. ${data.code}`,
    148.5,
    26.2,
    { align: 'center' }
  );

  // Right Logo & Header Text (Centro Profissionalizante Maria Dalva de Araújo)
  doc.addImage(logoCentro, 'PNG', 263.0, 12.0, 20.0, 20.0);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(10, 29, 86);
  doc.text('CENTRO PROFISSIONALIZANTE', 260.0, 17.5, { align: 'right' });
  doc.text('MARIA DALVA DE ARAÚJO', 260.0, 21.8, { align: 'right' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CNPJ: 51.269.112/0001-83', 260.0, 26.2, { align: 'right' });

  // Header Divider Line
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.25);
  doc.line(14.0, 35.0, 283.0, 35.0);

  // Main Certificate Title
  doc.setFont('times', 'bold');
  doc.setFontSize(23.5);
  doc.setTextColor(6, 78, 59);
  doc.text('CERTIFICADO DE CURSO DE EXTENSÃO', 148.5, 47.0, { align: 'center' });

  // Gold Accent Underline beneath Title
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.5);
  doc.line(95.0, 50.0, 202.0, 50.0);

  // Institutional Opening Paragraph
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.2);
  doc.setTextColor(15, 23, 42);
  const openingLines = [
    'A Editora Mente e Saúde (CNPJ: 51.372.335/0001-71), em parceria institucional com o Centro Profissionalizante Maria Dalva de Araújo (CNPJ:',
    '51.269.112/0001-83), certifica para os devidos fins de comprovação curricular, acadêmica e de títulos (Lei nº 9.394/96) que',
  ];
  doc.text(openingLines[0], 148.5, 58.2, { align: 'center' });
  doc.text(openingLines[1], 148.5, 62.6, { align: 'center' });

  // Holder Identification Box (UNIFAN Standard)
  doc.setFillColor(237, 252, 245);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.3);
  doc.rect(24.0, 67.0, 249.0, 21.0, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(22.5);
  doc.setTextColor(10, 29, 86);
  doc.text(data.holderName.toUpperCase(), 148.5, 76.8, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.0);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `${data.holderQualification}  |  CPF: ${data.holderCpf}  |  ${data.holderInstitution}`,
    148.5,
    84.0,
    { align: 'center' }
  );

  // Body Paragraph 1 (Objective Data & Edital Item 09 Triggers)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.0);
  doc.setTextColor(15, 23, 42);
  const para1Text = `concluiu com APROVAÇÃO e aproveitamento integral a Atividade Extracurricular intitulada "${data.courseTitle}", desenvolvida na modalidade de ${data.modality}, realizada no período de ${data.period}, contabilizando carga horária total de ${data.totalHoursText}.`;
  const para1Lines = doc.splitTextToSize(para1Text, 248.0);
  doc.text(para1Lines, 24.5, 96.2);

  // Body Paragraph 2 (Technical-Pedagogical Scope)
  const para2Text = `No âmbito desta formação complementar em ambiente virtual de aprendizagem, o profissional cumpriu integralmente os módulos teóricos e práticos de estruturação lógica de manuscritos biomédicos no padrão IMRD (Introdução, Métodos, Resultados e Discussão), normalização internacional de referências pelo Estilo Vancouver (ICMJE) e ABNT, ética em pesquisa científica, prevenção ao plágio, estratégias de submissão em periódicos indexados com revisão por pares (peer review) e avaliação final de proficiência metodológica, obtendo nota final ${data.finalGrade} (${data.status}).`;
  const para2Lines = doc.splitTextToSize(para2Text, 248.0);
  doc.text(para2Lines, 24.5, 113.5);

  // Location & Issue Date
  doc.setFont('times', 'italic');
  doc.setFontSize(13.0);
  doc.setTextColor(15, 23, 42);
  doc.text(data.issueDate, 148.5, 137.0, { align: 'center' });

  // Footer Left: Signature Bárbara Lima dos Santos
  doc.addImage(sigBarbara, 'PNG', 22.0, 149.0, 64.0, 18.0);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(15.0, 168.5, 93.0, 168.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(6, 78, 59);
  doc.text('BÁRBARA LIMA DOS SANTOS', 54.0, 173.0, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('Editora-Chefe e Coordenadora de Extensão Editorial', 54.0, 176.8, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.3);
  doc.setTextColor(6, 78, 59);
  doc.text('Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)', 54.0, 180.5, { align: 'center' });

  // Footer Center: Circular Official Seal (Fé Pública)
  doc.setFillColor(255, 243, 199);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.6);
  doc.circle(109.0, 165.0, 11.5, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 53, 15);
  doc.text('SELO OFICIAL', 109.0, 161.2, { align: 'center' });

  doc.setFontSize(8.0);
  doc.text('FÉ PÚBLICA', 109.0, 165.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(5.4);
  doc.text(data.code, 109.0, 169.5, { align: 'center' });

  // Footer Center: QR Code Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.25);
  doc.rect(123.5, 151.5, 25.0, 25.0, 'FD');
  doc.addImage(qrDataUrl, 'PNG', 124.5, 152.5, 23.0, 23.0);
  doc.link(123.5, 151.5, 25.0, 25.0, { url: data.verificationUrl });

  // Footer Center: Manual Authentication Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.25);
  doc.rect(150.5, 151.5, 50.5, 25.0, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.0);
  doc.setTextColor(6, 78, 59);
  doc.text('AUTENTICAÇÃO PÚBLICA MANUAL', 152.5, 155.5);

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(15, 23, 42);
  doc.text(`Cód.: ${data.code}`, 152.5, 159.8);

  doc.setTextColor(146, 64, 14);
  doc.text(`Chave: ${data.controlKey}`, 152.5, 163.8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(10, 29, 86);
  doc.text('Endereço p/ Verificação Online:', 152.5, 167.8);

  doc.setFont('courier', 'normal');
  doc.setFontSize(5.0);
  doc.setTextColor(15, 23, 42);
  doc.text(data.verificationDomain, 152.5, 171.5);
  doc.link(150.5, 151.5, 50.5, 25.0, { url: data.verificationUrl });

  // Footer Right: Signature James Araújo de Santana
  doc.addImage(sigJames, 'PNG', 210.0, 149.0, 64.0, 18.0);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(203.0, 168.5, 282.0, 168.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(10, 29, 86);
  doc.text('JAMES ARAÚJO DE SANTANA', 242.5, 173.0, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('Coordenador de Extensão e Projetos Educativos', 242.5, 176.8, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.0);
  doc.setTextColor(10, 29, 86);
  doc.text('Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)', 242.5, 180.5, {
    align: 'center',
  });

  // Bottom Security Line
  doc.setFont('courier', 'bold');
  doc.setFontSize(6.3);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Verifique via QR Code ou acesse ${data.verificationDomain} informando o Código ${data.code} ou Chave ${data.controlKey}`,
    148.5,
    191.5,
    { align: 'center' }
  );

  // =========================================================================
  // LAUDA 2 — VERSO OFICIAL: MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO
  // =========================================================================
  doc.addPage('a4', 'landscape');
  drawTripleInstitutionalFrame();

  // Header Logos & Title on Page 2
  doc.addImage(logoEditora, 'PNG', 14.0, 12.0, 13.0, 13.0);
  doc.addImage(logoCentro, 'PNG', 29.0, 12.0, 13.0, 13.0);

  doc.setFont('times', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(6, 78, 59);
  doc.text(
    'MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE EXTRACURRICULAR',
    46.0,
    17.5
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `Verso Oficial do Certificado Nº ${data.certNumber} · Fé Pública Interinstitucional e Validação Curricular`,
    46.0,
    22.5
  );

  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.5);
  doc.line(14.0, 28.0, 283.0, 28.0);

  // Box 1: Dados de Identificação do Profissional
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.25);
  doc.rect(14.0, 31.0, 155.0, 31.0, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text('1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL', 18.0, 36.2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(15, 23, 42);
  doc.text(`Titular Certificado: ${data.holderName}`, 18.0, 42.2);
  doc.text(`CPF Registrado: ${data.holderCpf}`, 18.0, 47.4);
  doc.text(`Qualificação Profissional: ${data.holderQualification}`, 18.0, 52.6);
  doc.text(`Instituição de Origem: ${data.holderInstitution}`, 18.0, 57.8);

  // Box 2: Enquadramento Curricular e Pontuação
  doc.setFillColor(240, 245, 255);
  doc.setDrawColor(10, 29, 86);
  doc.setLineWidth(0.25);
  doc.rect(173.0, 31.0, 110.0, 31.0, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(10, 29, 86);
  doc.text('2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO', 177.0, 36.2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(15, 23, 42);
  const framingLines = doc.splitTextToSize(data.editalFraming, 102.0);
  doc.text(framingLines, 177.0, 42.2);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Período: ${data.period} | Total: ${data.totalHoursNumeric}h (${data.status} - Nota ${data.finalGrade})`,
    177.0,
    58.0
  );

  // Box 3: Matriz Programática e Metodologia (36 Horas)
  doc.setFillColor(237, 252, 245);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.25);
  doc.rect(14.0, 65.0, 269.0, 7.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `3. MATRIZ PROGRAMÁTICA E METODOLOGIA PEDAGÓGICA (${data.totalHoursNumeric} HORAS)`,
    18.0,
    70.2
  );

  let rowY = 72.5;
  const rowH = 14.0;

  data.axes.forEach((axis) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(204, 214, 224);
    doc.setLineWidth(0.25);
    doc.rect(14.0, rowY, 269.0, rowH, 'FD');

    // Vertical column dividers
    doc.setDrawColor(227, 232, 240);
    doc.line(93.0, rowY, 93.0, rowY + rowH);
    doc.line(258.0, rowY, 258.0, rowY + rowH);

    // Axis Title & Subtitle
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.3);
    doc.setTextColor(10, 29, 86);
    const titleLines = doc.splitTextToSize(axis.title, 73.0);
    doc.text(titleLines, 17.0, rowY + 4.3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(71, 85, 105);
    const subLines = doc.splitTextToSize(axis.subtitle, 73.0);
    doc.text(subLines, 17.0, rowY + 10.8);

    // Axis Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.4);
    doc.setTextColor(15, 23, 42);
    const descLines = doc.splitTextToSize(axis.description, 159.0);
    doc.text(descLines, 96.0, rowY + 4.8);

    // Axis Hours
    doc.setFont('courier', 'bold');
    doc.setFontSize(8.0);
    doc.setTextColor(6, 78, 59);
    doc.text(axis.hours, 263.5, rowY + 8.2);

    rowY += rowH;
  });

  // Box 4: Registro Oficial de Fé Pública, Endereço Web e Chaves de Verificação
  doc.setFillColor(255, 250, 235);
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.35);
  doc.rect(14.0, 131.5, 269.0, 31.0, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(146, 64, 14);
  doc.text(
    '4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE AUTENTICIDADE',
    18.0,
    136.8
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(15, 23, 42);
  const regText = `Certificado registrado sob o nº ${data.certNumber} no Livro de Extensão e Cursos nº ${data.bookNumber}, Folha ${data.pageNumber}, expedido pela Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) e Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83).`;
  const regLines = doc.splitTextToSize(regText, 230.0);
  doc.text(regLines, 18.0, 142.0);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `CÓDIGO DE AUTENTICIDADE: ${data.code}   |   CHAVE DE CONTROLE / DÍGITO: ${data.controlKey}`,
    18.0,
    149.8
  );

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.1);
  doc.setTextColor(10, 29, 86);
  doc.text(
    `ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE): ${data.verificationUrl}`,
    18.0,
    154.8
  );
  doc.link(18.0, 151.5, 230.0, 5.0, { url: data.verificationUrl });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.0);
  doc.setTextColor(15, 23, 42);
  doc.text(`HASH SHA-256: ${data.sha256}`, 18.0, 159.8);

  // Page 2 QR Code inside Box 4
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.25);
  doc.rect(253.5, 134.0, 26.0, 26.0, 'FD');
  doc.addImage(qrDataUrl, 'PNG', 254.5, 135.0, 24.0, 24.0);
  doc.link(253.5, 134.0, 26.0, 26.0, { url: data.verificationUrl });

  // Page 2 Compact Signatures & Footer
  doc.addImage(sigBarbara, 'PNG', 26.0, 164.0, 54.0, 15.0);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(18.0, 180.0, 92.0, 180.0);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(6, 78, 59);
  doc.text('BÁRBARA LIMA DOS SANTOS', 55.0, 184.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.text('Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)', 55.0, 188.0, { align: 'center' });

  // Center Footer on Page 2
  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(data.issueDate, 148.5, 179.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional',
    148.5,
    184.2,
    { align: 'center' }
  );

  doc.setFont('courier', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(6, 78, 59);
  doc.text(`Registro: ${data.code} · Chave: ${data.controlKey}`, 148.5, 188.0, { align: 'center' });

  // Right Signature on Page 2
  doc.addImage(sigJames, 'PNG', 215.0, 164.0, 54.0, 15.0);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(204.0, 180.0, 279.0, 180.0);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(10, 29, 86);
  doc.text('JAMES ARAÚJO DE SANTANA', 241.5, 184.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.text('Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)', 241.5, 188.0, {
    align: 'center',
  });

  return doc;
}

export async function downloadCertificateVectorPdf(data: CertificateRecord): Promise<void> {
  const doc = await buildCertificateVectorPdf(data);
  const cleanName = data.holderName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
  const fileName = `Certificado_Extensao_${data.certNumber}_${data.code}_${cleanName}.pdf`;
  doc.save(fileName);
}

export async function createCertificatePdfBlobUrl(data: CertificateRecord): Promise<string> {
  const doc = await buildCertificateVectorPdf(data);
  const blob = doc.output('blob');
  return URL.createObjectURL(blob);
}
