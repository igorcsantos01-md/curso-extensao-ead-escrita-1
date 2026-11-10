import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { CERTIFICATE_01_DATA, CertificateRecord } from '../data/certificateData';

interface CertificateDocumentProps {
  data?: CertificateRecord;
  visiblePages?: 'both' | 'page1' | 'page2';
}

export const CertificateDocument: React.FC<CertificateDocumentProps> = ({
  data = CERTIFICATE_01_DATA,
  visiblePages = 'both',
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(data.verificationUrl, {
      width: 240,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })
      .then((url) => {
        if (active) setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('QR generation failed:', err);
      });
    return () => {
      active = false;
    };
  }, [data.verificationUrl]);

  return (
    <div className="flex flex-col items-center gap-8 print:gap-0 print:block">
      {/* =====================================================================
          LAUDA 1 — FRENTE DO CERTIFICADO (A4 PAISAGEM: 297mm x 210mm)
         ===================================================================== */}
      {(visiblePages === 'both' || visiblePages === 'page1') && (
        <div
          className="cert-sheet cert-page-1 shadow-2xl print:shadow-none select-text"
          style={{
            padding: '6.5mm',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Outer Dark Green Border (#194D33) */}
          <div
            className="w-full h-full relative box-border flex flex-col justify-between"
            style={{
              border: '2.4px solid #194D33',
              padding: '1.6mm',
            }}
          >
            {/* Inner Gold Hairline Border (#C59B27) */}
            <div
              className="w-full h-full box-border flex flex-col justify-between"
              style={{
                border: '1px solid #C59B27',
                padding: '5.5mm 9mm 4.5mm 9mm',
              }}
            >
              {/* 1. CABEÇALHO INSTITUCIONAL TRIPARTIDO */}
              <div>
                <div className="grid grid-cols-12 items-center pb-3" style={{ borderBottom: '0.8px solid #CBD5E1' }}>
                  {/* Bloco Esquerdo: Editora Mente e Saúde */}
                  <div className="col-span-4 flex items-center gap-3">
                    <img
                      src="/assets/cert/logo_editora.png"
                      alt="Logotipo Editora Mente e Saúde"
                      className="w-[66px] h-[66px] object-contain shrink-0"
                    />
                    <div className="leading-tight">
                      <div
                        className="font-sans-cert font-bold tracking-tight"
                        style={{ fontSize: '12.5px', color: '#0F291E' }}
                      >
                        EDITORA MENTE E SAÚDE
                      </div>
                      <div
                        className="font-mono-cert font-semibold mt-0.5"
                        style={{ fontSize: '9.5px', color: '#1E293B' }}
                      >
                        CNPJ: 51.372.335/0001-71
                      </div>
                      <div
                        className="font-sans-cert mt-0.5"
                        style={{ fontSize: '9.2px', color: '#19673B' }}
                      >
                        Conselho Editorial e Extensão Científica
                      </div>
                    </div>
                  </div>

                  {/* Bloco Central: Programa Interinstitucional */}
                  <div className="col-span-4 text-center px-1">
                    <div
                      className="font-sans-cert font-bold uppercase tracking-wide leading-snug"
                      style={{ fontSize: '9.8px', color: '#14452F' }}
                    >
                      PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA E EDUCAÇÃO EM SAÚDE
                    </div>
                    <div
                      className="font-mono-cert font-semibold mt-1.5 tracking-tight"
                      style={{ fontSize: '8.9px', color: '#0F172A' }}
                    >
                      Certificado Nº {data.certNumber} · Livro de Extensão nº {data.bookNumber} · Cód. {data.code}
                    </div>
                  </div>

                  {/* Bloco Direito: Centro Profissionalizante Maria Dalva de Araújo */}
                  <div className="col-span-4 flex items-center justify-end gap-3 text-right">
                    <div className="leading-tight">
                      <div
                        className="font-sans-cert font-bold tracking-tight"
                        style={{ fontSize: '11.5px', color: '#0F172A' }}
                      >
                        CENTRO PROFISSIONALIZANTE
                      </div>
                      <div
                        className="font-sans-cert font-bold tracking-tight"
                        style={{ fontSize: '11.5px', color: '#0F172A' }}
                      >
                        MARIA DALVA DE ARAÚJO
                      </div>
                      <div
                        className="font-mono-cert font-semibold mt-0.5"
                        style={{ fontSize: '9.5px', color: '#1E293B' }}
                      >
                        CNPJ: 51.269.112/0001-83
                      </div>
                    </div>
                    <img
                      src="/assets/cert/logo_centro.png"
                      alt="Logotipo Centro Profissionalizante Maria Dalva de Araújo"
                      className="w-[66px] h-[66px] object-contain shrink-0"
                    />
                  </div>
                </div>

                {/* 2. TÍTULO PRINCIPAL E CHAMADA INSTITUCIONAL */}
                <div className="text-center mt-3.5">
                  <h1
                    className="font-serif-cert font-bold uppercase tracking-wider"
                    style={{ fontSize: '27px', color: '#14452F', letterSpacing: '0.04em' }}
                  >
                    CERTIFICADO DE CURSO DE EXTENSÃO
                  </h1>
                  <p
                    className="font-sans-cert mx-auto mt-2 leading-snug"
                    style={{ fontSize: '12.6px', color: '#1E293B', maxWidth: '920px' }}
                  >
                    A <strong>Editora Mente e Saúde</strong> (CNPJ: 51.372.335/0001-71), em parceria institucional com o{' '}
                    <strong>Centro Profissionalizante Maria Dalva de Araújo</strong> (CNPJ: 51.269.112/0001-83), certifica
                    para os devidos fins de comprovação curricular, acadêmica e de títulos (em conformidade com a Lei nº
                    9.394/96 e Decreto nº 5.154/2004) que
                  </p>
                </div>

                {/* 3. BLOCO DE IDENTIFICAÇÃO DO TITULAR (PADRÃO FIXO UNIFAN) */}
                <div
                  className="mx-auto mt-3 py-2.5 px-6 text-center"
                  style={{
                    backgroundColor: '#F7F5EE',
                    border: '1px solid #D5B869',
                    maxWidth: '940px',
                  }}
                >
                  <div
                    className="font-serif-cert font-bold uppercase tracking-wide"
                    style={{ fontSize: '24px', color: '#0B1F3A', letterSpacing: '0.03em' }}
                  >
                    {data.holderName}
                  </div>
                  <div
                    className="font-sans-cert font-bold mt-0.5"
                    style={{ fontSize: '12.6px', color: '#0F172A' }}
                  >
                    {data.holderLine}
                  </div>
                </div>

                {/* 4. CORPO DESCRITIVO DUPLO (REGRA DO ITEM 09) */}
                <div
                  className="mx-auto mt-3.5 text-justify font-sans-cert space-y-2.5"
                  style={{ fontSize: '12.4px', lineHeight: '1.48', color: '#111827', maxWidth: '940px' }}
                >
                  <p>
                    concluiu com <strong>APROVAÇÃO</strong> e aproveitamento integral a <strong>Atividade Extracurricular</strong>{' '}
                    intitulada <strong>“{data.courseTitle}”</strong>, desenvolvida na modalidade de{' '}
                    <strong>{data.modality}</strong>, realizada no período de <strong>10 de abril a 05 de maio de 2023</strong>,
                    contabilizando carga horária total de <strong>36 (trinta e seis) horas</strong>.
                  </p>
                  <p>
                    No âmbito desta formação complementar em ambiente virtual de aprendizagem, o profissional cumpriu
                    integralmente os módulos teóricos e práticos de <strong>estruturação lógica de manuscritos biomédicos no padrão IMRD</strong>{' '}
                    (Introdução, Métodos, Resultados e Discussão), <strong>normalização internacional de referências pelo Estilo Vancouver (ICMJE) e ABNT</strong>,{' '}
                    <strong>ética em pesquisa científica e prevenção ao plágio</strong>, <strong>estratégias de submissão em periódicos indexados com revisão por pares (peer review)</strong>{' '}
                    e avaliação final de proficiência metodológica, obtendo <strong>nota final 9,6 (Aprovado)</strong>.
                  </p>
                </div>

                {/* LOCAL E DATA */}
                <div
                  className="text-center font-serif-cert italic mt-3.5"
                  style={{ fontSize: '14.5px', color: '#0F172A' }}
                >
                  {data.issueDate}
                </div>
              </div>

              {/* 5. RODAPÉ DE ASSINATURAS E BLOCO CENTRAL DE FÉ PÚBLICA */}
              <div className="mt-1">
                <div className="grid grid-cols-12 items-end gap-2">
                  {/* Esquerda: Assinatura Bárbara Lima dos Santos */}
                  <div className="col-span-4 text-center flex flex-col items-center">
                    <img
                      src="/assets/cert/sig_barbara.png"
                      alt="Assinatura Bárbara Lima dos Santos"
                      className="h-[46px] object-contain -mb-1"
                    />
                    <div className="w-[88%] border-t border-slate-800 pt-1">
                      <div className="font-sans-cert font-bold uppercase" style={{ fontSize: '10.5px', color: '#0F172A' }}>
                        BÁRBARA LIMA DOS SANTOS
                      </div>
                      <div className="font-sans-cert" style={{ fontSize: '9.2px', color: '#334155' }}>
                        Editora-Chefe e Coordenadora de Extensão Editorial
                      </div>
                      <div className="font-mono-cert" style={{ fontSize: '8.3px', color: '#334155' }}>
                        Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                      </div>
                    </div>
                  </div>

                  {/* Centro: Trava de Autenticidade Tripla (Selo + QR Code + Quadro Manual) */}
                  <div className="col-span-4 flex items-center justify-center gap-2.5">
                    {/* Selo Oficial Dourado */}
                    <div
                      className="w-[84px] h-[84px] rounded-full flex flex-col items-center justify-center text-center shrink-0"
                      style={{
                        backgroundColor: '#FDF8E7',
                        border: '2px solid #C59B27',
                        boxShadow: 'inset 0 0 0 2px #FDF8E7, inset 0 0 0 3px #DFC266',
                      }}
                    >
                      <div className="text-[7px] font-bold tracking-widest" style={{ color: '#9A6F0B' }}>
                        ★ ★ ★
                      </div>
                      <div className="font-sans-cert font-extrabold uppercase leading-tight" style={{ fontSize: '7.5px', color: '#785306' }}>
                        SELO OFICIAL
                      </div>
                      <div className="font-sans-cert font-extrabold uppercase leading-tight" style={{ fontSize: '7.8px', color: '#785306' }}>
                        FÉ PÚBLICA
                      </div>
                      <div
                        className="font-mono-cert font-bold mt-0.5 pt-0.5 border-t border-amber-400/60"
                        style={{ fontSize: '6.6px', color: '#9A6F0B' }}
                      >
                        {data.code}
                      </div>
                      <div className="text-[6px] mt-0.5" style={{ color: '#9A6F0B' }}>
                        ★ ★ ★
                      </div>
                    </div>

                    {/* QR Code + Quadro de Autenticação Pública Manual */}
                    <div
                      className="flex items-center gap-2 p-1.5 bg-white"
                      style={{ border: '1px solid #94A3B8' }}
                    >
                      {qrDataUrl ? (
                        <img
                          src={qrDataUrl}
                          alt="QR Code de Autenticação"
                          className="w-[74px] h-[74px] object-contain shrink-0"
                        />
                      ) : (
                        <div className="w-[74px] h-[74px] bg-slate-100 shrink-0" />
                      )}
                      <div className="text-left leading-tight pr-1" style={{ maxWidth: '155px' }}>
                        <div
                          className="font-sans-cert font-bold uppercase pb-0.5 mb-0.5 border-b border-slate-200"
                          style={{ fontSize: '7.4px', color: '#0F172A' }}
                        >
                          AUTENTICAÇÃO PÚBLICA MANUAL
                        </div>
                        <div className="font-mono-cert" style={{ fontSize: '7.4px', color: '#1E293B' }}>
                          <strong>Cód.:</strong> {data.code}
                        </div>
                        <div className="font-mono-cert mt-0.5" style={{ fontSize: '7.2px', color: '#1E293B' }}>
                          <strong>Chave:</strong> {data.controlKey}
                        </div>
                        <div className="font-sans-cert font-bold mt-0.5" style={{ fontSize: '6.8px', color: '#0F172A' }}>
                          Endereço p/ Verificação Online:
                        </div>
                        <div
                          className="font-mono-cert break-all leading-none mt-0.5"
                          style={{ fontSize: '6.3px', color: '#14452F' }}
                        >
                          {data.verificationDomain}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Direita: Assinatura James Araújo de Santana */}
                  <div className="col-span-4 text-center flex flex-col items-center">
                    <img
                      src="/assets/cert/sig_james.png"
                      alt="Assinatura James Araújo de Santana"
                      className="h-[46px] object-contain -mb-1"
                    />
                    <div className="w-[88%] border-t border-slate-800 pt-1">
                      <div className="font-sans-cert font-bold uppercase" style={{ fontSize: '10.5px', color: '#0F172A' }}>
                        JAMES ARAÚJO DE SANTANA
                      </div>
                      <div className="font-sans-cert" style={{ fontSize: '9.2px', color: '#334155' }}>
                        Coordenador de Extensão e Projetos Educativos
                      </div>
                      <div className="font-mono-cert" style={{ fontSize: '8.1px', color: '#334155' }}>
                        Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Barra Inferior de Segurança */}
                <div
                  className="text-center font-mono-cert font-semibold pt-2 mt-2"
                  style={{
                    borderTop: '0.8px solid #CBD5E1',
                    fontSize: '8.2px',
                    color: '#14452F',
                  }}
                >
                  Verifique via QR Code ou acesse {data.verificationUrl} informando o Código {data.code} ou Chave {data.controlKey}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          LAUDA 2 — VERSO OFICIAL: MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO
         ===================================================================== */}
      {(visiblePages === 'both' || visiblePages === 'page2') && (
        <div
          className="cert-sheet cert-page-2 shadow-2xl print:shadow-none select-text"
          style={{
            padding: '6.5mm',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Outer Dark Green Border (#194D33) */}
          <div
            className="w-full h-full relative box-border flex flex-col justify-between"
            style={{
              border: '2.4px solid #194D33',
              padding: '1.6mm',
            }}
          >
            {/* Inner Gold Hairline Border (#C59B27) */}
            <div
              className="w-full h-full box-border flex flex-col justify-between"
              style={{
                border: '1px solid #C59B27',
                padding: '4.5mm 8.5mm 4mm 8.5mm',
              }}
            >
              <div>
                {/* 1. CABEÇALHO DO VERSO */}
                <div
                  className="flex items-center gap-3.5 pb-2.5"
                  style={{ borderBottom: '1.5px solid #194D33' }}
                >
                  <div className="flex items-center gap-2 shrink-0">
                    <img
                      src="/assets/cert/logo_editora.png"
                      alt="Logo Editora Mente e Saúde"
                      className="w-[42px] h-[42px] object-contain"
                    />
                    <img
                      src="/assets/cert/logo_centro.png"
                      alt="Logo Centro Profissionalizante"
                      className="w-[42px] h-[42px] object-contain"
                    />
                  </div>
                  <div>
                    <h2
                      className="font-serif-cert font-bold uppercase tracking-wide"
                      style={{ fontSize: '16.5px', color: '#14452F' }}
                    >
                      MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE EXTRACURRICULAR
                    </h2>
                    <div
                      className="font-sans-cert font-medium mt-0.5"
                      style={{ fontSize: '10.5px', color: '#334155' }}
                    >
                      Verso Oficial do Certificado Nº {data.certNumber} · Fé Pública Interinstitucional e Validação Curricular
                    </div>
                  </div>
                </div>

                {/* 2. QUADROS 1 E 2 (IDENTIFICAÇÃO DO PROFISSIONAL + ENQUADRAMENTO ITEM 09) */}
                <div className="grid grid-cols-12 gap-3.5 mt-3">
                  {/* Quadro 1 */}
                  <div
                    className="col-span-7 p-2.5 rounded-[2px]"
                    style={{ backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1' }}
                  >
                    <div
                      className="font-sans-cert font-bold uppercase tracking-wide pb-1 mb-1.5 border-b border-slate-200"
                      style={{ fontSize: '9.8px', color: '#14452F' }}
                    >
                      1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL
                    </div>
                    <div className="space-y-1 font-sans-cert" style={{ fontSize: '10.6px', color: '#1E293B' }}>
                      <div>
                        <span className="text-slate-600">Titular Certificado:</span>{' '}
                        <strong className="text-slate-900">{data.holderName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-600">CPF Registrado:</span>{' '}
                        <strong className="font-mono-cert text-slate-900">{data.holderCpf}</strong>
                      </div>
                      <div>
                        <span className="text-slate-600">Qualificação Profissional:</span>{' '}
                        <strong className="text-slate-900">{data.holderQualification}</strong>
                      </div>
                      <div>
                        <span className="text-slate-600">Instituição de Origem:</span>{' '}
                        <strong className="text-slate-900">{data.holderInstitution}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Quadro 2 */}
                  <div
                    className="col-span-5 p-2.5 rounded-[2px] flex flex-col justify-between"
                    style={{ backgroundColor: '#F3F8F5', border: '1px solid #94B8A3' }}
                  >
                    <div>
                      <div
                        className="font-sans-cert font-bold uppercase tracking-wide pb-1 mb-1.5 border-b border-emerald-800/20"
                        style={{ fontSize: '9.8px', color: '#14452F' }}
                      >
                        2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO
                      </div>
                      <p
                        className="font-sans-cert font-bold leading-snug"
                        style={{ fontSize: '10.4px', color: '#0F172A' }}
                      >
                        {data.editalFraming}
                      </p>
                    </div>
                    <div
                      className="font-mono-cert font-bold pt-1.5 mt-1.5 border-t border-emerald-800/20"
                      style={{ fontSize: '9.4px', color: '#14452F' }}
                    >
                      Período: {data.period} | Total: {data.totalHoursNumeric}h | Situação: {data.status} (Nota: {data.finalGrade})
                    </div>
                  </div>
                </div>

                {/* 3. QUADRO 3 — MATRIZ PROGRAMÁTICA E METODOLOGIA PEDAGÓGICA (36 HORAS) */}
                <div
                  className="mt-3 rounded-[2px] overflow-hidden"
                  style={{ border: '1px solid #CBD5E1' }}
                >
                  <div
                    className="px-3 py-1.5 font-sans-cert font-bold uppercase tracking-wide"
                    style={{
                      backgroundColor: '#EFF6F2',
                      borderBottom: '1px solid #CBD5E1',
                      fontSize: '9.8px',
                      color: '#14452F',
                    }}
                  >
                    3. MATRIZ PROGRAMÁTICA E METODOLOGIA PEDAGÓGICA (36 HORAS)
                  </div>
                  <div className="divide-y divide-slate-200">
                    {data.axes.map((axis, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 items-center px-3 py-2 bg-white"
                      >
                        <div className="col-span-4 pr-3">
                          <div
                            className="font-sans-cert font-bold leading-tight"
                            style={{ fontSize: '10px', color: '#0F172A' }}
                          >
                            {axis.title}
                          </div>
                          <div
                            className="font-sans-cert leading-tight mt-0.5"
                            style={{ fontSize: '8.7px', color: '#64748B' }}
                          >
                            {axis.subtitle}
                          </div>
                        </div>
                        <div
                          className="col-span-7 px-3 font-sans-cert leading-snug"
                          style={{
                            fontSize: '9.5px',
                            color: '#1E293B',
                            borderLeft: '1px solid #F1F5F9',
                            borderRight: '1px solid #F1F5F9',
                          }}
                        >
                          {axis.description}
                        </div>
                        <div
                          className="col-span-1 text-right font-mono-cert font-bold"
                          style={{ fontSize: '9.8px', color: '#14452F' }}
                        >
                          {axis.hours}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. QUADRO 4 — REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO */}
                <div
                  className="mt-3 p-2.5 rounded-[2px] flex items-center justify-between gap-4"
                  style={{
                    backgroundColor: '#FCFBF7',
                    border: '1px solid #D5B869',
                  }}
                >
                  <div className="space-y-1 flex-1">
                    <div
                      className="font-sans-cert font-bold uppercase tracking-wide"
                      style={{ fontSize: '9.6px', color: '#785306' }}
                    >
                      4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE AUTENTICIDADE
                    </div>
                    <p
                      className="font-sans-cert leading-snug"
                      style={{ fontSize: '9.6px', color: '#1E293B' }}
                    >
                      Certificado registrado sob o <strong>nº {data.certNumber}</strong> no{' '}
                      <strong>Livro de Extensão e Cursos nº {data.bookNumber}</strong>, <strong>Folha {data.pageNumber}</strong>,
                      expedido pela <strong>Editora Mente e Saúde</strong> (CNPJ: 51.372.335/0001-71) e{' '}
                      <strong>Centro Profissionalizante Maria Dalva de Araújo</strong> (CNPJ: 51.269.112/0001-83).
                    </p>
                    <div
                      className="font-mono-cert font-bold pt-0.5"
                      style={{ fontSize: '9.3px', color: '#0F172A' }}
                    >
                      CÓDIGO DE AUTENTICIDADE: <span style={{ color: '#14452F' }}>{data.code}</span> &nbsp;|&nbsp; CHAVE DE CONTROLE / DÍGITO:{' '}
                      <span style={{ color: '#14452F' }}>{data.controlKey}</span>
                    </div>
                    <div
                      className="font-mono-cert font-bold"
                      style={{ fontSize: '8.9px', color: '#0F172A' }}
                    >
                      ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE):{' '}
                      <span className="underline" style={{ color: '#14452F' }}>
                        {data.verificationUrl}
                      </span>
                    </div>
                    <div
                      className="font-mono-cert"
                      style={{ fontSize: '8.4px', color: '#334155' }}
                    >
                      <strong>HASH SHA-256:</strong> {data.sha256}
                    </div>
                  </div>

                  {/* QR Code Direito do Verso */}
                  <div
                    className="p-1.5 bg-white shrink-0"
                    style={{ border: '1px solid #CBD5E1' }}
                  >
                    {qrDataUrl ? (
                      <img
                        src={qrDataUrl}
                        alt="QR Code Verso Oficial"
                        className="w-[78px] h-[78px] object-contain"
                      />
                    ) : (
                      <div className="w-[78px] h-[78px] bg-slate-100" />
                    )}
                  </div>
                </div>
              </div>

              {/* 5. RODAPÉ DO VERSO */}
              <div className="grid grid-cols-12 items-end pt-1">
                {/* Assinatura Esquerda Compacta */}
                <div className="col-span-4 text-center flex flex-col items-center">
                  <img
                    src="/assets/cert/sig_barbara.png"
                    alt="Assinatura Bárbara Lima dos Santos"
                    className="h-[38px] object-contain -mb-1"
                  />
                  <div className="w-[85%] border-t border-slate-700 pt-0.5">
                    <div className="font-sans-cert font-bold uppercase" style={{ fontSize: '9.8px', color: '#0F172A' }}>
                      BÁRBARA LIMA DOS SANTOS
                    </div>
                    <div className="font-mono-cert" style={{ fontSize: '8px', color: '#334155' }}>
                      Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                    </div>
                  </div>
                </div>

                {/* Centro do Rodapé do Verso */}
                <div className="col-span-4 text-center pb-0.5">
                  <div
                    className="font-serif-cert italic"
                    style={{ fontSize: '12px', color: '#0F172A' }}
                  >
                    {data.issueDate}
                  </div>
                  <div
                    className="font-sans-cert font-semibold mt-0.5"
                    style={{ fontSize: '8.8px', color: '#334155' }}
                  >
                    Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional
                  </div>
                  <div
                    className="font-mono-cert mt-0.5"
                    style={{ fontSize: '7.8px', color: '#64748B' }}
                  >
                    Registro: {data.code} · Chave: {data.controlKey}
                  </div>
                </div>

                {/* Assinatura Direita Compacta */}
                <div className="col-span-4 text-center flex flex-col items-center">
                  <img
                    src="/assets/cert/sig_james.png"
                    alt="Assinatura James Araújo de Santana"
                    className="h-[38px] object-contain -mb-1"
                  />
                  <div className="w-[85%] border-t border-slate-700 pt-0.5">
                    <div className="font-sans-cert font-bold uppercase" style={{ fontSize: '9.8px', color: '#0F172A' }}>
                      JAMES ARAÚJO DE SANTANA
                    </div>
                    <div className="font-mono-cert" style={{ fontSize: '8px', color: '#334155' }}>
                      Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
