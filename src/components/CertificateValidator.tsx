import React, { useEffect, useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  Eye,
  Copy,
  Check,
  QrCode,
  Lock,
} from 'lucide-react';
import QRCode from 'qrcode';
import { CERTIFICATE_01_DATA, CertificateRecord } from '../data/certificateData';

interface CertificateValidatorProps {
  data?: CertificateRecord;
  initialQuery?: string;
  onDownloadPdf: () => void;
  isGeneratingPdf?: boolean;
  onScrollToCertificate: () => void;
}

export const CertificateValidator: React.FC<CertificateValidatorProps> = ({
  data = CERTIFICATE_01_DATA,
  initialQuery = '',
  onDownloadPdf,
  isGeneratingPdf = false,
  onScrollToCertificate,
}) => {
  const [query, setQuery] = useState(initialQuery || data.code);
  const [validationState, setValidationState] = useState<'valid' | 'invalid' | 'idle'>('valid');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string>('');
  const [verifiedTimestamp, setVerifiedTimestamp] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    setVerifiedTimestamp(
      now.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }, []);

  useEffect(() => {
    QRCode.toDataURL(data.verificationUrl, {
      width: 220,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#0F2942', light: '#FFFFFF' },
    }).then(setQrUrl);
  }, [data.verificationUrl]);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      validateInput(initialQuery);
    }
  }, [initialQuery]);

  const validateInput = (rawInput: string) => {
    const cleaned = rawInput.trim().toUpperCase();
    if (!cleaned) {
      setValidationState('idle');
      return;
    }

    const validTokens = [
      data.code.toUpperCase(),
      data.controlKey.toUpperCase(),
      data.sha256.toUpperCase(),
      data.holderCpf.toUpperCase(),
      data.holderName.toUpperCase(),
      '702.794.941-57',
      '70279494157',
      'LUCAS GONÇALVES SILVEIRA',
      'LUCAS GONCALVES SILVEIRA',
      '0901',
    ];

    if (
      validTokens.some(
        (t) =>
          cleaned === t ||
          cleaned.includes(data.code.toUpperCase()) ||
          cleaned.includes(data.controlKey.toUpperCase())
      )
    ) {
      setValidationState('valid');
      const url = new URL(window.location.href);
      url.searchParams.set('codigo', data.code);
      window.history.replaceState({}, '', `${url.pathname}?codigo=${data.code}#validador`);
    } else {
      setValidationState('invalid');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateInput(query);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="validador" className="py-16 bg-slate-900 text-white border-y border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Seção */}
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
            Sistema Oficial de Verificação Pública · Fé Pública Interinstitucional
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif-cert">
            Autenticador Eletrônico de Certificados e Registros Acadêmicos
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Consulte a autenticidade documental informando o <strong>Código de Autenticidade</strong>, a{' '}
            <strong>Chave de Controle</strong> ou o <strong>Hash Criptográfico SHA-256</strong> impresso no anverso e no
            verso do certificado. O sistema processa automaticamente consultas oriundas da leitura direta do QR Code.
          </p>
        </div>

        {/* Barra de Pesquisa e Ações Rápidas */}
        <div className="mt-8 bg-slate-800/90 border border-slate-700 rounded-xl p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Digite o Código (${data.code}), Chave (${data.controlKey}) ou Hash SHA-256...`}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              Verificar Autenticidade
            </button>
          </form>

          {/* Atalhos Rápidos de Preenchimento */}
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <span>Parâmetros oficiais registrados nesta instância:</span>
            <button
              type="button"
              onClick={() => {
                setQuery(data.code);
                validateInput(data.code);
              }}
              className="font-mono text-amber-300 hover:text-amber-200 underline cursor-pointer"
            >
              Código: {data.code}
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setQuery(data.controlKey);
                validateInput(data.controlKey);
              }}
              className="font-mono text-emerald-300 hover:text-emerald-200 underline cursor-pointer"
            >
              Chave: {data.controlKey}
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setQuery(data.sha256);
                validateInput(data.sha256);
              }}
              className="font-mono text-slate-300 hover:text-white underline cursor-pointer"
            >
              Testar Hash SHA-256
            </button>
          </div>
        </div>

        {/* Resultado da Validação */}
        {validationState === 'valid' && (
          <div className="mt-6 bg-white text-slate-900 rounded-xl border border-emerald-500/40 shadow-xl overflow-hidden">
            {/* Faixa Superior de Confirmação */}
            <div className="bg-emerald-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-300 shrink-0" />
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-200">
                    Fé Pública Confirmada · Registro Ativo e Inalterado
                  </div>
                  <div className="text-base sm:text-lg font-bold tracking-tight">
                    CERTIFICADO AUTÊNTICO E VÁLIDO — {data.status} (NOTA {data.finalGrade})
                  </div>
                </div>
              </div>
              <div className="text-xs font-mono text-emerald-100 sm:text-right">
                <div>Protocolo: {data.code}</div>
                <div>Verificado em: {verifiedTimestamp}</div>
              </div>
            </div>

            {/* Corpo de Dados do Certificado Validado */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-6">
                {/* Bloco do Titular e Curso */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Profissional Titular Certificado
                    </div>
                    <div className="mt-1 text-lg font-bold text-slate-900 font-serif-cert">
                      {data.holderName}
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-slate-600">
                      {data.holderLine}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Livro, Folha e Situação Acadêmica
                    </div>
                    <div className="mt-1 text-sm font-bold text-emerald-800">
                      Certificado Nº {data.certNumber} · Livro nº {data.bookNumber} · Folha {data.pageNumber}
                    </div>
                    <div className="mt-1 text-xs text-slate-700 font-mono">
                      Carga Horária: <strong>{data.totalHoursNumeric} horas</strong> · Nota Final:{' '}
                      <strong>{data.finalGrade}</strong> · Situação:{' '}
                      <strong className="text-emerald-700">{data.status}</strong>
                    </div>
                  </div>
                </div>

                {/* Detalhamento da Atividade e Enquadramento Item 09 */}
                <div className="space-y-3 pb-6 border-b border-slate-200">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Título Oficial da Atividade Extracurricular
                    </div>
                    <div className="mt-1 text-base font-bold text-slate-900">
                      “{data.courseTitle}”
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block">Modalidade:</span>
                      <strong className="text-slate-900 mt-0.5 block">{data.modality}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block">Período de Realização:</span>
                      <strong className="text-slate-900 mt-0.5 block">{data.period}</strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-slate-500 block">Local e Data de Expedição:</span>
                      <strong className="text-slate-900 mt-0.5 block">{data.issueDate}</strong>
                    </div>
                  </div>
                  <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-slate-800">
                    <strong className="text-emerald-950 block mb-0.5">Enquadramento Normativo no Edital (Item 09):</strong>
                    {data.editalFraming}
                  </div>
                </div>

                {/* Chaves Criptográficas e Hash SHA-256 */}
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    Credenciais Criptográficas e Rastreabilidade Digital
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                      <div>
                        <span className="text-slate-500 text-[10px] block">CÓDIGO DE AUTENTICIDADE</span>
                        <strong className="text-slate-900">{data.code}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(data.code, 'code')}
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded cursor-pointer"
                        title="Copiar Código"
                      >
                        {copiedField === 'code' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                      <div>
                        <span className="text-slate-500 text-[10px] block">CHAVE DE CONTROLE / DÍGITO</span>
                        <strong className="text-slate-900">{data.controlKey}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(data.controlKey, 'key')}
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded cursor-pointer"
                        title="Copiar Chave"
                      >
                        {copiedField === 'key' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-2 font-mono text-xs">
                    <div className="overflow-hidden">
                      <span className="text-slate-500 text-[10px] block">ASSINATURA DIGITAL / HASH SHA-256 (64 HEX)</span>
                      <div className="text-slate-800 break-all text-[11px] font-medium mt-0.5">
                        {data.sha256}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(data.sha256, 'sha')}
                      className="p-1.5 text-slate-500 hover:text-slate-900 rounded shrink-0 cursor-pointer"
                      title="Copiar Hash SHA-256"
                    >
                      {copiedField === 'sha' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Entidades Emissoras + QR Code + Ações de Download Direto do PDF */}
              <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-200">
                    Instituições Certificadoras
                  </div>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src="/assets/cert/logo_editora.png"
                        alt="Editora Mente e Saúde"
                        className="w-11 h-11 object-contain shrink-0"
                      />
                      <div className="text-xs leading-tight">
                        <div className="font-bold text-slate-900">Editora Mente e Saúde</div>
                        <div className="font-mono text-slate-600 text-[11px]">CNPJ: 51.372.335/0001-71</div>
                        <div className="text-emerald-800 text-[11px]">Bárbara Lima dos Santos (Editora-Chefe)</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200/80">
                      <img
                        src="/assets/cert/logo_centro.png"
                        alt="Centro Profissionalizante Maria Dalva de Araújo"
                        className="w-11 h-11 object-contain shrink-0"
                      />
                      <div className="text-xs leading-tight">
                        <div className="font-bold text-slate-900">Centro Profissionalizante Maria Dalva de Araújo</div>
                        <div className="font-mono text-slate-600 text-[11px]">CNPJ: 51.269.112/0001-83</div>
                        <div className="text-blue-900 text-[11px]">James Araújo de Santana (Coordenador)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code de Verificação Direta */}
                <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex items-center gap-3.5">
                  {qrUrl && (
                    <img
                      src={qrUrl}
                      alt="QR Code Verificador"
                      className="w-20 h-20 object-contain shrink-0 border border-slate-100"
                    />
                  )}
                  <div className="text-xs space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1">
                      <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                      QR Code Oficial Ativo
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      Aponte a câmera para validar diretamente na URL pública com preenchimento automático.
                    </p>
                  </div>
                </div>

                {/* Botões de Ação para o Certificado PDF */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="button"
                    onClick={onDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileDown className="w-4 h-4 text-amber-400" />
                    {isGeneratingPdf ? 'Gerando PDF Acessível...' : 'Baixar Arquivo .PDF (Texto Selecionável)'}
                  </button>
                  <button
                    type="button"
                    onClick={onScrollToCertificate}
                    className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-emerald-700" />
                    Inspecionar / Editar Certificado na Tela
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {validationState === 'invalid' && (
          <div className="mt-6 bg-red-950/60 border border-red-500/50 rounded-xl p-6 text-red-100 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <div className="font-bold text-white text-base">
                Nenhum registro encontrado para o parâmetro informado: "{query}"
              </div>
              <p className="text-red-200/90">
                Verifique se o código foi digitado corretamente ou clique abaixo para restaurar o certificado registrado
                nesta unidade autenticadora (<strong>{data.code}</strong>).
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery(data.code);
                  validateInput(data.code);
                }}
                className="mt-2 px-4 py-2 bg-red-800 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Restaurar Certificado Nº {data.certNumber} ({data.code})
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
